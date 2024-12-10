const express = require("express");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");
const protectRoute = require("../middlewares/protectRoute");

const router = express.Router();

// Helper function to decode JWT token and fetch userId
const getUserFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    throw new Error("Unauthorized");
  }
};

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;

    // Create the order
    const order = await Order.create({
      user: userId,
      products,
      totalAmount,
      status: 0, // Assuming a new order is placed with status 0 (pending)
    });

    if (order) {
      res.status(201).json({ message: "Order placed successfully", order });
    } else {
      res.status(400).json({ message: "Failed to place order" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user orders with status 1
router.get("/my-orders", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const userId = getUserFromToken(token);

    const orders = await Order.find({ user: userId, status: 1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found with status 1" });
    }

    const products = [];
    orders.forEach((order) => {
      products.push(...order.products);
    });

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add product to cart (status 0)
router.post("/cart/:id", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const userId = getUserFromToken(token);

    const order = await Order.findOne({ user: userId, status: 0 });

    if (!order) {
      return res.status(404).json({ message: "Cart is empty or not found" });
    }

    const productId = req.params.id;

    // Find the product to add/update in the cart
    const productIndex = order.products.findIndex((p) => p.product._id.toString() === productId);

    if (productIndex !== -1) {
      // If the product exists in the cart, increase the quantity
      order.products[productIndex].quantity += 1;
    } else {
      // Add new product to cart
      order.products.push({
        product: productId,
        quantity: 1,
      });
    }

    // Save the updated order
    await order.save();

    res.json(order.products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Buy now: Change status from 0 to 1
router.post("/order", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const userId = getUserFromToken(token);

    // Find the order with status 0 (cart)
    const order = await Order.findOne({ user: userId, status: 0 });

    if (!order) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    // Change the status of the order to 1 (purchased)
    order.status = 1;

    // Save the updated order
    await order.save();

    res.status(200).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get cart products (status 0)
router.get("/cart", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const userId = getUserFromToken(token);

    // Find the order with status 0 (cart)
    const order = await Order.findOne({ user: userId, status: 0 }).populate('products.product');

    if (!order) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.status(200).json(order.products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
