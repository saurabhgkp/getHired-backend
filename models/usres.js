const mongoose = require("mongoose");

const users = mongoose.Schema({
  name: String,
  email: String,
  crypassword: String,
  isActive: {
    type: Boolean,
    default: false,
  },
  addItems: [],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var User = mongoose.model("User", users);

module.exports = User;
