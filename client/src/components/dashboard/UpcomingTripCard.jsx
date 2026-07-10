import { FiMoreHorizontal, FiMapPin, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import Button from "../common/Button";

function UpcomingTripCard({ trip }) {
   if (!trip) {
    return (
      <div className="bg-surface rounded-3xl border border-border p-8 text-center">
        <h3 className="text-base font-semibold text-ink mb-2">
          Upcoming Trip
        </h3>

        <p className="text-muted">
          You don't have any upcoming trips yet.
        </p>
      </div>
    );
  }
  return (
    <div className="bg-surface rounded-3xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-ink">Upcoming Trip</h3>
        <button aria-label="More options" className="text-muted hover:text-ink">
          <FiMoreHorizontal size={18} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-5">
        <img
          src={trip.image}
          alt={trip.name}
          className="w-full sm:w-56 h-40 object-cover rounded-2xl shrink-0"
        />
        <div className="flex-1 min-w-0 flex flex-col">
          <h4 className="font-display text-lg text-ink">{trip.name}</h4>
          <p className="flex items-center gap-1.5 text-sm text-muted mt-1.5">
            <FiMapPin size={14} /> {trip.location}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-muted mt-1">
            <FiCalendar size={14} /> {trip.dates}
          </p>

          <div className="flex items-center -space-x-2 mt-3">
            {trip.companions.map((c) => (
              <img key={c.id} src={c.avatar} alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
            ))}
            {trip.extraCompanions > 0 && (
              <span className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 text-xs font-medium text-ink flex items-center justify-center">
                +{trip.extraCompanions}
              </span>
            )}
          </div>

          <Link to="/dashboard/trips/current" className="mt-auto pt-4">
            <Button variant="primary" size="sm">View Itinerary</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UpcomingTripCard;
