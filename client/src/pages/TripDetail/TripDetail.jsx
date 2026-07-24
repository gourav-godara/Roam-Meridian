import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiUsers, FiMapPin } from "react-icons/fi";
import useTrip from "../../hooks/useTrip";
import Card from "../../components/common/Card";
import Avatar from "../../components/common/Avatar";

const STATUS_STYLES = {
  planning: "bg-amber-100 text-amber-700",
  ongoing: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

function TripDetail() {
  const { id } = useParams();
  const { trip, loading, error } = useTrip(id);

  if (loading) {
    return <div className="text-center py-20 text-muted">Loading trip…</div>;
  }

  if (error || !trip) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-error mb-4">{error || "Trip not found."}</p>
        <Link to="/itineraries" className="text-forest font-medium hover:underline">
          Back to My Trips
        </Link>
      </div>
    );
  }

  const destinationLabel = [trip.destinationId?.name, trip.destinationId?.city, trip.destinationId?.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link
        to="/itineraries"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink mb-6"
      >
        <FiArrowLeft size={16} /> Back to My Trips
      </Link>

      {trip.coverImage && (
        <img
          src={trip.coverImage}
          alt={trip.title}
          className="w-full h-56 sm:h-72 object-cover rounded-3xl mb-6"
        />
      )}

      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-h3 text-ink">{trip.title}</h1>
          {destinationLabel && (
            <p className="flex items-center gap-1.5 text-sm text-muted mt-1.5">
              <FiMapPin size={14} /> {destinationLabel}
            </p>
          )}
        </div>
        <span
          className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
            STATUS_STYLES[trip.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {trip.status}
        </span>
      </div>

      <Card className="border border-border p-5 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-muted mb-1 flex items-center gap-1">
            <FiCalendar size={13} /> Dates
          </p>
          <p className="text-sm font-medium text-ink">
            {new Date(trip.startDate).toLocaleDateString()} –{" "}
            {new Date(trip.endDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted mb-1 flex items-center gap-1">
            <FiUsers size={13} /> Travelers
          </p>
          <p className="text-sm font-medium text-ink">{trip.travelers}</p>
        </div>
        <div>
          <p className="text-xs text-muted mb-1">Budget</p>
          <p className="text-sm font-medium text-ink">
            ₹{trip.budget?.toLocaleString("en-IN")}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted mb-1">Created by</p>
          <p className="text-sm font-medium text-ink">
            {trip.createdBy?.name || "—"}
          </p>
        </div>
      </Card>

      {trip.collaborators?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wide mb-3">
            Collaborators
          </h2>
          <div className="flex flex-wrap gap-3">
            {trip.collaborators.map((c) => (
              <div
                key={c._id}
                className="flex items-center gap-2 border border-border rounded-full pl-1.5 pr-3 py-1.5 bg-white"
              >
                <Avatar user={c} size={28} />
                <span className="text-sm text-ink">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-sm font-semibold text-muted uppercase tracking-wide mb-3">
        Itinerary
      </h2>

      {(!trip.itinerary || trip.itinerary.length === 0) && (
        <Card className="border border-border p-8 text-center text-muted text-sm">
          No day-by-day itinerary added yet.
        </Card>
      )}

      <div className="flex flex-col gap-4">
        {trip.itinerary?.map((day) => (
          <Card key={day.day} className="border border-border p-5">
            <h3 className="font-display text-base text-ink mb-3">
              Day {day.day}
            </h3>
            {day.activities?.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {day.activities.map((activity, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    {activity.time && (
                      <span className="text-muted shrink-0 w-14">
                        {activity.time}
                      </span>
                    )}
                    <div>
                      <p className="font-medium text-ink">{activity.title}</p>
                      {activity.location && (
                        <p className="text-muted flex items-center gap-1 mt-0.5">
                          <FiMapPin size={12} /> {activity.location}
                        </p>
                      )}
                      {activity.notes && (
                        <p className="text-muted mt-0.5">{activity.notes}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">No activities planned yet.</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TripDetail;