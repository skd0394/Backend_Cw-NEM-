const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: String,
  name: String,
  discount: String,
  subcategory: String,
  subcat2: String,
  brand: String,
  price: Number,
  mainprice: String,
  category: String,
  userID: String,
  quantity: Number,
});

const ProductModel = mongoose.model("medi_products", productSchema);

module.exports = {
  ProductModel,
  productSchema,
};

/*
    image:
        discount: "15% OFF",
  name: "Abzorb Dusting Powder 100gm",
  subcategory: "Body Care",
  subcat2: "Treatments",
  brand: "Mkt: Sun Pharmaceutical Industries Ltd",
  "price-box": "Best price*",
  price: "₹120.70",
  mainprice: "Rs.142.00",
  category: "treatments",
*/
