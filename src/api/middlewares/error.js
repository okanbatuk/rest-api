const httpStatus = require("http-status");
const expressValidation = require("express-validation");
const APIError = require("../errors/APIError");

const handler = (error, req, res, next) => {
  const response = {
    status: error.status,
    message: error.message || httpStatus[error.status],
    errors: error.errors,
  };
  res.status(error.status);
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
      status: error.status,
    });
  } else if (!(error instanceof Error)) {
    convertedError = new APIError({
      message: error.message,
      status: error.status,
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
