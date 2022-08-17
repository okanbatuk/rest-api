const express = require("express"),
  productRoutes = require("./product.route.js"),
  userRoutes = require("./user.route.js"),
  checkauth = require("../middlewares/checkauth"),
  router = express.Router();

//GET req => api/status
router.get("/status", (req, res) => res.status(200).json({ message: "OK" }));

// Routes
router.use("/users", userRoutes);
router.use("/products", checkauth, productRoutes);

// if doesnt exist routes, send error
router.use((error, req, res, next) => {
  return next(error);
});

module.exports = router;
