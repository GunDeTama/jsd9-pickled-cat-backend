export class ResponseError extends Error {
  /**
   * @param {string} message - Error message.
   * @param {number} statusCode - HTTP status code.
   * @param {Array<any> | Record<any, any> | undefined} error - Error array or object to return.
   */
  constructor(message, statusCode, error) {
    super(message);
    this.success = statusCode >= 400 ? false : true;
    this.statusCode = statusCode;
    this.error = error;
  }
}

export class BadRequestError extends ResponseError {
  /**
   * @param {string} message - Custom error message for statusCode 400
   * @param {*} errors
   */
  constructor(message = 'Bad request', errors = undefined) {
    super(message, 400, errors);
  }
}

export class UnauthorizedError extends ResponseError {
  /**
   * @param {string} message - Custom error message for statusCode 401
   * @param {*} errors
   */
  constructor(message = 'Unauthorized', errors = undefined) {
    super(message, 401, errors);
  }
}

export class ForbiddenError extends ResponseError {
  /**
   * @param {string} message - Custom error message for statusCode 403
   * @param {*} errors
   */
  constructor(message = 'Forbidden', errors = undefined) {
    super(message, 403, errors);
  }
}

export class NotFoundError extends ResponseError {
  /**
   * @param {string} message - Custom error message for statusCode 404
   * @param {*} errors
   */
  constructor(message = 'Not found', errors = undefined) {
    super(message, 404, errors);
  }
}

export class ConflictError extends ResponseError {
  /** @param {string} message - Custom error message for statusCode 409 */
  constructor(message = 'Conflict error') {
    super(message, 409);
  }
}

export class InternalServerError extends ResponseError {
  /** @param {string} message - Custom error message for statusCode 500 */
  constructor(message = 'Internal server error') {
    super(message, 500);
  }
}

export class NotImplementedError extends ResponseError {
  /** @param {string} message - Custom error message for statusCode 500 */
  constructor(message = 'Not implemented') {
    super(message, 501);
  }
}
