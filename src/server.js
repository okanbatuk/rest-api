const http = require("http");
const APIError = require("./api/middlewares/error");
const { host, port } = require("./config/vars.js");
const app = require("./config/express");
const postgresClient = require("./config/postgres.js");

// Build http server configuration
const server = http.createServer(app);
server.listen(port, (err) => {
  if (err) return next(err);
  console.log(`Server running at http://${host}:${port}`);
  try {
    postgresClient.connect().then(() => {
      console.log(`Db connection successful`);
    });
  } catch (error) {
    return next(error);
  }
});
