const userModel = require("../Models/user.model");
const adminService = require("../Services/admin.service");
const { validationResult } = require("express-validator");

// get all user
module.exports.AllUser = async (req, res) => {
    try {
        const users = await adminService.getAllUser();

        return res.status(200).json({ message: "User Fetch Sucessfully", users })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

// delete user
module.exports.deleteUser = async (req, res) => {
    try {
        const user = await adminService.deleteUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User Not Find" })
        }

        return res.status(200).json({ message: "User Delete SuccessFully" })


    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
};

// update user role
module.exports.updateUserRole = async (req, res) => {
    try {
        const userId = req.params.id;
        const { role } = req.body;

        if (req.user.role !== "admin") {
            return res.status(401).json({ message: "Access Denied !!" });
        }
        const user = await adminService.updateUserRole({ userId, role })

        if (!user) {
            throw new Error(" User Not Found !!")
        }
        return res.status(200).json({ message: "User Role Updated SucessFully",user });

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
};