// user router

const express = require("express");
const router = express.Router();
const { getUsers, addUser } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middlewares/users/userValidator");

// login page route
router.get("/", decorateHtmlResponse("Users"), getUsers);
// add user
router.post(
  "/",
  avatarUpload,
  addUserValidator,
  addUserValidatorHandler,
  addUser
);

module.exports = router;
