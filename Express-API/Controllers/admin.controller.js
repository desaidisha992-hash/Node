const userModel = require("../Models/user.model");
const adminService = require("../Services/admin.service");
const {validationResult} = require("express-validator");

// get all user
module.exports.AllUser = async (req, res) =>{
    try {
        const users = await adminService.getAllUser();

        return res.status(200).json({message: "User Fetch Sucessfully", users})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

// delete user
module.exports.deleteUser = async (req, res)=>{
  try {
    const user = await adminService.deleteUser(req.params.id);
    if(!user){
        return res.status(404).json({message: "User Not Find"})
    }
    
     return res.status(200).json({message: "User Delete SuccessFully"})

     
  } catch (error) {
    return res.status(400).json({message: error.message})
  }
};

// create manager
module.exports.registerManager = async(req, res)=>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const{ username, email, password, role } = req.body;

    // Check user Alredy Registed or not
    let isExist = await userModel.findOne({ email: email});
    if (isExist){
       return res.status(400).json({message: "user is already register"});
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await adminService.createManager({username, email, password: hashPassword, role});

    let token = await user.generateAuthToken();

    res.status(200).json({ token, user });
};