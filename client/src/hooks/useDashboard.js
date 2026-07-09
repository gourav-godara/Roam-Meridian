import {
  user, stats, upcomingTrip, quickLinks, continuePlanning,
  recentBookings, recommendations, mapPins, activityTimeline, travelTip,
} from "../data/dashboardData";

function useDashboard() {
  // Centralizes all dashboard data behind one hook — when real APIs
  // (Astha's user data, Jinal's bookings/expenses) exist, only this
  // file changes; every component below stays untouched.
  return {
    user, stats, upcomingTrip, quickLinks, continuePlanning,
    recentBookings, recommendations, mapPins, activityTimeline, travelTip,
  };
}

export default useDashboard;
