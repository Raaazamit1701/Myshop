import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
        setLoading(false);
      });
  }, []);

  console.log(products);
  

  if (loading) {
    return (
      <p className="text-center text-gray-700 font-medium text-xl mt-10">
        Loading...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[150px]" style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 opacity-80"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl font-extrabold drop-shadow-lg">Explore Our Premium Collection</h1>
          <p className="text-lg mt-4 max-w-2xl">
            "Find products that match your style and bring joy to your life. Because you deserve the best."
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-lg transition duration-300"
            >
              {/* Product Image */}
              <div className="relative w-full h-[160px] flex items-center justify-center bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                <span className="text-xs uppercase font-semibold text-gray-500 bg-gray-200 px-2 py-1 rounded-br-lg absolute top-2 left-2 z-10">
                  {product.category}
                </span>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-yellow-600 transition-colors duration-300">
                  {product.title.length > 20
                    ? `${product.title.substring(0, 17)}...`
                    : product.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {product.description.length > 40
                    ? `${product.description.substring(0, 65)}...`
                    : product.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-blue-500">
                    ${product.price}
                  </span>
                  <div className="text-sm text-gray-500 flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">
                      {product.rating} ({product.reviews.length} reviews)
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to={`/product/${product._id}`}
                    className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-200 py-6">
        <div className="container mx-auto text-center">
          <p>© 2024 Your Company Name. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link to="#" className="text-gray-400 hover:text-white transition">
              Facebook
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition">
              Twitter
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition">
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
