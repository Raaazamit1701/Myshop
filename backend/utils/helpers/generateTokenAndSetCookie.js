const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

  // Set the JWT token in the response cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",  // Ensure it's only true in production with HTTPS
    sameSite: "Strict",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 1 day
  });

  return token;
};

module.exports = generateTokenAndSetCookie;
