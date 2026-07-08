// backend/src/services/dashboard.service.js
const Trip = require("../models/trip.model");
const Review = require("../models/review.model");
const Expense = require("../models/expense.model");
const getDashboardData = async (userId) => { // An async function that will later fetch data from MongoDB.
  const trips = await Trip.find({
    createdBy: userId,
}).populate("destinationId");
const today = new Date();

const totalTrips = trips.length;

const upcomingTrips = trips.filter(
    trip => new Date(trip.startDate) >= today
);

const completedTrips = trips.filter(
    trip => trip.status === "completed"
);
const countries = new Set();

trips.forEach((trip) => {
  if (trip.destinationId?.country) {
    countries.add(trip.destinationId.country);
  }
});
const recentReviews = await Review.find({
  user: userId,
})
  .populate("destination")
  .sort({ createdAt: -1 })
  .limit(5);
  const expenses = await Expense.find({
  paidBy: userId,
});
const totalSpent = expenses.reduce(
  (sum, expense) => sum + expense.amount,
  0
);
  return { // Returns a massive object full of data arrays.
    stats: {
  totalTrips,
  upcomingTrips: upcomingTrips.length,
  countries: countries.size,
  savedTrips: 0,
  reviews: recentReviews.length,
  totalExpenses: totalSpent,
  groupTrips: trips.filter(t => t.collaborators.length > 0).length,
},

    upcomingTrips,
  

    recentReviews,

    expenseSummary: {
  totalSpent,
  youOwe: 0,
  youAreOwed: 0,
  recentExpenses: expenses.slice(0, 5),
},
    travelHistory: completedTrips,
  };
};

module.exports = {
  getDashboardData,
};