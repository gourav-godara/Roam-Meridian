import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardApi";

const useDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshDashboard = async () => {
    try {
      setLoading(true);

      const result = await getDashboard();

      setDashboard(result.data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadDashboard = async () => {
      try {
        const result = await getDashboard();

        if (!ignore) {
          setDashboard(result.data);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message || "Unable to load dashboard."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    dashboard,
    loading,
    error,
    refreshDashboard,
  };
};

export default useDashboard;