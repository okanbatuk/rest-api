const httpStatus = require("http-status");
const expressValidation = require("express-validation");
const APIError = require("../errors/APIError");

const handler = (error, req, res, next) => {
  const response = {
    code: error.status || httpStatus[error.status],
    message: error.message,
    errors: error.errors,
    stack: error.stack,
  };
  let status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
  res.status(status);
  res.json(response);
};

exports.handler = handler;

/*
 * error is difference from APIError
 *
 */
exports.converter = (error, req, res, next) => {
  let convertedError = error;

  if (error instanceof expressValidation.ValidationError) {
    convertedError = new APIError({
      message: "ValidationError",
      errors: error.errors,
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      stack: error.stack,
    });
  } else if (!(error instanceof Error)) {
    convertedError = new APIError({
      message: error.message,
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      stack: error.stack,
    });
  }
  return handler(convertedError, req, res, next);
};

/*
 * catch 404 and forward to error handler
 *
 */
exports.notFound = (req, res, next) => {
  const error = new APIError({
    message: "NotFound",
    status: httpStatus.NOT_FOUND,
  });
  return handler(error, req, res, next);
};
