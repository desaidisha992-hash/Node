const express = require("express");
const{validationResult} = require("express-validator");

const router = express.Router();

// register user
// second validation -- use express validator package
router.post('/register',[
    body('username').isLength({min: 4}).WithMessage("username must be 4 character long"),
     body('emali').isEmail().WithMessage("Enter Vaild Email"),
      body('password').isLength({min: 6}).WithMessage("Password must be 6 characters long"),
])

module.exports = router;