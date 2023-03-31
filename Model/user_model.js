const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
     
    },
     
    name: String,
    password:String
});

const UserModel = mongoose.model("users", userSchema);

module.exports = {
    UserModel
}