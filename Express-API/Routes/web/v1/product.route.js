const express = require("express");

const productController = require("../../../Controllers/product.controller");

const router = express.Router();

// CREATE PRODUCT
router.post("/add", productController.createProduct);

// ALL PRODUCTS
router.get("/all", productController.allProduct);

// SINGLE PRODUCT
router.get("/:id", productController.singleProduct);

// UPDATE PRODUCT
router.put("/:id", productController.updateProduct);

// DELETE PRODUCT
router.delete("/:id", productController.deleteProduct);

module.exports = router;