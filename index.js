
const express = require("express");
const { dbConnection } = require("./dbConnection");
const { adminRouter } = require("./Routes/adminRoutes");
const { getRouter } = require("./Routes/get_products.route");
const {UserRouter} = require("./Routes/user.route")
const { CartRouter } = require("./Routes/cart_product.route");

require("dotenv").config()

const cors = require('cors');
const corsOptions ={
    origin:['http://localhost:3000', 'https://medi-hub-admin.vercel.app'],
    credentials:true,            
    optionSuccessStatus:200
}

const app = express()
app.use(cors(corsOptions))

app.use(express.json())
app.use("/", getRouter)
app.use("/user", UserRouter);
app.use("/cart",CartRouter)
app.use("/",getRouter)
app.use("/admin",adminRouter)

app.listen(process.env.PORT,dbConnection);

