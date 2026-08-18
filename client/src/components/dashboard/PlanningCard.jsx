import { Link } from "react-router-dom";

function PlanningCard({ item }) {

  return (
    <Link to={`/trips/${item.id}`} className="block group">
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
