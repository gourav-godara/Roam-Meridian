const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

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
const app = express();
const weatherRoutes = require("./routes/weather.routes");
const errorMiddleware = require("./middleware/errorMiddleware"); // ← added
const mapsRoutes = require("./routes/maps.routes");
// ================= Middleware =================

app.use(express.json());
const path = require("path");

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://roam-meridian.vercel.app",
    ],
    credentials: true,
  })
);

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
app.use("/api/users", userRoutes);
app.use("/api/maps", mapsRoutes);
// Export App
app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.use(errorMiddleware); // ← added, must be LAST — after all routes

module.exports = app;