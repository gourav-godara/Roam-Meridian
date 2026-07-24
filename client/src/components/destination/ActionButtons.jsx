import { useState } from "react";
import { FiHeart, FiLoader } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Button from "../common/Button";
import { addToWishlist } from "../../services/tripApi";
import { FiShare2 } from "react-icons/fi";
function ActionButtons({ destinationId, destinationName, initialWishlisted = false }) {
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [saving, setSaving] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (wishlisted || saving) return;

    try {
      setSaving(true);

      await addToWishlist(destinationId);

      setWishlisted(true);
    } catch (error) {
      // Already in wishlist — treat as success, just sync the UI
      if (error.response?.status === 409) {
        setWishlisted(true);
      } else {
        alert(
          error.response?.data?.message ||
            "Unable to add this destination to your wishlist."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePlanWithAI = () => {
    const params = new URLSearchParams({
      destinationId,
      destinationName: destinationName || "",
    });

    navigate(`/planner?${params.toString()}`);
  };
  const handleShare = async () => {
  const url = window.location.href;

  try {
    if (navigator.share) {
      await navigator.share({
        title: destinationName,
        text: `Check out this amazing destination on Roam Meridian!`,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied successfully!");
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <button
        type="button"
        onClick={handleWishlist}
        disabled={saving}
        aria-pressed={wishlisted}
        className="flex items-center justify-center gap-2 border-2 border-forest text-forest rounded-2xl py-3.5 text-sm font-semibold hover:bg-forest/5 transition-colors disabled:opacity-60"
      >
        {saving ? (
          <FiLoader size={17} className="animate-spin" />
        ) : (
          <FiHeart size={17} className={wishlisted ? "fill-forest" : ""} />
        )}
        {wishlisted ? "Wishlisted" : "Add to Wishlist"}
      </button>
        <button
  type="button"
  onClick={handleShare}
  className="flex items-center justify-center gap-2 border rounded-2xl py-3.5 text-sm font-semibold hover:bg-gray-100 transition"
>
  <FiShare2 size={17} />
  Share
</button>
      <Button
        variant="primary"
        onClick={handlePlanWithAI}
        className="!rounded-2xl !py-3.5 !text-sm font-semibold hover:!scale-[1.02] transition-transform"
      >
        Plan with AI
      </Button>
    </div>
  );
}

export default ActionButtons;