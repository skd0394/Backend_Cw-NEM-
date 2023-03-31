const express = require("express");
const { ProductModel } = require("../Model/product_model");
// const app = express()
const getRouter = express();
getRouter.get("/", async (req, res) => {
  try {
    if (!req.query.price && !req.query.category) {
      console.log("ad");
      let data = await ProductModel.find();
      res.send(data);
    } else if (!req.query.price) {
      console.log("abc");
      // console.log(req.query.range)
      let data = await ProductModel.find({ category: req.query.category });
      res.send(data);
    } else if (req.query.price && !req.query.range) {
      console.log("aarushi");
      let data = await ProductModel.find({ category: req.query.category }).sort(
        { price: req.query.price }
      );
      res.send(data);
    } else if (req.query.range) {
      console.log("abcd");
      console.log(req.query.range);
      let data = await ProductModel.find({
        category: req.query.category,price:{ $gt: req.query.range }
      }).sort({ price: req.query.price });
      res.send(data);
    }
  } catch (error) {
    res.send({ msg: error.messege });
  }
});

getRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let data = await ProductModel.find({ _id: id });
    res.send(data);
  } catch (error) {
    res.send({ msg: error.messege });
  }
});
module.exports = { getRouter };
