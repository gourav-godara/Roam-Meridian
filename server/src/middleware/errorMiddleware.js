const errorMiddleware = (err, req, res, next) => {
  console.error(err);

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