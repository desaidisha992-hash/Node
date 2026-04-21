const mongoose = require("mongoose");
const userModel = require("./user.model");

let permissionSchema = mongoose.Schema({
    name:{
        type: String,
        minLength :3,
        unique: true,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: false,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
})


module.exports.mongoose.model("permission", managerSchema);