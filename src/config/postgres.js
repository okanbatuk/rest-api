const { Pool } = require("pg");
const { db } = require("../config/vars.js");

const postgresClient = new Pool({
  connectionString: db.connectionString,
});

module.exports = postgresClient;
