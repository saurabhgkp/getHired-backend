const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 4000;
const CONNECTION_URL =
  "mongodb+srv://mern:mern1234@cluster0.8nwu3.mongodb.net/mern?retryWrites=true&w=majority";
const cors = require("cors");

app.use(express.json());
app.use(cors());

// routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const comment = require("./routes/comment");

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use("/comment", comment);

// database and server connection

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
