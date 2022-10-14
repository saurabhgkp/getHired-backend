const User = require("../models/usres");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { all } = require("express/lib/application");
//const { check } = require('../utils/string')
//const userKyc = require('../models/userKyc')

exports.register = async (req, res) => {
  const { name, email, password, addItems } = req.body;

  try {
    const crypassword = await bcrypt.hash(password, 10);

    const userInDB = await User.find({ email: email });

    if (userInDB.length == 0) {
      const newUser = new User({ name, email, crypassword, addItems });
      await newUser.save();

      res.status(201).json({
        message: "Register Successfully",
      });
    } else {
      res.status(400).json({
        message: "this email is Alredy Used",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 0,
      message: "something went wrong",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.query;

  try {
    const data = await User.findOne({ email: email });

    const isData = await bcrypt.compare(password, data.crypassword);
    console.log(isData);
    if (data && isData) {
      const token = jwt.sign({ id: data.id }, "saurabh");

      res.header("auth-token", token);
      res.send(token);
    } else {
      res.send("user not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 0,
      error: error,
    });
  }
};
exports.addItem = async (req, res) => {
  try {
    const { userId, addItem } = req.body;
    const data = await User.findByIdAndUpdate(userId, {
      $push: { addItems: addItem },
    });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

exports.removeItem = async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    const allarray = await User.findById(userId, "addItems");
    const data = allarray.addItems.filter((int) => {
      return int !== itemId;
    });
    console.log(data);
    const newUser = await User.findByIdAndUpdate(userId, {
      addItems: data,
    });

    res.send(newUser);
  } catch (error) {
    console.log(error);
  }
};
