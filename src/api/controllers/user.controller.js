const httpStatus = require("http-status"),
  bcrypt = require("bcrypt"),
  pool = require("../../config/postgres"),
  APIError = require("../errors/APIError");

exports.getUser = async (req, res) => {
  try {
    let result = await pool.query("Select * from users");
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
    console.log("User created", result);
    return result;
  } catch (error) {
    return error;
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
    if (isLogin) return rows;
    return new APIError({
      message: "UserNotLoggedIn",
      errors: "Email or password is incorrect",
      status: httpStatus.NOT_FOUND,
    });
  } catch (error) {
    return error;
  }
};
