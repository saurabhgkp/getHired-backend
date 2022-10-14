const mongoose = require("mongoose");

const dataPost = mongoose.Schema({
  imageUrl: String,
  category: String,
  title: String,
  mainBody: String,
  addItems: [],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var DataPost = mongoose.model("DataPost", dataPost);

module.exports = DataPost;
