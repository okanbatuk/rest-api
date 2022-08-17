const jwt = require("jsonwebtoken"),
  httpStatus = require("http-status"),
  { ACCESS_TOKEN_SECRET_KEY } = require("../../config/vars.js");

module.exports = (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(httpStatus.UNAUTHORIZED).json(err);
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return next(error);
  }
};
