import { config } from '../../../config/env.js';
import { ResponseConstructor } from '../../../utils/response.js';

/** @type {import('express').ErrorRequestHandler} */
export const errorMiddleware = (err, req, res, next) => {
  /** @type {import('../../../utils/error.js').ResponseError} */
  const error = {
    ...err,
    message: err.message,
    stack: config.NODE_ENV === 'production' ? undefined : err.stack,
  };

  res
    .status(err.statusCode)
    .json(new ResponseConstructor(false, undefined, undefined, error));
};
