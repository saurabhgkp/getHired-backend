const mongoose = require("mongoose");

const admin = mongoose.Schema({
  email: String,
  newPassword: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var Admin = mongoose.model("Admin", admin);

module.exports = Admin;
