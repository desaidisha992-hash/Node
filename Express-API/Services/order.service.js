const orderModel = require("../Models/order.model");
const productModel = require("../Models/product.model"); 

// Create Order
module.exports.CreateOrder = async({userId, items})=>{
   let totalAmount = 0;

   let oderItems = [];

   for(let item of items){
    console.log(item);
      const productId = item.productId;
      const product = await productModel.findOne({_id: productId})

      if(!product)  throw new Error ("Product Not Found")

        const itemsTotal = product.price * item.quantity;

        totalAmount += itemsTotal;

        oderItems.push({
            productId: product._id,
            quantity: item.quantity,
            price: product.price,
            total: itemsTotal
        });  
   }

   return await orderModel.create({
    userId,
    items: oderItems,
    totalbill: totalAmount,
   });
};

// Get Order History Or Show Order
module.exports.GetOrder = async(userId)=>{
    return await orderModel.findOne({userId});
}