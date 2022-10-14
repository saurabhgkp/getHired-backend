const DataPost = require("../models/dataPost");

exports.showData = async (req, res) => {
  try {
    const data = await DataPost.find();

    if (data) {
      return res.status(201).json({
        status: 1,
        message: "susscce",
        data: data,
      });
    } else {
      return res.status(500).json({
        status: 0,
        message: "no data to show",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
