const express = require("express");

const router = express.Router();

const wishlistController =
  require("../../../Controllers/wishlist.controller");

router.post(
  "/add",
  wishlistController.AddToWishlist
);

router.get(
  "/all",
  wishlistController.getWishlist
);

router.post(
  "/remove",
  wishlistController.removeFromWishlist
);

module.exports = router;