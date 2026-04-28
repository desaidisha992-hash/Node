const express = require("express");
const router = express.Router();
const usermiddleware = require("../../../Middlewares/user.middleware");
const chatController = require("../../../Controllers/chat.controller")

//router --> service --> controller --> call into router
router.post("/chat", usermiddleware.authUser, chatController.botReply);

// Remove All Item Form Cart --> Empty Cart

module.exports = router;