// Uploader
const multer = require("multer");
const path = require("path");

const avatarUpload = (req, res, next) => {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/png", "image/jpg"],
    1000000,
    "Only .jpg, .jpeg and .png format allowed!"
  );
};

module.exports = avatarUpload;
