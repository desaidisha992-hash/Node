const express = require ("express");
const router = express.Router();
const userMiddleware = require("../../../Middlewares/user.middleware");
const wishlistController = require("../../../Controllers/wishlist.controller")

// Add Into Wishlist
router.post ("/add", userMiddleware.authUser, wishlistController.AddToWishlist);

// Remove Item Form Wishlist



module.exports = router;