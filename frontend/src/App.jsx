import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import Cart from "./components/Cart";
import MyOrders from "./components/MyOrders";  // New route
import AccountSettings from "./components/AccountSettings";  // New route
import Checkout from "./components/Checkout";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("authToken") !== null);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        {/* Existing Routes */}
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* New Routes */}
        <Route path="/orders" element={<MyOrders />} />  {/* New route for My Orders */}
        <Route path="/account-settings" element={<AccountSettings />} />  {/* New route for Account Settings */}
      </Routes>
    </Router>
  );
};

export default App;
