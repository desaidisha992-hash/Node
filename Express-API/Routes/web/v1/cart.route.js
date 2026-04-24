const express = require("express");
const router = express.Router();
const userMiddleware= require ("../../../Middlewares/user.middleware")
const cartComtroller = require("../../../Controllers/cart.controller")

// add items
router.post("/add", userMiddleware.authUser, cartComtroller.AddToCart);


// get all items
router.get("/all", userMiddleware.authUser,cartComtroller.GetCart);


// remove single items from cart
router.delete("/product/:id", userMiddleware.authUser,cartComtroller.RemoveItem)



module.exports = router;