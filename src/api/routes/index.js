const express = require("express");
const productRoutes = require("./product.route");
const router = express.Router();

//GET req => api/status
router.get("/status", (req, res) => res.send("OK"));

// Routes
router.use("/products", productRoutes);

// if doesnt exist routes, send error
router.use((error, req, res, next) => {
  return next(error);
});

module.exports = router;
