export class ResponseConstructor {
  /**
   * @param {boolean} [success=true] - Whether the process success or not.
   *   Default is `true`
   * @param {Record<string, any>} [data=undefined] - Data to return if success.
   *   Default is `undefined`
   * @param {string} [message=undefined] - Additional description to return if
   *   success. Default is `undefined`
   * @param {import('./error.js').ResponseError} [error=undefined] - Error
   *   object from `ResponseError` class if failed. Default is `undefined`
   */
  constructor(
    success = true,
    data = undefined,
    message = undefined,
    error = undefined,
  ) {
    this.success = success;

    if (success) {
      this.data = data;
      this.message = message;
      this.error = undefined;
    } else {
      this.data = undefined;
      this.message = undefined;
      this.error = error;
    }
  }
}
