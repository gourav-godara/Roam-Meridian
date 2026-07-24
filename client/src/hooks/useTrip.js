import { useEffect, useState, useCallback } from "react";
import { getTripById } from "../services/tripApi";

function useTrip(id) {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshTrip = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const result = await getTripById(id);
      setTrip(result.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load trip.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let ignore = false;

    const loadTrip = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const result = await getTripById(id);

        if (!ignore) {
          setTrip(result.data);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message || "Unable to load trip.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadTrip();

    return () => {
      ignore = true;
    };
  }, [id]);

  return { trip, loading, error, refreshTrip };
}

export default useTrip;