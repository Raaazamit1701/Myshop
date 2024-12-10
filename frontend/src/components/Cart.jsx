import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    return savedCart || [];
  });
  const [offerMessage, setOfferMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleIncrement = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const handleDecrement = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + Number(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  const handleProceedToCheckout = () => {
    setOfferMessage("Offer applied successfully!");
    setTimeout(() => {
      navigate("/checkout", { state: { totalAmount: getTotalPrice() } });
    }, 1500);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        Your Shopping Cart
      </h1>
      <div className="text-center text-2xl font-semibold text-blue-600 mb-8">
        Total: ${getTotalPrice()}
      </div>
      {offerMessage && (
        <p className="text-center text-green-500 font-medium mb-4">
          {offerMessage}
        </p>
      )}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-600">
            Your cart is currently empty.
          </h2>
          <p className="text-gray-400 mt-2">
            Browse our collection and add items to your cart.
          </p>
          <Link
            to="/shop"
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cart.map((item) => (
              <div key={item._id} className="bg-white shadow-md rounded-xl p-5">
                <div className="relative w-full h-[160px] flex items-center justify-center bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                  <span className="text-xs uppercase font-semibold text-gray-500 bg-gray-200 px-2 py-1 rounded-br-lg absolute top-2 left-2 z-10">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {item.title.length > 20
                    ? `${item.title.substring(0, 17)}...`
                    : item.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {item.description.length > 65
                    ? `${item.description.substring(0, 62)}...`
                    : item.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-lg font-semibold text-blue-500">
                    ${Number(item.price).toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 bg-gray-100 border border-gray-300 rounded">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrement(item._id)}
                      className="px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white shadow-lg rounded-lg p-6 flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={handleClearCart}
                className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition duration-200"
              >
                Clear Cart
              </button>
              <button
                onClick={handleProceedToCheckout}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
