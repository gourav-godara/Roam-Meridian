import { useState } from "react";
import { FiHeart, FiStar } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function DestinationCard({ destination, onToggleFavorite }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }
    onToggleFavorite(destination.id);
  };

  const handleCardClick = () => {
    navigate(`/destination/${destination.id}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className="group bg-white rounded-[20px] shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-[20px] bg-mist">
        <img
          src={destination.image}
          alt={destination.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        />
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={destination.isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={destination.isFavorite}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center hover:bg-white/80 transition-colors"
        >
          <FiHeart size={16} className={destination.isFavorite ? "fill-red-500 text-red-500" : "text-ink"} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-ink truncate">{destination.name}</h3>
        <p className="text-xs text-gray-500 mt-0.5 truncate">{destination.location}</p>
        <div className="flex items-center justify-between mt-2.5">
          <span className="flex items-center gap-1 text-xs font-medium text-ink">
            <FiStar size={13} className="fill-gold text-gold" />
            {destination.rating.toFixed(1)}
          </span>
          <span className="text-sm font-semibold text-forest">₹{destination.price.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </article>
  );
}

export default DestinationCard;
