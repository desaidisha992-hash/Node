const express = require("express");
const router = express.Router();
const middleware = require ("../../../Middlewares/admin.middleware")
const adminController = require("../../../Controllers/admin.controller")
const usermiddleware = require("../../../Middlewares/user.middleware");
const {body} = require("express-validator");

// show all users
// login user --> check user is Admin? --> show all users
router.get("/all/user",usermiddleware.authUser, middleware.authAdmin, adminController.AllUser);

// Delete User
router.delete("/user/:id", usermiddleware.authUser, middleware.authAdmin, adminController.deleteUser);

// updatd role -- create manager
// router -- service -- controller -- call into router
router.put("/user/:id/role", usermiddleware.authUser, middleware.authAdmin, adminController.updateUserRole);



module.exports = router;