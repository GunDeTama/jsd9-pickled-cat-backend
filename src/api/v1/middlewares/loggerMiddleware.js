/** @type {import('express').RequestHandler} */
const logMethod = (req, _, next) => {
  console.log(req.method);
  next();
};

/** @type {import('express').RequestHandler} */
const logOriginalUrl = (req, _, next) => {
  console.log(req.originalUrl);
  next();
};

export const loggerMiddlewares = [logMethod, logOriginalUrl];
