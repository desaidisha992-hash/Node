const userModel = require("../Models/user.model");


// thrid validation --> check all field are not blank

module.exports.createUser = async ({username, email, password})=>{
    if(!username || !email || !password){
        throw new Error ("All Filed Are Required");
    }
    const user = await userModel.create({username, email, password});
    
    return user;
}