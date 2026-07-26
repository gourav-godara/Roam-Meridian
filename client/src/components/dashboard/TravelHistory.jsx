import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiDollarSign,
  FiStar,
} from "react-icons/fi";

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
        <div className="text-center py-10">
          <p className="text-gray-500">
            No completed trips yet.
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Your travel memories will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {trips.map((trip) => {
            const days =
              trip.startDate && trip.endDate
                ? Math.ceil(
                    (new Date(trip.endDate) -
                      new Date(trip.startDate)) /
                      (1000 * 60 * 60 * 24)
                  ) + 1
                : "-";

            return (
              <div
                key={trip._id}
                className="rounded-2xl border border-border overflow-hidden hover:shadow-lg transition"
              >
                {trip.coverImage && (
                  <img
                    src={trip.coverImage}
                    alt={trip.title}
                    className="h-44 w-full object-cover"
                  />
                )}

                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">
                        {trip.title}
                      </h3>

                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                        <FiMapPin />

                        {trip.destinationName ||
                          trip.destination?.name ||
                          "Destination"}
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      {trip.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 text-sm">

                    <div className="flex items-center gap-2">
                      <FiCalendar />
                      {days} Days
                    </div>

                    <div className="flex items-center gap-2">
                      <FiUsers />
                      {trip.travelers || 1}
                    </div>

                    <div className="flex items-center gap-2">
                      <FiDollarSign />
                      ₹{trip.budget || 0}
                    </div>

                    <div className="flex items-center gap-2">
                      <FiStar />
                      {trip.rating || "Not Rated"}
                    </div>

                  </div>

                  <div className="flex gap-3 mt-6">

                    <Link
                      to={`/trip/${trip._id}`}
                      className="flex-1 py-2 rounded-xl bg-green-700 text-white text-center font-medium hover:bg-green-800"
                    >
                      View Trip
                    </Link>

                    {!trip.rating && (
                      <button className="flex-1 py-2 rounded-xl border border-green-700 text-green-700 hover:bg-green-50">
                        Rate Trip
                      </button>
                    )}

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TravelHistory;