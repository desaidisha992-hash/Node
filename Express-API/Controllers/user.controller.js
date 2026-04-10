const userService = require("../Services/user.service");
const {vaildationResult} = require("express-validator");

module.exports.registerUser = async (req, res) =>{
    const error = vaildationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array() })
    }

    const{ username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password);
}