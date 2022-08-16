const express = require("express"),
  httpStatus = require("http-status"),
  { getUser, login, register } = require("../controllers/user.controller.js"),
  APIError = require("../errors/APIError");

const router = express.Router();

router.route("/").get(async (req, res, next) => {
  try {
    const result = await getUser();
    if (!(result instanceof APIError)) {
      return res.status(httpStatus.OK).json(result.rows);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(result);
  } catch (error) {
    return next(error);
  }
});

router
  .route("/register")
  .get((req, res, next) => {
    res.status(httpStatus.OK).json({ message: "Register Page" });
  })
  .post(async (req, res, next) => {
    try {
      register(req).then((response) => {
        console.log(response);
        if (
          response instanceof APIError ||
          response == undefined ||
          response.severity == "ERROR"
        ) {
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
        } else {
          return res.status(201).json(response);
        }
      });
    } catch (error) {
      return next(error);
    }
  });

router
  .route("/login")
  .get((req, res, next) => {
    res.status(httpStatus.OK).json({ message: "Login Page" });
  })
  .post(async (req, res, next) => {
    login(req).then((response) => {
      console.log(response);
      if (response.length > 0) {
        return res.status(httpStatus.OK).json(response);
      }
      return res.status(httpStatus.NOT_FOUND).json(response);
    });
  });
module.exports = router;
