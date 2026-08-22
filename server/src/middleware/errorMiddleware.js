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

  // ⚠️ TEMPORARY DEBUG MODE — this always exposes the real error message
  // and a short stack trace, even in production, so we can see what's
  // actually failing without Render dashboard log access. REVERT THIS
  // FILE once the bug is found — never leave error details exposed to
  // the client in production long-term.
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    debugStack: (err.stack || "").split("\n").slice(0, 8),
  });
};

module.exports = errorMiddleware;
