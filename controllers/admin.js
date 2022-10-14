const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const DataPost = require("../models/dataPost");

const Comment = require("../models/commentsModel");
const User = require("../models/usres");
const Sheet = require("../models/sheets");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  const newPassword = await bcrypt.hash(password, 10);

  console.log(newPassword);
  const newUser = new Admin({ email, newPassword });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 0,
      message: "something went wrong",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  //const newPassword = await bcrypt.hash(password, 10);
  const data = await Admin.findOne({
    where: { email: email },
  });
  // console.log(data);
  try {
    const isData = await bcrypt.compare(password, data.newPassword);

    if (data && isData) {
      const token = jwt.sign({ id: data.id }, "saurabh");
      return res.status(200).json({
        status: 1,
        token: token,
      });
    } else {
      res.send("user not found");
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: "something went wrong",
    });
  }
};

exports.addPosts = async (req, res) => {
  const { imageUrl, category, title, mainBody } = req.body;
  const data = new DataPost({ imageUrl, category, title, mainBody });
  try {
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
};

exports.addComment = (req, res) => {
  let data = {
    author: {
      id: req.body.id,
      name: req.body.name,
    },
    commentText: req.body.commentText,
  };
  if ("parentId" in req.body) {
    data.parentId = req.body.parentId;
  }
  if ("depth" in req.body) {
    data.depth = req.body.depth;
  }
  const comment = new Comment(data);
  comment
    .save()
    .then((comment) =>
      res.json({
        comment: comment,
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

exports.getComments = (req, res) => {
  Comment.find({ postId: "1" })
    .sort({ postedDate: 1 })
    .lean()
    .exec()
    .then((comments) => {
      let rec = (comment, threads) => {
        for (var thread in threads) {
          value = threads[thread];

          if (thread.toString() === comment.parentId.toString()) {
            value.children[comment._id] = comment;
            return;
          }

          if (value.children) {
            rec(comment, value.children);
          }
        }
      };
      let threads = {},
        comment;
      for (let i = 0; i < comments.length; i++) {
        comment = comments[i];
        comment["children"] = {};
        let parentId = comment.parentId;
        if (!parentId) {
          threads[comment._id] = comment;
          continue;
        }
        rec(comment, threads);
      }
      res.json({
        count: comments.length,
        comments: threads,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.getAllUserData = async (req, res) => {
  try {
    const alluser = await User.find();

    res.status(200).json({
      status: 1,
      message: alluser,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "error",
    });
    console.log(error);
  }
};
// { $set: { isActive: isActive } }
exports.blockuser = async (req, res) => {
  const { userId, isActive } = req.body;
  try {
    const data = await User.findOneAndUpdate(
      { id: userId },
      { isActive: isActive }
    );
    if (data.isActive == true) {
      res.status(200).json({
        status: 1,
        message: "user blocked",
      });
    } else {
      res.status(200).json({
        status: 1,
        message: "user unblocked",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "error 1",
    });
  }
};

exports.addSheets = async (req, res) => {
  const { sheetId, SheetName } = req.body;

  try {
    const newSheet = new Sheet({ sheetId, SheetName });
    await newSheet.save();
    res.status(201).json(newSheet);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 0,
      message: "something went wrong",
    });
  }
};
