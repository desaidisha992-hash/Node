const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const db = require("./Config/db");
const cookieParser = require("cookie-parser");

// Routes
const userRouter = require("./Routes/web/v1/user.route");
const adminRouter = require("./Routes/web/v1/admin.route");
const productRouter = require("./Routes/web/v1/product.route");
const chatRouter = require("./Routes/web/v1/chat.route");
const cartRouter = require("./Routes/web/v1/cart.route");
const orderRouter = require("./Routes/web/v1/order.route");
const wishlistRouter = require("./Routes/web/v1/wishlist.route");
const categoryRouter = require("./Routes/web/v1/category.route");

const app = express();


// ================= DATABASE =================
db();


// ================= MIDDLEWARE =================
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());


// ================= CORS =================
app.use(cors({
    origin: "http://localhost:3002",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

// ================= PORT =================
const PORT = process.env.PORT || 3005;


// ================= ROUTES =================
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Backend Running Successfully"
    });
});

app.use("/user", userRouter);

app.use("/admin", adminRouter);

app.use("/product", productRouter);

app.use("/bot", chatRouter);

app.use("/cart", cartRouter);

app.use("/order", orderRouter);

app.use("/wishlist", wishlistRouter);

app.use("/category", categoryRouter);



// ================= SERVER =================
app.listen(PORT, () => {
    console.log(`Server Is Running On PORT ${PORT}`);
});