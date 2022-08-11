const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("../api/routes");

const app = express();

//Middleware
app.use(morgan("dev"));

// Parse body params and attach them to req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO: Route conf will be created here
app.use("/api", routes);

module.exports = app;
