const mongoose = require("mongoose");


// =========================
// CART SCHEMA
// =========================

let CartSchema = mongoose.Schema({

    userId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "user",

        required: true

    },

    items: [

        {

            productId: {

                type:
                  mongoose.Schema.Types.ObjectId,

                ref: "product",

                required: true

            },

            quantity: {

                type: Number,

                default: 1

            }

        }

    ]

},
{
    timestamps: true
});


// =========================
// EXPORT
// =========================

module.exports =
  mongoose.model(
    "cart",
    CartSchema
  );