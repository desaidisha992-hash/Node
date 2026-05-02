const Product = require("../Models/product.model");


// ======================================
// CREATE PRODUCT
// ======================================

exports.createProduct = async (req, res) => {

  try {

    console.log("BODY => ", req.body);

    const product = await Product.create({

      name: req.body.name,

      description: req.body.description,

      category: req.body.category,

      brand: req.body.brand,

      price: req.body.price,

      stock: req.body.stock,

      images: req.body.images || [],

    });

    res.status(201).json({
      success: true,
      product,
    });

  } catch (error) {

    console.log("CREATE ERROR => ", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ======================================
// ALL PRODUCTS
// ======================================

exports.allProduct = async (req, res) => {

  try {

    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {

    console.log("ALL PRODUCT ERROR => ", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ======================================
// SINGLE PRODUCT
// ======================================

exports.singleProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });

    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {

    console.log("SINGLE PRODUCT ERROR => ", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ======================================
// UPDATE PRODUCT
// ======================================

exports.updateProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });

    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {

    console.log("UPDATE PRODUCT ERROR => ", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ======================================
// DELETE PRODUCT
// ======================================

exports.deleteProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (error) {

    console.log("DELETE PRODUCT ERROR => ", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};