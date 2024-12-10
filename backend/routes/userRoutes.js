const express = require("express"); // Import express
const {
	loginUser,
	logoutUser,
	signupUser
} = require("../controllers/userControllers.js");

const protectRoute = require("../middlewares/protectRoute.js");

const router = express.Router(); // Initialize the router

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router; // Export the router
