const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("../api/routes");
const error = require("../api/middlewares/error");

const app = express();

// Request logging.
// TODOS this will be morgan(logs) from vars.js
// TODOS dev: console | production: file
app.use(morgan("dev"));

// Parse body params and attach them to req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO: Route conf will be created here
app.use("/api", routes);

//if error is not an instanceof APIError
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

//error handler will be called
app.use(error.handler);

module.exports = app;
