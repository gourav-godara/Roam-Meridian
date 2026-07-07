import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../common/Button";

function ActionButtons({ destinationId }) {
  const [wishlisted, setWishlisted] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleWishlist = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }
    setWishlisted((v) => !v);
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <button
        type="button"
        onClick={handleWishlist}
        aria-pressed={wishlisted}
        className="flex items-center justify-center gap-2 border-2 border-forest text-forest rounded-2xl py-3.5 text-sm font-semibold hover:bg-forest/5 transition-colors"
      >
        <FiHeart size={17} className={wishlisted ? "fill-forest" : ""} />
        {wishlisted ? "Wishlisted" : "Add to Wishlist"}
      </button>

      <Button
        variant="primary"
        onClick={() => navigate(`/planner?destination=${destinationId}`)}
        className="!rounded-2xl !py-3.5 !text-sm font-semibold hover:!scale-[1.02] transition-transform"
      >
        Plan with AI
      </Button>
    </div>
  );
}

export default ActionButtons;
