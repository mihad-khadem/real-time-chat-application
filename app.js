//  node chat application

// dependencies
// external dependencies
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
// const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
// internal dependencies
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const loginRouter = require("./router/loginRouter");
const userRouter = require("./router/userRouter");

// request parser
app.use(express.json());
// app.use(cors());
// set view engine
app.set("view engine", "ejs");
// set static folder
app.use(express.static(path.join(__dirname, "public")));
// parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));
// database connection

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    app.listen(process.env.PORT, () => {
      console.log(`app listening on port ${process.env.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
// routes
app.use("/", loginRouter);
app.use("/users", userRouter);
app.use("/inbox", inboxRouter);
// 404 Not Found handler
app.use(notFoundHandler);
// error handler (common)
app.use(errorHandler);
// call
main();
