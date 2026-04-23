const express = require("express");
const router = express.Router();
const usermiddleware = require("../../../Middlewares/user.middleware");
const chatController = require("../../../Controllers/chat.controller")

//router --> service --> controller --> call into router
router.post("/chat", usermiddleware.authUser, chatController.botReply);


module.exports = router;