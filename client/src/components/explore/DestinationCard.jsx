import { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FiStar } from "react-icons/fi";
import Card from "../common/Card";

function DestinationCard({ destination }) {
  const [saved, setSaved] = useState(false);

  return (
    <Link to={`/destination/${destination.id}`} className="block group">
      <Card>
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
          <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">
            photo
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setSaved(!saved);
            }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/85 flex items-center justify-center"
          >
            <FiHeart size={15} className={saved ? "fill-ink text-ink" : "text-ink"} />
          </button>
        </div>

        <div className="pt-3.5">
          <p className="text-sm font-medium text-ink">{destination.name}, {destination.country}</p>
          <p className="text-[13px] text-slate-500 mt-0.5 mb-2">
            {destination.category} &middot; {destination.duration}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-forest">₹{destination.budget.toLocaleString()}</span>
            <span className="text-[13px] text-slate-500 flex items-center gap-1">
              <FiStar size={13} /> {destination.rating}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default DestinationCard;
