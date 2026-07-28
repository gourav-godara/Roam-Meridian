import { useState, useEffect, useCallback } from "react";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistApi";

function useWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshWishlist = useCallback(async () => {
    try {
      setLoading(true);

      const result = await getWishlist();

      setWishlist(result.wishlist || []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load wishlist.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  const addItem = async (destinationId) => {
    try {
      await addToWishlist(destinationId);
      await refreshWishlist();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to add destination.");
    }
  };

  const removeItem = async (destinationId) => {
    try {
      await removeFromWishlist(destinationId);
      await refreshWishlist();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to remove destination.");
    }
  };

  return {
    wishlist,
    loading,
    error,
    refreshWishlist,
    addItem,
    removeItem,
  };
}

export default useWishlist;