// user router

const express = require("express");
const router = express.Router();
const { getUsers } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

// login page route
router.get("/", decorateHtmlResponse("Users"), getUsers);
// add user

module.exports = router;
