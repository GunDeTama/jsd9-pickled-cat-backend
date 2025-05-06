export class ResponseConstructor {
  /**
   * @param {string} message - Message to inform when success.
   * @param {Record<any, any> | undefined} data - Data to return if HTTP status
   *   is 200.
   */
  constructor(message = 'OK', data = undefined) {
    this.success = true;
    this.message = message;
    this.data = data;
  }
}
