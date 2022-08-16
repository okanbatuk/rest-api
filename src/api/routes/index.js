const express = require("express");
const productRoutes = require("./product.route.js");
const userRoutes = require("./user.route.js");
const router = express.Router();

//GET req => api/status
router.get("/status", (req, res) => res.status(200).json({ message: "OK" }));

// Routes
router.use("/products", productRoutes);
router.use("/users", userRoutes);

// if doesnt exist routes, send error
router.use((error, req, res, next) => {
  return next(error);
});

module.exports = router;
