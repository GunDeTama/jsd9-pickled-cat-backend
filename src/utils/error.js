import { ERROR_CODES } from '../constants/errorCode.js';

export class ResponseError extends Error {
  /**
   * @param {number} [statusCode=500] - Status to response back to the client.
   *   Default is `500`
   * @param {string} [code=ERROR_CODES.internalServerError] - Error name for
   *   easing then debugging. Default is `ERROR_CODES.internalServerError`
   * @param {string} [message='Something wrong with the server'] - Short error
   *   summary to inform the client. Default is `'Something wrong with the
   *   server'`. Default is `'Something wrong with the server'`
   */
  constructor(
    statusCode = 500,
    code = ERROR_CODES.internalServerError,
    message = code
      .split('_')
      .map((text) => text.at(0).toUpperCase() + text.slice(1).toLowerCase())
      .join(' '),
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
  }
}
