const pg = require("pg");
const { db } = require("../config/vars.js");

const postgresClient = new pg.Pool({
  connectionString: db.connectionString,
});

module.exports = postgresClient;
