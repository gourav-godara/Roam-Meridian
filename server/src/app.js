const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const path = require("path");

// Import Routes
const authRoutes = require("./routes/auth.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const userRoutes = require("./routes/user.routes");
const destinationRoutes = require("./routes/destination.routes");
const plannerRoutes = require("./routes/planner.routes");
const reviewRoutes = require("./routes/review.routes");
const expenseRoutes = require("./routes/expense.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const tripRoutes = require("./routes/trip.routes");
const notificationRoutes = require("./routes/notification.routes");
const weatherRoutes = require("./routes/weather.routes");
const mapsRoutes = require("./routes/maps.routes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// ================= Security =================
app.use(helmet());

// Allow a comma-separated list of origins via env (falls back to local dev).
const allowedOrigins = (
  process.env.CLIENT_URL || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin(origin, callback) {
      // allow non-browser requests (curl, server-to-server) with no origin
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// General API rate limit — protects free-tier third-party API keys
// (weather/maps) and slows down brute force / scraping.
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: "Too many requests. Please try again later.",
    },
  })
);

// Tighter limit on auth endpoints (login/OTP) to slow brute forcing.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many attempts. Please try again later.",
  },
});
app.use("/api/auth", authLimiter);

// ================= Middleware =================
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

<<<<<<< HEAD
=======
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://roam-meridian.vercel.app",
    ],
    credentials: true,
  })
);

>>>>>>> 59984aef1c62f183b7f57fb3f6d16dba79aaeb30
// ================= Routes =================
app.use("/api/auth", authRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/users", userRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/planner", plannerRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/maps", mapsRoutes);

app.get("/", (req, res) => {
  res.send("Server is working!");
});

// 404 for unknown API routes (must come after all real routes)
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

app.use(errorMiddleware); // must be LAST — after all routes

module.exports = app;

