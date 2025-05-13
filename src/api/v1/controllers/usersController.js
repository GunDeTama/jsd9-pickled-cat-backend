import { User } from '../../../model/User.js';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '../../../utils/error.js';
import { ResponseConstructor } from '../../../utils/response.js';

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
    let formattedErrors = [];
    for (const field of userFields) {
      if (!errors.errors[field]) continue;
      formattedErrors.push(errors.errors[field].message);
    }
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
      const uniqueValudError = errorMessage.includes(
        'duplicate key error collection',
      );

      if (uniqueValudError)
        next(new InternalServerError('This email is already in use'));
      else next(new InternalServerError());
    });
};

/** @type {import('express').RequestHandler} */
export const login = async (req, res, next) => {
  if (!req.body) next(new BadRequestError('Invalid request body'));
  const { email, password } = req.body;

  try {
    const existedUser = await User.findOne({ email });
    const passwordMatched = await existedUser.comparePassword(password);
    if (!existedUser || !passwordMatched)
      return next(new UnauthorizedError('Invalid credentials'));

    const authToken = await existedUser.generateAuthToken();

    res.cookie('authToken', authToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1hr
      sameSite: 'strict',
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
    const user = await User.findById(req.params?.userId); // TODO: Get `_id` from cookies
    if (!user) return next(new NotFoundError('User not found'));
    user.password = undefined;
    res.json(new ResponseConstructor('User found', user));
  } catch (error) {
    next(new InternalServerError(error.message));
  }
};

/** @type {import('express').RequestHandler} */
export const updateProfileById = (req, res, next) => {
  next(new NotImplementedError());
};

/** @type {import('express').RequestHandler} */
export const deleteProfileById = (req, res, next) => {
  next(new NotImplementedError());
};
