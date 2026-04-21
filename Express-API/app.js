const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const cors = require("cors");
const db = require("./Config/db");
const cookieParser = require("cookie-parser");
// Route
const userRouter = require("./Routes/web/v1/user.route");
const adminRouter= require("./Routes/web/v1/admin.route");
const productRouter = require("./Routes/web/v1/product.route");


const app = express();
app .use (express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.set(db());

// cors origin --> allow only that website that mention into origin group, ex. backend only res when localhost 3000 send requset, other than give cors error
// localhost 3000 --> req --> accept --> give response
// localhost 3000 --> req --> cors error --> don't give response 
// in origin you mention frontend urls(develpoment, producation both)
app.use(cors({origin : "http://localhost:3500", credentials: true}));


PORT = process.env.PORT;

// temp route --> in backend we don't create a home page . after testing/ developement remove home route
app.get("/", (req,res)=>{
    res.status(401).json({message:"Access Denined !!!"});
});
app.use("/user", userRouter); // --> loacalhost:3000/user/register
app.use("/admin", adminRouter); // --> url/admin/all/user
app.use("/product", productRouter);


app.listen(PORT, ()=>{
    console.log(`Server Is Running On PORT ${PORT}`)
});