const express = require("express");

const router = express.Router();

const userMiddleware =
require("../../../Middlewares/user.middleware");

const cartController =
require("../../../Controllers/cart.controller");


// ADD ITEM

router.post(
  "/add",
  userMiddleware.authUser,
  cartController.AddToCart
);


// GET CART

router.get(
  "/all",
  userMiddleware.authUser,
  cartController.GetCart
);


// REMOVE ITEM

router.delete(
  "/remove/:id",
  userMiddleware.authUser,
  cartController.RemoveItem
);


module.exports = router;