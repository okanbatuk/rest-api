const express = require("express"),
  httpStatus = require("http-status"),
  {
    getUser,
    login,
    register,
    updateInfo,
    deleteUser,
  } = require("../controllers/user.controller.js"),
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
        if (
          response instanceof APIError ||
          response == undefined ||
          response.severity == "ERROR"
        ) {
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
        }
        return res.status(201).json(response);
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
      if (response) {
        return res.status(httpStatus.OK).json(response);
      }
      return res.status(httpStatus.NOT_FOUND).json(response);
    });
  });

router.route("/:userId").post(async (req, res, next) => {
  updateInfo(req).then((response) => {
    if (
      response == undefined ||
      response.length == 0 ||
      response instanceof APIError
    ) {
      return res.status(httpStatus.BAD_REQUEST).json(response);
    }
    return res.status(httpStatus.OK).json({ updatedUser: response.rows[0] });
  });
});

router.route("/:userId").delete(async (req, res, next) => {
  deleteUser(req).then((response) => {
    if (
      response != undefined &&
      !(response instanceof APIError) &&
      response.rows.length > 0
    ) {
      return res.status(httpStatus.OK).json({ deletedUser: response.rows[0] });
    }
    return res.status(httpStatus.BAD_REQUEST).json(response);
  });
});
module.exports = router;
