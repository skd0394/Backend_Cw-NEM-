const jwt = require("jsonwebtoken");
require("dotenv").config();

const cart_authenticator = async (req, res, next) => {
    
    // console.log("ffffffffff",req)
  const token = req.headers.authorization;

  if (token) {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
      if (decoded) { 
          let id = await decoded.userID;
          if (req.method === "POST" || req.method=="GET"||req.method=="DELETE" ) {
            req.body.userID = id;
            req.body.quantity = 1;
            next();
          } else if (req.method == "PATCH") {
            // console.log("inside pathch")
            req.body.userID = id;
            next();
          } else {
            next();
          }
          
    } else {
      res.send({ msg: "You are not logged in !" });
    }
  } else {
    res.send({ msg: "You are not logged in !" });
  }
};

module.exports = {
  cart_authenticator,
};
