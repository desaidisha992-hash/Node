const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mongodb-basic");

// Schema ==> Document Structure ==> Document Look and Data Validation
const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
});

module.exports = mongoose.model("user", userSchema);
