const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res, next) => {
    res.status(200).json({
      message: "Handling GET",
    });
  })
  .post((req, res, next) => {
    res.status(200).json({
      message: "Handling POST",
    });
  });

module.exports = router;
