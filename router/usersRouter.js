// user router

const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middlewares/users/userValidator");

//! login page routes

// get all users
router.get("/", decorateHtmlResponse("Users"), getUsers);
// add user
router.post(
  "/",
  avatarUpload,
  addUserValidator,
  addUserValidatorHandler,
  addUser
);
// Delete user
router.delete("/:id", removeUser);

module.exports = router;
