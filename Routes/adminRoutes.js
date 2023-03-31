const express = require("express");
const { ProductModel } = require("../Model/product_model");
// const app = express()
const adminRouter = express();
adminRouter.get("/", async (req, res) => {
  try {
    let data = await ProductModel.find();
    res.send(data);
  } catch (error) {
    res.send({ msg: error.messege });
  }
});
adminRouter.post("/add", async (req, res) => {
  try {
    const user = new ProductModel(req.body);
    await user.save();
    res.send(`Data successfully posted`);
  } catch (error) {
    res.send({ msg: error.messege });
  }
});
adminRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
     await ProductModel.deleteOne({ _id: id });
  } catch (error) {
    res.send({ msg: error.messege });
  }
});
module.exports = {adminRouter}