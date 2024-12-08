const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");
const { unlink } = require("fs");
const path = require("path");

const User = require("../../models/People");

const addUserValidator = [
  // Validate email
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createHttpError(409, "User already exists");
        }
      } catch (error) {
        throw createHttpError(500, error.message);
      }
    }),

  // Validate password
  check("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "Password must be at least 8 characters long and contain at least one number."
    ),

  // Validate name
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name must not be empty.")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain special characters.")
    .trim(),

  // Validate mobile number for Bangladesh using custom regex
  check("mobile")
    .isMobilePhone("bn-BD")
    .withMessage(
      "Please enter a valid Bangladesh mobile number, starting with 880."
    )
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createHttpError(409, "Mobile number already exists");
        }
      } catch (error) {
        throw createHttpError(500, error.message);
      }
    }),
];

// Add user validator handler to check validation errors
const addUserValidatorHandler = (req, res, next) => {
  // console.log("add user validator handler");
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  // Proceed if no validation errors
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // Remove uploaded file if validation fails
    if (req.file && req.file.filename) {
      const { filename } = req.file;
      unlink(
        path.join(__dirname, `../../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) {
            console.log("Error removing file:", err);
          }
        }
      );
    }

    // Return validation errors in response
    res.status(400).json({ errors: mappedErrors });
  }
};

module.exports = { addUserValidator, addUserValidatorHandler };
