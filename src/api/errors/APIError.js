const httpStatus = require("http-status");
const ExtendableError = require("./extendableError");

/*
 * Error representing..
 * @extends {ExtendableError}
 *
 */

class APIError extends ExtendableError {
  constructor({
    message,
    errors,
    stack,
    status = httpStatus.INTERNAL_SERVER_ERROR,
  }) {
    super({
      message,
      errors,
      status,
      stack,
    });
  }

  /* static badRequest(message) {
    return new APIError(400, message);
  }
  static notFound(message) {
    return new APIError(404, message);
  }
  static internal(message) {
    return new APIError(500, message);
  } */
}

module.exports = APIError;
