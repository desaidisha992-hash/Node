const userModel = require("../Models/user.model");
const adminService = require("../Services/admin.service");

module.exports.AllUser = async (req, res) =>{
    try {
        const users = await adminService.getAllUser();

        return res.status(200).json({message: "User Fetch Sucessfully", users})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}