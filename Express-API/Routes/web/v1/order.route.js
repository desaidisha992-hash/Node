const express = require("express");
const router = express.Router();
const userMiddleware = require("../../../Middlewares/user.middleware");
const orderController = require("../../../Controllers/order.controller")

// create Order
router.post("/add", userMiddleware.authUser, orderController.CreateOrder);

// Get Order -Show History Or Recent Order
router.get("/all", userMiddleware.authUser,orderController.GetOrder);

// Remove Items For Order


// Cancel Order

module.exports = router;