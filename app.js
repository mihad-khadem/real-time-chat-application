const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
// const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

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

// routes
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
// error handler
// call
main();
