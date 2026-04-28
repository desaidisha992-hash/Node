const wishlistModel = require("../Models/wishlist.model");

// Add Items Into Wishlist
module.exports.AddToWishlist = async ({ userId, item }) => {

    let wishlist = await wishlistModel.findOne({ userId });
    if (!wishlist) {
        wishlist = new wishlistModel({ userId, productIds: [] })
    }

    wishlist.productIds.push(item)
    console.log(wishlist)
    return await wishlist.save();
}