const Product = require("../Models/product.model");


// =========================
// TEMP WISHLIST STORAGE
// =========================

let wishlist = [];


// =========================
// ADD TO WISHLIST
// =========================

exports.AddToWishlist = async (req, res) => {

  try {

    const { productId } = req.body;

    // CHECK PRODUCT

    const product =
      await Product.findById(productId);

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });

    }

    // CHECK ALREADY EXISTS

    const alreadyExists =
      wishlist.find(
        (item) =>
          item._id.toString() ===
          productId
      );

    if (alreadyExists) {

      return res.status(200).json({
        success: true,
        message:
          "Already In Wishlist",
      });

    }

    // ADD PRODUCT

    wishlist.push(product);

    res.status(200).json({
      success: true,
      message:
        "Added To Wishlist",
      wishlist,
    });

  } catch (error) {

    console.log(
      "Wishlist Add Error => ",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// =========================
// GET WISHLIST
// =========================

exports.getWishlist = async (req, res) => {

  try {

    res.status(200).json({
      success: true,
      wishlist,
    });

  } catch (error) {

    console.log(
      "Wishlist Fetch Error => ",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// =========================
// REMOVE FROM WISHLIST
// =========================

exports.removeFromWishlist = async (req, res) => {

  try {

    const { productId } = req.body;

    wishlist = wishlist.filter(
      (item) =>
        item._id.toString() !==
        productId
    );

    res.status(200).json({
      success: true,
      message:
        "Removed From Wishlist",
      wishlist,
    });

  } catch (error) {

    console.log(
      "Wishlist Remove Error => ",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};