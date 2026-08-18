import { useState } from "react";
import { FiStar, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

function RecommendationCard({ item }) {
  const [saved, setSaved] = useState(false);

  return (
    <Link to={`/destination/${item.id}`} className="flex items-center gap-3 group">
      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-ink">{item.name}</p>
        <p className="text-xs text-muted">{item.location}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="flex items-center gap-1 text-xs text-ink font-medium">
            <FiStar size={11} className="fill-gold text-gold" /> {item.rating}
          </span>
          <span className="text-xs text-muted">{item.budget}</span>
        </div>
      </div>
    </Link>
  );
}

export default RecommendationCard;
