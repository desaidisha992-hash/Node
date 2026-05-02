const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  // PRODUCT NAME
  name: {
    type: String,
    required: true,
  },

  // DESCRIPTION
  description: {
    type: String,
    required: true,
  },

  // CATEGORY
  category: {
    type: String,
    required: true,
  },

  // BRAND
  brand: {
    type: String,
    required: true,
  },

  // PRICE
  price: {
    type: Number,
    required: true,
  },

  // STOCK
  stock: {
    type: Number,
    required: true,
  },

  // IMAGES
  images: {
    type: [String],
    default: [],
  },

  // SKU
  // unique remove karyu che
  sku: {
    type: String,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "Product",
  productSchema
);