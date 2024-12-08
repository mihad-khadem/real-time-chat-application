const createError = require("http-errors");

// Not-found handler
const notFoundHandler = (req, res, next) => {
  next(createError(404, "Your requested resource is not found"));
};

// Default error handler
const errorHandler = (err, req, res, next) => {
  // Set error details based on environment
  const errorDetails =
    process.env.NODE_ENV === "development"
      ? { message: err.message, stack: err.stack }
      : { message: err.message };

  // Set the response status
  res.status(err.status || 500);

  // Check if the request expects HTML or JSON
  if (req.accepts("html") && res.locals.html !== false) {
    // Render the error page for HTML requests
    res.render("error", {
      title: "Error",
      error: errorDetails,
    });
  } else {
    // Send a JSON response for API requests
    res.json({
      error: errorDetails,
    });
  }
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
