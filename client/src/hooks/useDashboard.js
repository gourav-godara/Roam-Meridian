import { useEffect, useState } from "react";
import api from "../services/api";

function useDashboard() {
  const [user, setUser] = useState({});
  const [stats, setStats] = useState([]);
  const [upcomingTrip, setUpcomingTrip] = useState(null);
  const [continuePlanning, setContinuePlanning] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [mapPins, setMapPins] = useState([]);
  const [activityTimeline, setActivityTimeline] = useState([]);
  const [travelTip, setTravelTip] = useState({});
  const [loading, setLoading] = useState(true);
  const [expenseSummary, setExpenseSummary] = useState({});
  const [travelHistory, setTravelHistory] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  useEffect(() => {
     console.log("Dashboard useEffect running");
    const fetchDashboard = async () => {
      console.log("Fetching dashboard...");
      try {
        const res = await api.get("/dashboard");

        const data = res.data.data;

        setUser(data.user);
        setStats(data.stats);
        setUpcomingTrip(data.upcomingTrip);
        setContinuePlanning(data.continuePlanning || []);
setRecentBookings(data.recentBookings || []);
setRecommendations(data.recommendations || []);
setMapPins(data.mapPins || []);
setActivityTimeline(data.activityTimeline || []);
setTravelTip(data.travelTip || {});
setExpenseSummary(data.expenseSummary || {});
setTravelHistory(data.travelHistory || []);
setRecentReviews(data.recentReviews || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return {
    user,
    stats,
    upcomingTrip,
    continuePlanning,
    recentBookings,
    recommendations,
    mapPins,
    activityTimeline,
    travelTip,
    loading,
    expenseSummary,
    travelHistory,
    recentReviews,
  };
}

export default useDashboard;
