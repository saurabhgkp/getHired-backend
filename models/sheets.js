const mongoose = require("mongoose");

const sheets = mongoose.Schema({
  sheetId: String,
  SheetName: String,
  isActive: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var Sheet = mongoose.model("Sheet", sheets);

module.exports = Sheet;
