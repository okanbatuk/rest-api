const http = require("http");
const { host, port } = require("./config/vars.js");
const app = require("./config/express");

// Build http server configuration
const server = http.createServer(app);
server.listen(port, (err) => {
  if (err) throw new Error(err);
  console.log(`Server running at http://${host}:${port}`);
});
