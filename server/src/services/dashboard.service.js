// backend/src/services/dashboard.service.js

const getDashboardData = async () => {
  return {
    stats: {
      totalTrips: 5,
      upcomingTrips: 2,
      savedTrips: 10,
      reviews: 8,
      totalExpenses: 25000,
      groupTrips: 4,
    },

    upcomingTrips: [],

    recentReviews: [],

    expenseSummary: {},

    travelHistory: [],
  };
};

module.exports = {
  getDashboardData,
};