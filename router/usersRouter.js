// user router

const express = require("express");
const router = express.Router();
const { getUsers } = require("../controller/usersController");

// login page route
router.get("/", getUsers);

module.exports = router;
