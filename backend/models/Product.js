const mongoose = require('mongoose');

// Define the schema for the product
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  image: { type: String, required: true }, // Assuming the image is a URL or path to the image file
  availabilityStatus: { type: String, default: 'In Stock' },
  rating: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: String },  // The reviewer's username or name
      rating: { type: Number, min: 1, max: 5 }, // Rating between 1 to 5
      comment: { type: String },
    }
  ],
  sizeOptions: [
    {
      size: { type: String, required: true },
      availableQuantity: { type: Number, required: true },
      sizeCode: { type: String, required: true }, // Unique identifier for the size option
    }
  ],
  warrantyInformation: { type: String, default: 'No warranty information provided' },
  shippingInformation: { type: String, default: 'Standard shipping applied' },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
