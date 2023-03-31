const mongoose = require("mongoose");
require("dotenv").config()

const dbConnection = async () => {
    
    try {
        await mongoose.connect(process.env.DATABASECONNECTIONLINK);
        console.log("Successfully established connection with database 👍")    
        console.log("server started running on port:",process.env.PORT)
    }
    catch (err) {
        console.log("found error while connecting to database !",err)
    }
}

module.exports = {
    dbConnection
}