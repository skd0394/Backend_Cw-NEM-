const { productSchema } = require("./product_model");
const mongoose = require("mongoose");



const CartModel = mongoose.model("cart_data",productSchema)
 

module.exports = {
    CartModel
}