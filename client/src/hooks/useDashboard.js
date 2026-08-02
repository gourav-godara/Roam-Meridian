import { useEffect, useState } from "react";
import api from "../services/api";

function useDashboard() {
  const [user, setUser] = useState({});
  const [stats, setStats] = useState([]);
  const [upcomingTrip, setUpcomingTrip] = useState(null);
  const [continuePlanning, setContinuePlanning] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [mapPins, setMapPins] = useState([]);
  const [activityTimeline, setActivityTimeline] = useState([]);
  const [travelTip, setTravelTip] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expenseSummary, setExpenseSummary] = useState({});
  const [travelHistory, setTravelHistory] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);

  const fetchDashboard = async () => {
    setLoading(true);

    try {
      const res = await api.get("/dashboard");

      const data = res.data.data;

      setUser(data.user);
      setStats(data.stats);
      setUpcomingTrip(data.upcomingTrip);
      setContinuePlanning(data.continuePlanning || []);
      setRecommendations(data.recommendations || []);
      setMapPins(data.mapPins || []);
      setActivityTimeline(data.activityTimeline || []);
      setTravelTip(data.travelTip || {});
      setExpenseSummary(data.expenseSummary || {});
      setTravelHistory(data.travelHistory || []);
      setRecentReviews(data.recentReviews || []);
      setError("");
    } catch (err) {
      // Previously this only logged to the console — the user saw a blank
      // dashboard with zero indication anything had gone wrong, and no
      // way to retry.
      setError(
        err.response?.data?.message ||
          "Unable to load your dashboard right now."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboard();
  }, []);

  return {
    user,
    stats,
    upcomingTrip,
    continuePlanning,
    recommendations,
    mapPins,
    activityTimeline,
    travelTip,
    loading,
    error,
    refreshDashboard: fetchDashboard,
    expenseSummary,
    travelHistory,
    recentReviews,
  };
}

export default useDashboard;
