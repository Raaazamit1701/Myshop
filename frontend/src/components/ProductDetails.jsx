import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setSelectedSize(response.data.sizeOptions[0]?.size || null);
      })
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  const addToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to the cart.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
      (item) => item._id === product._id && item.selectedSize === selectedSize
    );

    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity, selectedSize });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-xl font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 lg:px-16">
      {/* Category Badge */}
      <div className="flex justify-center mb-6">
        <span className="text-white text-sm font-semibold bg-indigo-600 px-4 py-2 rounded-full shadow-md transform hover:scale-105 transition">
          {product.category}
        </span>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="flex justify-center items-start lg:w-1/2 p-6 mt-2 ">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-h-[70vh] object-contain rounded-md shadow-md hover:scale-105 transform transition-all duration-300"
          />
        </div>

        {/* Product Info Section */}
        <div className="lg:w-1/2 p-6 lg:p-10 space-y-6 bg-gray-50 h-[80vh] overflow-y-auto">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

          {/* Price and Discount */}
          <div className="flex items-center space-x-4">
            <p className="text-2xl font-semibold text-gray-800">
              ${product.price}
            </p>
            <span className="bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
              5.75% OFF
            </span>
          </div>

          {/* Delivery Info */}
          <div className="text-sm space-y-2">
            <p className="text-blue-500 font-medium">FREE delivery</p>
            <p className="text-gray-500">
              Gift options not available.{" "}
              <span className="text-indigo-600 underline cursor-pointer">
                Learn more
              </span>
            </p>
            <p className="text-green-600 font-medium">Ships in 5 days</p>
          </div>

          {/* Product Details */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Product Details
            </h3>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>
                <strong>Brand:</strong> {product.brand || "Premium"}
              </li>
              <li>
                <strong>Stock:</strong> Low
              </li>
              <li>
                <strong>Warranty:</strong>{" "}
                {product.warrantyInformation || "N/A"}
              </li>
              <li>
                <strong>Order Quantity:</strong> {product.id}
              </li>
              <li>
                <strong>Return Policy:</strong>{" "}
                {product.returnPolicy || "1 Week"}
              </li>
            </ul>
          </div>

          {/* Available Sizes */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Available Sizes
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {product.sizeOptions.map((option) => (
                <button
                  key={option.size}
                  onClick={() => setSelectedSize(option.size)}
                  className={`px-4 py-2 text-sm font-medium border rounded-md shadow-sm ${
                    selectedSize === option.size
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-50 text-gray-800"
                  }`}
                >
                  {option.size} ({option.availableQuantity})
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Product Description
            </h3>
            <p className="text-gray-700 text-sm">{product.description}</p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="w-full bg-indigo-600 text-white text-lg font-medium py-3 rounded-md shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
