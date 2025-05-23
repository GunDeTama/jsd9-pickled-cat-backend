import jwt from 'jsonwebtoken';
const { JsonWebTokenError, TokenExpiredError } = jwt;

import { config } from '../../../configs/env.js';
import { User } from '../../../model/User.js';
import {
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
} from '../../../utils/error.js';

/** @type {import('express').RequestHandler} */
export const isLogin = async (req, _, next) => {
  const authToken = req.headers['authorization'].split(' ').at(1);
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

/** @type {import('express').RequestHandler} */
export const isAdmin = async (req, _, next) => {
  const { role } = req.user;
  const admin = role.toLowerCase() === 'admin';
  if (!admin) next(new ForbiddenError('Admin access required'));
  next();
};
