const path = require("path");

// import env variables from .env
require("dotenv").config({
  path: path.join(__dirname, "../../.env"),
});

module.exports = {
  host: process.env.HOST,
  port: process.env.PORT,
  db: {
    connectionString: process.env.DBSTRING,
  },
};
