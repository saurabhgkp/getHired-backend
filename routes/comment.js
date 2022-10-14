var express = require("express");
var router = express.Router();
var commentsController = require("../controllers/comment");
//const isAuth = require('../middleware/isAuth')

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("this is User Route");
});

router.get('/', commentsController.getComments)

router.post('/edit', commentsController.updateComment);

router.post('/add', commentsController.addComment);

module.exports = router;
