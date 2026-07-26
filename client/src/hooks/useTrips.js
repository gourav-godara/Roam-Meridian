import { useEffect, useState, useCallback } from "react";
import { getTrips } from "../services/tripApi";

function useTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshTrips = useCallback(async () => {
    try {
      setLoading(true);

      const result = await getTrips();

      setTrips(result.data || []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load trips.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshTrips();
  }, [refreshTrips]);

  return {
    trips,
    loading,
    error,
    refreshTrips,
  };
}

export default useTrips;