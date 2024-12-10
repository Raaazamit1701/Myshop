const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const protectRoute = require("../middlewares/protectRoute")
// Get all products
router.get("/",  async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get product by ID
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

module.exports = router;
