const orderService = require("../Services/order.service");

// Create Order
module.exports.CreateOrder = async (req, res)=>{
    try {
        const userId = req.user.id;
        const {items} = req.body;

        const order = await orderService.CreateOrder({userId, items});
       
        if(!order){
            return res.status(404).json("Product Not Found");
        }

        return res.status(200).json({message: "Order Created SuccessFully", order});
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
};

// Get Order Details And Show Order Status
module.exports.GetOrder = async (req, res)=>{
   try {
     const userId = req.user.id;

     const order = await orderService.GetOrder(userId);

     if(!order) return res.status(404).json({message: "Order Not Found !!"})

        return res.status(200).json({message: "Order Featch SuccessFully", order})
   } catch (error) {
     return res.status(400).json({message: error.message})
   }
}