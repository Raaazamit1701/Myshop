import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in localStorage:", token); // Debugging
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token); // Store token
    setIsLoggedIn(true); 
    navigate("/"); 
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false); 
    navigate("/login"); 
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          MyShop
        </Link>
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          ) : (
            <>
              <Link to="/cart" className="text-white hover:underline">
                Cart
              </Link>
              <Link to="/orders" className="text-white hover:underline">
                My Orders
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
