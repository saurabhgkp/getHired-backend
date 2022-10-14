var express = require("express");
var router = express.Router();
var adminController = require("../controllers/admin");
var loginController = require("../controllers/admin");
const isAuth = require("../middleware/isAuth");
//const fileUploader = require('../middleware/fileUploader')

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("this is Admin Route");
});

router.post("/register", adminController.register);
router.post("/login", adminController.login);
router.post("/addPosts", adminController.addPosts);
router.get("/getAllUserData", adminController.getAllUserData);

router.post("/addComment", adminController.addComment);

router.get("/getComments", adminController.getComments);

router.post("/blockuser", adminController.blockuser);

router.post("/addSheets", adminController.addSheets);

module.exports = router;
