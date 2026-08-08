import { Link } from "react-router-dom";
import PlanningCard from "./PlanningCard";

function ContinuePlanning({ items }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-ink">Continue Planning</h3>
        <Link to="/itineraries" className="text-sm font-medium text-forest-light hover:text-forest">View All Trips</Link>
      </div>
      {items.length === 0 ? (
  <div className="bg-surface rounded-2xl border border-border p-6 text-center text-muted">
    No trips are currently in planning.
  </div>
) : (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {items.map((item) => (
      <PlanningCard key={item.id} item={item} />
    ))}
  </div>
)}
    </div>
  );
}

export default ContinuePlanning;
