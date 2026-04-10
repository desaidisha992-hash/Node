const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// databse Validation
let userSchema = mongoose.Schema({
     username:{
        type: stringify,
        minlength: 4,
        unique: true,
        required: true,       
     },
     email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
     },
     password: {
        type: string,
        required: true,
        select: false, // find query -- select false -- response ma add na thy
     },
     role:{
        type: string,
        enum: ["user", "admin"],
        default: "user",
     },
});

// jwt token
userSchema.methods.generateAuthToken = function(){
    let token= jwt.sign({_id: this.id}, process.env.JWT_SECRET,{expiresIn: "7d"});
    return token;
}; // this._id --> database user's _id

// bcrypt
// hash (static)
userSchema.static.hashPassword = async function(){
    let hash =  await bcrypt.hash(password, 10);
    return hash;
}

// compare(methods)
userSchema.methods.comparePassword = async function(){
    let result = await bcrypt.compare(password, this.password);
}; // this.password --> database uaer's password

module.exports = mongoose.model("user", userSchema);