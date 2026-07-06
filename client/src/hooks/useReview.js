import { useEffect, useState } from "react";
import { getReviews } from "../services/reviewApi";

const useReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshReviews = async () => {
    try {
      setLoading(true);

      const result = await getReviews();

      setReviews(result.data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load reviews."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadReviews = async () => {
      try {
        const result = await getReviews();

        if (!ignore) {
          setReviews(result.data);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message || "Unable to load reviews."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadReviews();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    reviews,
    loading,
    error,
    refreshReviews,
  };
};

export default useReview;