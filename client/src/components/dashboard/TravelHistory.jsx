import { Link } from "react-router-dom";
import { FiCalendar, FiMapPin } from "react-icons/fi";

function TravelHistory({ trips = [] }) {
  return (
    <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-ink">
          Travel History
        </h2>

        <Link
          to="/trips"
          className="text-sm text-green-700 font-medium hover:underline"
        >
          View All
        </Link>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No completed trips yet.
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Your completed journeys will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="flex items-center justify-between border rounded-2xl p-4 hover:shadow transition"
            >
              <div>
                <h3 className="font-semibold">
                  {trip.title}
                </h3>

                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FiMapPin />
                    {trip.destinationName ||
                      trip.destination?.name ||
                      "Destination"}
                  </span>

                  <span className="flex items-center gap-1">
                    <FiCalendar />
                    {trip.startDate
                      ? new Date(
                          trip.startDate
                        ).toLocaleDateString()
                      : ""}
                  </span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                Completed
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TravelHistory;