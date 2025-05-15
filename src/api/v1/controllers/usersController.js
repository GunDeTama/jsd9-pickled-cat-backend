import { Address } from '../../../model/Address.js';
import { User } from '../../../model/User.js';
import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  UnauthorizedError,
} from '../../../utils/error.js';
import { ResponseConstructor } from '../../../utils/response.js';
import { formatErrors } from '../../../utils/utils.js';

const addressFields = [
  'province',
  'sub_district',
  'district',
  'postal_code',
  'additional_address',
];

const userFields = [
  'firstname',
  'lastname',
  'email',
  'password',
  'phone',
  'address',
];

/** @type {import('express').RequestHandler} */
export const register = async (req, res, next) => {
  if (!req.body) return next(new BadRequestError('Invalid request body'));

  const { firstname, lastname, email, password, phone } = req.body;
  const user = new User({
    firstname,
    lastname,
    email,
    password,
    phone,
  });

  const errors = user.validateSync();
  if (errors) {
    let formattedErrors = formatErrors(errors, userFields);
    if (formattedErrors.length > 0)
      return next(
        new BadRequestError('Invalid user form fields', formattedErrors),
      );
  }

  await user
    .save()
    .then(() =>
      res.status(201).json(new ResponseConstructor('Register success')),
    )
    .catch((error) => {
      /** @type {string} */
      const errorMessage = error['errorResponse'].errmsg;
      // NOTE: `email` field must be unique
      const duplicateEmailError = errorMessage.includes(
        'duplicate key error collection',
      );

      if (duplicateEmailError)
        next(new ConflictError('This email is already in use'));
      else next(new InternalServerError(error.message));
    });
};

/** @type {import('express').RequestHandler} */
export const login = async (req, res, next) => {
  if (!req.body) return next(new BadRequestError('Invalid request body'));
  const { email, password } = req.body;

  try {
    const existedUser = await User.findOne({ email });
    if (!existedUser) return next(new UnauthorizedError('Invalid credentials'));
    const passwordMatched = await existedUser.comparePassword(password);
    if (!passwordMatched)
      return next(new UnauthorizedError('Invalid credentials'));

    const authToken = await existedUser.generateAuthToken();

    res.cookie('authToken', authToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1hr
      sameSite: 'lax',
      secure: true,
    });

    existedUser.password = undefined;

    return res.json(
      new ResponseConstructor('User found', {
        auth_token: authToken,
        user_data: existedUser,
      }),
    );
  } catch (error) {
    next(new InternalServerError(error.message));
  }
};

/** @type {import('express').RequestHandler} */
export const logout = (_, res) => {
  res.clearCookie('authToken');
  res.json(new ResponseConstructor('Logged out successfully'));
};

/** @type {import('express').RequestHandler} */
export const getProfileById = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.user_id);
    user.password = undefined;
    res.json(new ResponseConstructor('User found', user));
  } catch (error) {
    next(new InternalServerError(error.message));
  }
};

/** @type {import('express').RequestHandler} */
export const updateProfileById = async (req, res, next) => {
  if (!req.body) return next(new BadRequestError('Invalid request body'));
  const { firstname, lastname, email, phone, address } = req.body;
  const { province, sub_district, district, postal_code, additional_address } =
    address;

  try {
    // Get existed user data
    const existedUserData = await User.findById(req.user.user_id);

    // -------------------- Validation --------------------
    // ----------------------------------------------------
    let formattedErrors = [];

    // Create and validate new address subdocument
    const newAddressData = {
      province: province ?? existedUserData.address?.province,
      sub_district: sub_district ?? existedUserData.address?.sub_district,
      district: district ?? existedUserData.address?.district,
      postal_code: postal_code ?? existedUserData.address?.postal_code,
      additional_address:
        additional_address ?? existedUserData.address?.additional_address,
    };
    const newAddressSubDocument = new Address(newAddressData);
    const addressErrors = newAddressSubDocument.validateSync();
    if (addressErrors)
      formattedErrors.push(...formatErrors(addressErrors, addressFields));

    // Create and validate new user document
    const newUserData = {
      firstname: firstname ?? existedUserData.firstname,
      lastname: lastname ?? existedUserData.lastname,
      email: email ?? existedUserData.email,
      phone: phone ?? existedUserData.phone,
      address: newAddressData ?? existedUserData.address,
    };
    const newUserDocument = new User(newUserData);
    const userSchemaErrors = newUserDocument.validateSync({
      pathsToSkip: ['password'],
    });
    if (userSchemaErrors)
      formattedErrors.push(...formatErrors(userSchemaErrors, userFields));

    if (formattedErrors.length > 0)
      return next(
        new BadRequestError('Invalid user form fields', formattedErrors),
      );
    // -------------------- End validation ----------------
    // ----------------------------------------------------

    const updatedUserData = await User.findByIdAndUpdate(
      req.user.user_id,
      newUserData,
      { new: true },
    ).select('-password');

    res.json(
      new ResponseConstructor('Update user profile success', updatedUserData),
    );
  } catch (error) {
    const duplicateEmailError = error.message.includes(
      'duplicate key error collection',
    );
    if (duplicateEmailError) next(new ConflictError('Email already in use'));
    else next(new InternalServerError(error.message));
  }
};

/** @type {import('express').RequestHandler} */
export const deleteProfileById = async (req, res, next) => {
  try {
    const result = await User.findByIdAndDelete(req.user.user_id).select(
      '-password',
    );
    res.json(new ResponseConstructor('Delete user success', result));
  } catch (error) {
    next(new InternalServerError(error.message));
  }
};
