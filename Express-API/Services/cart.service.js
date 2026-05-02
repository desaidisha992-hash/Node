const cartModel = require("../Models/cart.model");


// =========================
// ADD ITEM TO CART
// =========================

module.exports.addToCart = async ({
  userId,
  item
}) => {

  // FIND USER CART

  let cart = await cartModel.findOne({
    userId
  });

  // CREATE NEW CART

  if (!cart) {

    cart = new cartModel({

      userId,

      items: []

    });
  }

  // ADD ITEM

  cart.items.push(item);

  return await cart.save();
};


// =========================
// GET CART
// =========================

module.exports.GetCart = async (
  userId
) => {

  return await cartModel
    .findOne({ userId })
    .populate("items.productId");
};


// =========================
// REMOVE SINGLE PRODUCT
// =========================

module.exports.RemoveSingleProduct =
  async ({

    userId,

    productId

  }) => {

    // FIND USER CART

    let cart =
      await cartModel.findOne({
        userId
      });

    if (!cart) {

      throw new Error(
        "Cart Not Found !!"
      );
    }

    // FIND ITEM INDEX

    const itemIndex =
      cart.items.findIndex(

        (i) =>

          i.productId.equals(
            productId
          )

      );

    console.log(itemIndex);

    // CHECK ITEM

    if (itemIndex === -1) {

      throw new Error(
        "Item Not Found"
      );
    }

    // REMOVE ITEM

    cart.items.splice(
      itemIndex,
      1
    );

    await cart.save();

    return cart;
};