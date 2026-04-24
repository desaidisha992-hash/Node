const cartModel = require("../Models/cart.model");

// add item to cart
module.exports.addToCart = async ({ userId, item }) => {
    let cart = await cartModel.findOne({ userId });

    if (!cart) cart = new cartModel({ userId, items: [] });

    cart.items.push(item);
    return await cart.save();
}

// get cart
module.exports.GetCart = async (userId) => {
    return await cartModel.findOne({ userId });
};

// delete single product fromcart
module.exports.RemoveSingleProduct = async ({ userId, productId }) => {
    // find login user cart
    let cart = await cartModel.findOne({ userId });

    if (!cart) throw new Error("Cart Not Found !!");

    // find index number of product based on productId
    const itemIndex = cart.items.findIndex(
        (i) => i.productId.equals(productId),
        // i --> that give items array
    );
    console.log(itemIndex);

    if (itemIndex === 0) {
        throw new Error("Item Not Found");
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();
};