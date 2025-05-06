import { ERROR_CODES } from '../constants/errorCode.js';

export class ResponseError extends Error {
  /**
   * @param {string} message - Error message.
   * @param {number} statusCode - HTTP status code.
   */
  constructor(message, statusCode) {
    super(message);
    this.success = statusCode >= 400 ? true : false;
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends ResponseError {
  /** @param {string} message - Custom error message for statusCode 400 */
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}

export class InternalServerError extends ResponseError {
  /** @param {string} message - Custom error message for statusCode 500 */
  constructor(message = 'Internal server error') {
    super(message, 500);
  }
}