const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  req.forbidden = true;
  let decodeToken;

  if (!authHeader) {
    req.isAuth = false;
    return res.status(401).json({
      status: 0,
      message: "request not authorize.",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token || token == "") {
    req.isAuth = false;
    return res.status(401).json({
      status: 0,
      message: "request not authorize.",
    });
  }

  try {
    decodeToken = jwt.verify(token, "saurabh");
  } catch (error) {
    req.isAuth = false;
    return res.status(401).json({
      status: 0,
      message: "request not authorize.",
    });
  }

  if (!decodeToken) {
    req.isAuth = false;
    return res.status(401).json({
      status: 0,
      message: "request not authorize.",
    });
  }
  console.log(decodeToken);
  req.isAuth = true;
  req.userId = decodeToken.userId;
  req.adminId = decodeToken.adminId;
  next();
};

// const admin = require("../config/firebase-config");
// class Middleware {
//   async decodeToken(req, res, next) {
//     const token = req.headers.authorization.split(" ")[1];
//     try {
//       const decodeValue = await admin.auth().verifyIdToken(token);
//       if (decodeValue) {
//         req.user = decodeValue;
//         return next();
//       }
//       return res.json({ message: "Un authorize" });
//     } catch (e) {
//       return res.json({ message: "Internal Error" });
//     }
//   }
// }

// module.exports = new Middleware();
