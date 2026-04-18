const express = require("express");
const router = express.Router();
const middleware = require ("../../../Middlewares/admin.middleware")
const adminController = require("../../../Controllers/admin.controller")
const usermiddleware = require("../../../Middlewares/user.middleware");

// show all users
// login user --> check user is Admin? --> show all users
router.get("/all/user",usermiddleware.authUser, middleware.authAdmin, adminController.AllUser)





module.exports = router;