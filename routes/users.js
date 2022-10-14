var express = require("express");
var router = express.Router();
var userController = require("../controllers/users");
//const isAuth = require('../middleware/isAuth')

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("this is User Route");
});

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/addItem", userController.addItem);

router.post("/removeItem", userController.removeItem);

//router.get("/userDetail", userController.userDetail);

module.exports = router;
