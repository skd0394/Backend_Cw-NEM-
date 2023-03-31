const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { UserModel } = require("../Model/user_model");

const UserRouter = express.Router();

// this below route is to regestering new user ;

UserRouter.post("/register", async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 7, async (err, hashed_password) => {
      let newUser = await new UserModel({
        ...req.body,
        password: hashed_password,
      });
      await newUser.save();
      res.status(200).send({ status: "User registration successfull !" });
    });
  } catch (err) {
    res.status(402).send({ error: "Something went wrong !" });
    console.log(
      "Found error while hashing the password or sending it in databse , plz check it once :",
      err
    );
  }
});

UserRouter.get("/get_registered_user", async (req, res) => {
  try {
    let all_users = await UserModel.find();
    if (all_users.length == 0) {
      res.send({ msg: "no registerd users available !" });
    } else {
      res.status(200).send({
        status: "Okk",
        msg: "Accepted request",
        registered_users: all_users,
      });
    }
  } catch (err) {
    res.status(400).send({ error: "something went wron in backen service !" });
    console.log("found this errror:", err);
  }
});

UserRouter.post("/user_login", async (req, res) => {
  const { password, email } = req.body;
  try {
    const data = await UserModel.find({ email });
    if (data.length>0) {
      bcrypt.compare(
        password, 
        data[0].password,
        async (err, decripted_password) => {
          if (err) {
            res.send({ error: "somthing went wrong !" });
            console.log("found error while decripting the password !", err);
          }
          if (!decripted_password) {
            res.send({ err: "Wrong Credentials !" });
          } else {
            res.status(200).send({
              status: "Logged in Successfull",
              Token: jwt.sign({ userID: data[0]._id }, process.env.SECRETKEY),
            });
          }
        }
      );
    } else {
      res.send({ msg: "user not found !" });
    }
  } catch (err) {
    res.status(200).send({ error: "something went wrong" });
    console.log("found error while loging in :", err);
  }
});

module.exports = {
  UserRouter,
};
