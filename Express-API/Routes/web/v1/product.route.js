// product creation
// product read single and all
// product update
// product delete

const express = require("express");
const usermiddleware = require("../../../Middlewares/user.middleware")
const adminmiddleware = require("../../../Middlewares/admin.middleware")
const productController = require("../../../Controllers/product.controller");
const router = express.Router();

// create product
router.post("/add", usermiddleware.authUser, adminmiddleware.authAdmin, productController.createProduct, );
// authUser --> check user login or not?? --> if login then --> req. user(give back)
// authAdmin --> req.user --> check role --> admin or not?? --> jump to next router

// all product 
router.get("/all", usermiddleware.authUser, adminmiddleware.authAdmin, productController.allProduct);

// single product 
router.get("/:id", usermiddleware.authUser, adminmiddleware.authAdmin, productController.singleProduct);

// update product 
router.put("/:id", usermiddleware.authUser, adminmiddleware.authAdmin,productController.updateProduct);

// delete product
router.delete("/:id", usermiddleware.authUser, adminmiddleware.authAdmin, productController.deleteProduct);


module.exports = router;