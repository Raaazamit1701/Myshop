const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/helpers/generateTokenAndSetCookie.js");
const mongoose = require("mongoose");

const signupUser = async (req, res) => {
	try {
		const { name, email, username, password } = req.body;
		const user = await User.findOne({ $or: [{ email }, { username }] });

		if (user) {
			return res.status(400).json({ error: "User already exists" });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			password: hashedPassword,
		});
		await newUser.save();

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);

			res.status(201).json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid email or password" });

		
        await user.save();

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			user,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
		console.log("Error in loginUser: ", error.message);
	}
};

const logoutUser = (req, res) => {
    try {
      res.cookie("jwt", "", {
        httpOnly: true,  // Make sure this is set if you're using HttpOnly cookies
        secure: process.env.NODE_ENV === "production",  // Only set to true in production with HTTPS
        sameSite: "Strict",  // Adjust as necessary
        expires: new Date(0),  // Set the cookie's expiration to the past
      });
  
      res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log("Error in logoutUser: ", err.message);
    }
  };
  

module.exports = {
	signupUser,
	loginUser,
	logoutUser,
};
