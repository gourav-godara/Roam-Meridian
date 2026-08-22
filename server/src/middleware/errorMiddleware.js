const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  // multer throws its own error type for upload problems (file too large,
  // too many files, wrong field name, etc). Without this, those always
  // fell through as a bare 500 "Internal Server Error" with no useful
  // message for the user.
  if (err.name === "MulterError") {
    const messages = {
      LIMIT_FILE_SIZE: "Each image must be smaller than 5MB.",
      LIMIT_FILE_COUNT: "You can upload up to 5 images.",
      LIMIT_UNEXPECTED_FILE: "Unexpected file field in upload.",
    };

    return res.status(400).json({
      success: false,
      message: messages[err.code] || err.message,
    });
  }

  const status = err.status || 500;
  const isProduction = process.env.NODE_ENV === "production";

  // In production, don't leak internal error messages/stack traces for
  // unexpected (5xx) errors — only pass through messages we set ourselves
  // on purpose (e.g. validation errors with a status already attached).
  const message =
    isProduction && status === 500
      ? "Internal Server Error"
      : err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
  });
};

module.exports = errorMiddleware;
