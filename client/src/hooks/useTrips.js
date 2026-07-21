import { useEffect, useState } from "react";
import { getTrips } from "../services/tripApi";

const useTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshTrips = async () => {
    try {
      setLoading(true);

      const result = await getTrips();

      setTrips(result.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load trips.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadTrips = async () => {
      try {
        const result = await getTrips();

        if (!ignore) {
          setTrips(result.data);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message || "Unable to load trips.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadTrips();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    trips,
    loading,
    error,
    refreshTrips,
  };
};

export default useTrips;

