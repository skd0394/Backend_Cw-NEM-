const { CartModel } = require("../Model/cart_model");
const { cart_authenticator } = require("../Middleware/cart_data.middleware");
const express = require("express");

const CartRouter = express.Router();
CartRouter.use(cart_authenticator);

CartRouter.patch("/updt_quantity/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity, userID } = req.body;

  try {
    await CartModel.findByIdAndUpdate({ "_id":id ,"userID":userID}, { quantity });
    res.status(200).send({ status: "updated quantity 👍" });
  } catch (error) {
    console.log("found error while updating :", error);
    res.send({ error: "something went wrong !" });
  }
});

CartRouter.get("/get_products", async (req, res) => {
  const { userID } = req.body;
  try {
    const data = await CartModel.find({ userID });
    const length =  data.length;
    res.status(200).send({"msg":"accepted","Data":data,"length":length});
  } catch (error) {
    console.log(error);
  }
});
CartRouter.post("/add_to_cart", async (req, res) => {
  try {
    let newCartProduct = await new CartModel(req.body);
    await newCartProduct.save();
    res.status(200).send({ msg: "successfully added to the cart !" });
  } catch (err) {
    console.log(err);
  }
});

CartRouter.delete("/delete_product/:product_id", async (req, res) => {
  const { product_id } = req.params;
  const { userID } = req.body;
  try {
    await CartModel.findByIdAndDelete({ "_id": product_id, userID });
    res.status(200).send({"msg":"product successfully deleted "})
  } catch (error) {
    console.log("found error while deleting a product :", error);
    res.status(400).send({"err":"something went wrong !"})
     }
})

module.exports = {
  CartRouter,
};
