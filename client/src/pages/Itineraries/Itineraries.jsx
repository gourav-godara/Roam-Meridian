import { Link } from "react-router-dom";
import { FiPlus, FiMap } from "react-icons/fi";
import useTrips from "../../hooks/useTrips";
import TripCard from "../../components/dashboard/TripCard";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

const STATUS_GROUPS = [
  { key: "planning", label: "Planning" },
  { key: "ongoing", label: "Ongoing" },
  { key: "completed", label: "Completed" },
];

function Itineraries() {
  const { trips, loading, error, refreshTrips } = useTrips();

  const grouped = STATUS_GROUPS.map((group) => ({
    ...group,
    trips: trips.filter((trip) => trip.status === group.key),
  })).filter((group) => group.trips.length > 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-h3 text-ink">My Trips</h1>
          <p className="text-sm text-muted mt-1">
            Every trip you're planning, joining, or have completed.
          </p>
        </div>

        <Link to="/planner">
          <Button variant="primary" leftIcon={FiPlus}>
            Plan a Trip
          </Button>
        </Link>
      </div>

      {loading && (
        <div className="text-center py-20 text-muted">Loading your trips…</div>
      )}

      {!loading && error && (
        <Card className="border border-border p-8 text-center">
          <p className="text-error mb-3">{error}</p>
          <Button variant="secondary" size="sm" onClick={refreshTrips}>
            Try Again
          </Button>
        </Card>
      )}

      {!loading && !error && trips.length === 0 && (
        <Card className="border border-border p-12 text-center flex flex-col items-center gap-4">
          <span className="w-14 h-14 rounded-full bg-forest/10 text-forest flex items-center justify-center">
            <FiMap size={24} />
          </span>
          <div>
            <h3 className="text-base font-semibold text-ink mb-1">
              No trips yet
            </h3>
            <p className="text-sm text-muted">
              Start with the AI Planner to generate an itinerary, then turn it
              into a real trip.
            </p>
          </div>
          <Link to="/planner">
            <Button variant="primary" size="sm">
              Open AI Planner
            </Button>
          </Link>
        </Card>
      )}

      {!loading && !error && trips.length > 0 && (
        <div className="flex flex-col gap-8">
          {grouped.map((group) => (
            <section key={group.key}>
              <h2 className="text-sm font-semibold text-muted uppercase tracking-wide mb-3">
                {group.label}
              </h2>
              <Card className="border border-border p-5 flex flex-col gap-5">
                {group.trips.map((trip) => (
                  <Link key={trip._id} to={`/itineraries/${trip._id}`}>
                    <TripCard trip={trip} />
                  </Link>
                ))}
              </Card>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default Itineraries;