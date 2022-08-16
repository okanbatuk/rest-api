const httpStatus = require("http-status");
const pool = require("../../config/postgres");
const APIError = require("../errors/APIError");

exports.getUser = async (req, res) => {
  try {
    const result = await pool.query("Select * from users");
    if (result.rowCount == 0) {
      return new APIError({
        message: "User Not Found",
        errors: "User Not Found",
        status: httpStatus.NOT_FOUND,
      });
    }
    return result;
  } catch (error) {
    return error;
  }
};
