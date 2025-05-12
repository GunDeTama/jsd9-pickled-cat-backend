import { User } from '../../../model/user.js';
import { BadRequestError } from '../../../utils/error.js';
import { ResponseConstructor } from '../../../utils/response.js';

export const createUser = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, phone, address } = req.body;

    // Check if user with email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('User with this email already exists');
    }

    // Create new user
    const user = new User({
      firstname,
      lastname,
      email,
      password,
      phone,
      address
    });

    await user.save();

    // Generate auth token
    const token = user.generateAuthToken();

    // Return response without password
    const userObject = user.toObject();
    delete userObject.password;

    res.status(201).json(
      new ResponseConstructor('User created successfully', {
        user: userObject,
        token
      })
    );
  } catch (error) {
    next(error);
  }
}; 