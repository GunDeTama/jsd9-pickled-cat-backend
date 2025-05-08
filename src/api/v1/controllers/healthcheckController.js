import { ResponseError } from '../../../utils/error.js';

/** @type {import('express').RequestHandler} */
export const healthcheckController = (req, res, next) => {
  if (req.query.checkType === 'success') return res.sendStatus(200);
  next();
};

/** @type {import('express').RequestHandler} */
export const errorHandlingCheckController = (req, res, next) => {
  next(new ResponseError('The request failed successfully', 500));
};
