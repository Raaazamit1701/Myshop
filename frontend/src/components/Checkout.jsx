import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount } = location.state || { totalAmount: 0 };

  const handleCODPayment = () => {
    alert("Cash on Delivery selected. Your order is being processed.");
    setTimeout(() => {
      alert("Order successful!");
      navigate("/");
    }, 1000); // Optional delay for better user experience
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8 text-center">Checkout</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Summary</h2>
        <p className="text-lg text-gray-600 mb-6">
          Total Amount: <span className="font-bold text-blue-600">${totalAmount}</span>
        </p>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Payment Method</h3>
          <div>
            <button
              onClick={handleCODPayment}
              className="w-full bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Cash on Delivery (COD)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
