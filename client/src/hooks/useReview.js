import { useEffect, useState } from "react";
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../services/reviewApi";

// Previously this hook only ever fetched ALL reviews from every user, even
// though ReviewPage.jsx titles the page "My Reviews" — it also had no way
// to create, edit, or delete a review, so the page was read-only despite
// the backend fully supporting all of that.
const useReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const refreshReviews = async () => {
    try {
      setLoading(true);

      const result = await getReviews(undefined, { mine: true });

      setReviews(result.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadReviews = async () => {
      try {
        const result = await getReviews(undefined, { mine: true });

        if (!ignore) {
          setReviews(result.data);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message || "Unable to load reviews.");
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

  const addReview = async (reviewData) => {
    setActionError("");
    try {
      await createReview(reviewData);
      await refreshReviews();
      return true;
    } catch (err) {
      setActionError(
        err.response?.data?.message || "Unable to submit your review."
      );
      return false;
    }
  };

  const editReview = async (id, reviewData) => {
    setActionError("");
    try {
      await updateReview(id, reviewData);
      await refreshReviews();
      return true;
    } catch (err) {
      setActionError(
        err.response?.data?.message || "Unable to update your review."
      );
      return false;
    }
  };

  const removeReview = async (id) => {
    setActionError("");
    try {
      await deleteReview(id);
      // Optimistic local update so the UI feels instant, refresh in the
      // background to stay in sync with the server.
      setReviews((prev) => prev.filter((review) => review._id !== id));
      return true;
    } catch (err) {
      setActionError(
        err.response?.data?.message || "Unable to delete your review."
      );
      return false;
    }
  };

  return {
    reviews,
    loading,
    error,
    actionError,
    refreshReviews,
    addReview,
    editReview,
    removeReview,
  };
};

export default useReview;
