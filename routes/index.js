var express = require("express");
var router = express.Router();
var dataController = require("../controllers/dataFlow");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("working data");
});

router.get("/showData", dataController.showData);
module.exports = router;
