const express = require("express");
const{body} = require("express-validator");
const userController = require("../../../Controllers/user.controller");
const middleware = require("../../../Middlewares/user.middleware")

const router = express.Router();

// register user
// second validation -- use express validator package
router.post('/register',[
    body('username').isLength({min: 4}).withMessage("username must be 4 character long"),
     body('email').isEmail().withMessage("Enter Vaild Email"),
      body('password').isLength({min: 6}).withMessage("Password must be 6 characters long"),
], userController.registerUser );

// login user
router.post("/login", [
    body('email').isEmail().withMessage("Enter Vaild Email"),
    body("password").isLength({min:6}).withMessage("Password Must Be 6 Character Long"),
], userController.loginUser);

// show profile
router.get("/profile",middleware.authUser, userController.profile);


// logout profile
router.get("/logout", middleware.authUser, userController.logout);

// update profile
router.put("/update", middleware.authUser , userController.updateUser);

// forget password
router.post("/forget-password", userController.forgetPassword);

// reset password
router.post("/reset-password/:token", userController.resetPassword);

module.exports = router;