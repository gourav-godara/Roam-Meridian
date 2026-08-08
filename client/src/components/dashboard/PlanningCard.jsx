import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

function PlanningCard({ item }) {
  const [saved, setSaved] = useState(false);

  return (
    <Link to={`/trips/${item.id}`} className="block group">
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <button
          onClick={(e) => { e.preventDefault(); setSaved((v) => !v); }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/85 flex items-center justify-center"
        >
          <FiHeart size={15} className={saved ? "fill-forest-light text-forest-light" : "text-ink"} />
        </button>
      </div>
      <p className="text-sm font-semibold text-ink mt-2">{item.name}</p>
      <p className="text-xs text-muted">{item.location}</p>
      <p className="text-xs text-muted mt-2">{item.progress}% planned</p>
      <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
        <div className="h-full bg-forest rounded-full" style={{ width: `${item.progress}%` }} />
      </div>
    </Link>
  );
}

export default PlanningCard;
