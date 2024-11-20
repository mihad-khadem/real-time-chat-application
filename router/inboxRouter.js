// inbox router

const express = require("express");
const router = express.Router();
const { getInbox } = require("../controller/inboxController");

// inbox page route
router.get("/", getInbox);

module.exports = router;
