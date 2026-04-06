const express = require("express");
const app = express();
const userModel = require("./Model/user.model")

app.use (express.json());
app.use(express.urlencoded({extended: true}));

app.set("View engine", "ejs");

app.get("/", (req, res)=>{
    res.send("Server Homepage");
});

// CRUD
// Create 
app.get("/create", async(req,res)=>{
  let createdUser=  await userModel.create({
    username: 'test2',
    name: 'test3 user',
    email: 'test3@gmail.com',
   })
   res.send(createdUser)
})


// Read
    // all user
    app.get('/all', async (req,res)=>{
    let allUser = await userModel.find();
    res.send(allUser);
})
// specific user - first only
 app.get('/read', async (req,res)=>{
 let User = await userModel.findOne({ username : "test1"});
 res.send(User);
})

    // all user based on query
   app.get('/user', async (req,res)=>{
 let UserData = await userModel.find({ username : "test1"});
 res.send(UserData);
}) 

// Update
app.get("/update", async (req,res)=>{
  let updatedUser=  await userModel.findOneAndUpdate(
    {username: "test1"} // find query
   ,{username: "coder", email: "coder@developer.com"} // update query --> waht is change
   ,{new:true})
   res.send(updatedUser);
})


// Delete
app.get("/delete", async (req,res)=>{
   await userModel.findOneAndDelete({username:"coder"});
   res.redirect("/all");
})


app.listen(2026,()=>{
    console.log("Server Is Running .....🏃‍♀️")
});