import { ERROR_CODES } from '../../../constants/errorCode.js';
import { ResponseError } from '../../../utils/error.js';

/** @type {import('express').RequestHandler} */
export const healthcheckController = (req, res, next) => {
  if (req.query.checkType === 'success') return res.sendStatus(200);
  else return next();
};

/** @type {import('express').RequestHandler} */
export const errorHandlingCheckController = (req, res, next) => {
  next(new ResponseError(503, ERROR_CODES.serviceUnavailable));
};
