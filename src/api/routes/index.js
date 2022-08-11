const express = require("express");
const productRoutes = require("./product.route");
const router = express.Router();

/**
 * GET req => api/status
 *
 */
router.get("/status", (req, res) => res.send("OK"));

router.use("/products", productRoutes);

module.exports = router;
