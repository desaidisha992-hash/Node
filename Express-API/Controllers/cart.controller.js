const cartModel =
  require("../Models/cart.model");

const cartService =
  require("../Services/cart.service");


// =========================
// ADD TO CART
// =========================

module.exports.AddToCart =
  async (req, res) => {

    try {

      const userId =
        req.user.id;

      const { item } =
        req.body;

      // CHECK ITEM

      if (
        !item ||

        !item.productId
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Product ID Required"

        });
      }

      console.log(
        "BODY => ",
        req.body
      );

      // FIND CART

      let Exist =
        await cartModel.findOne({
          userId
        });

      // CREATE EMPTY CART

      if (!Exist) {

        Exist =
          await cartModel.create({

            userId,

            items: []

          });
      }

      // CHECK PRODUCT EXISTS

      const existProduct =
        Exist.items.map((val) => {

          return val.productId;

        });

      let alreadyExists =
        false;

      existProduct.forEach((e) => {

        if (

          e.toString() ===
          item.productId

        ) {

          alreadyExists =
            true;

        }

      });

      // ALREADY EXISTS

      if (alreadyExists) {

        return res.status(400).json({

          success: false,

          message:
            "Product Already Added Into Cart"

        });
      }

      // ADD PRODUCT

      const cart =
        await cartService.addToCart({

          userId,

          item

        });

      return res.status(200).json({

        success: true,

        message:
          "Add Item To Cart Successfully",

        cart

      });

    } catch (error) {

      console.log(
        "CART ERROR => ",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          error.message

      });
    }
};


// =========================
// GET CART
// =========================

module.exports.GetCart =
  async (req, res) => {

    try {

      const userId =
        req.user.id;

      let cart =
        await cartService.GetCart(
          userId
        );

      if (!cart) {

        return res.status(404).json({

          success: false,

          message:
            "Cart Not Found"

        });
      }

      return res.status(200).json({

        success: true,

        message:
          "Cart Data Fetch Successfully",

        cart

      });

    } catch (error) {

      return res.status(400).json({

        success: false,

        message:
          error.message

      });
    }
};


// =========================
// REMOVE ITEM
// =========================

module.exports.RemoveItem =
  async (req, res) => {

    try {

      const userId =
        req.user.id;

      const productId =
        req.params.id;

      await cartService.RemoveSingleProduct({

        userId,

        productId

      });

      return res.status(200).json({

        success: true,

        message:
          "Remove Item From Cart Successfully"

      });

    } catch (error) {

      return res.status(400).json({

        success: false,

        message:
          error.message

      });
    }
};