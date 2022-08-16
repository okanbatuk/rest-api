const express = require("express"),
  httpStatus = require("http-status"),
  controller = require("../controllers/user.controller.js"),
  APIError = require("../errors/APIError");

const router = express.Router();

router.route("/").get(async (req, res, next) => {
  try {
    const result = await controller.getUser();
    if (!(result instanceof APIError)) {
      return res.status(httpStatus.OK).json(result);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(result);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
