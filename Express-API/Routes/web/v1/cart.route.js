const express = require("express");
const router = express.Router();
const userMiddleware= require ("../../../Middlewares/user.middleware")
const cartComtroller = require("../../../Controllers/cart.controller")

// add items
router.post("/add", userMiddleware.authUser, cartComtroller.AddToCart);


// get all items


// remove items




module.exports = router;