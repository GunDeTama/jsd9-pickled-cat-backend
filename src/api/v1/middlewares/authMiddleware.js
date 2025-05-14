import jwt from 'jsonwebtoken';
const { JsonWebTokenError, TokenExpiredError } = jwt;

import { config } from '../../../configs/env.js';
import { User } from '../../../model/User.js';
import {
  InternalServerError,
  UnauthorizedError,
} from '../../../utils/error.js';

/** @type {import('express').RequestHandler} */
export const authMiddleware = async (req, _, next) => {
  /** @type {string} */
  const authToken = req.cookies?.authToken;
  if (!authToken)
    return next(new UnauthorizedError('Not authorized to access this route'));

  try {
    const decoded = jwt.verify(authToken, config.JWT_SECRET);
    const { user_id, role } = decoded;

    const user = await User.findById(user_id);
    if (!user) next(new UnauthorizedError('User no longer exists'));

    req.user = { user_id, role };
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError)
      next(new UnauthorizedError('Token expired'));
    else if (error instanceof JsonWebTokenError)
      next(new UnauthorizedError('Invalid Token'));
    else next(new InternalServerError('Cannot verify token'));
  }
};
