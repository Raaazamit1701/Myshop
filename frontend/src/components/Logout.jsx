import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout"); // Ensure cookies are included
      localStorage.removeItem("token"); // Remove any localStorage items if applicable
      alert("Logged out successfully!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error.message);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-6 py-3 rounded shadow-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
