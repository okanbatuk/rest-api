const httpStatus = require("http-status"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  { ACCESS_TOKEN_SECRET_KEY } = require("../../config/vars.js"),
  pool = require("../../config/postgres"),
  APIError = require("../errors/APIError");

exports.getUser = async (req, res) => {
  try {
    let result = await pool.query("Select * from vw_users;");
    if (result.rowCount == 0) {
      return new APIError({
        message: "UserNotFound",
        errors: "User Not Found",
        status: httpStatus.NOT_FOUND,
      });
    }
    return result;
  } catch (error) {
    return error;
  }
};

exports.register = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.fullname) {
    return new APIError({
      message: "InvalidParams",
      errors: "Email and password and fullname must be provided",
      status: httpStatus.BAD_REQUEST,
    });
  } else {
    try {
      let cryptedPassword = await bcrypt.hash(req.body.password, 10);
      let text =
        "INSERT INTO users (email, password, fullname) VALUES ($1,$2,$3) RETURNING *;";
      let values = [req.body.email, cryptedPassword, req.body.fullname];
      let result = await pool.query(text, values);
      if (result.rowCount == 0 || !result) {
        return new APIError({
          message: "UserNotCreated",
          errors: "User not created",
          status: httpStatus.INTERNAL_SERVER_ERROR,
        });
      }
      return result;
    } catch (error) {
      return error;
    }
  }
};

exports.login = async (req, res) => {
  try {
    let text = "SELECT * FROM users WHERE email=$1";
    let values = [req.body.email];
    let { rows } = await pool.query(text, values);
    let isLogin = await bcrypt
      .compare(req.body.password, rows[0].password)
      .then((result) => {
        return result;
      });
    if (isLogin) {
      const token = jwt.sign(rows[0], ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: "2h",
      });
      return { accessToken: token };
    }
    return new APIError({
      message: "UserNotLoggedIn",
      errors: "Email or password is incorrect",
      status: httpStatus.NOT_FOUND,
    });
  } catch (error) {
    return error;
  }
};

exports.updateInfo = async (req, res) => {
  if (!req.params || !req.body.email || !req.body.fullname) {
    return new APIError({
      message: "InvalidParams",
      errors: "Email and fullname must be provided",
      status: httpStatus.BAD_REQUEST,
    });
  } else {
    try {
      let { userId } = req.params;
      let text =
        "UPDATE users SET email = $1, fullname = $2 WHERE id = $3 RETURNING *;";
      let values = [req.body.email, req.body.fullname, userId];
      let result = await pool.query(text, values);
      if (result != undefined && result.rowCount != 0) return result;
      return new APIError({
        message: "UserNotUpdated",
        errors: "User Not Updated",
        status: httpStatus.BAD_REQUEST,
      });
    } catch (error) {
      return error;
    }
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let text = "Update users set isActive=false where id = $1 returning *;";
    let values = [userId];

    let result = await pool.query(text, values);
    if (result != undefined && result.rowCount != 0) return result;
    return new APIError({
      message: "UserNotDeleted",
      errors: "User Not Deleted",
      status: httpStatus.status.BAD_REQUEST,
    });
  } catch (error) {
    return error;
  }
};

exports.changePassword = async (req, res) => {
  try {
  } catch (error) {
    return error;
  }
};
