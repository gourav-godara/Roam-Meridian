import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiUsers,
  FiPlus,
  FiMapPin,
  FiSearch,
} from "react-icons/fi";

import { getTrips } from "../../services/tripApi";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const STATUS_STYLES = {
  draft: "bg-gray-100 text-gray-600",
  planning: "bg-amber-100 text-amber-700",
  ongoing: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
};

function formatDateRange(startDate, endDate) {
  if (!startDate || !endDate) return "-";

  const start = new Date(startDate);
  const end = new Date(endDate);

  return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
}

function Itineraries() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);

      const response = await getTrips();

      const filtered = (response.data || []).filter(
        (trip) => trip.status !== "wishlist"
      );

      setTrips(filtered);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to fetch trips."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const matchesSearch = trip.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        trip.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [trips, search, statusFilter]);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading trips...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            My Trips
          </h1>

          <p className="text-gray-500">
            Manage all your planned journeys.
          </p>
        </div>

        <Link to="/create-trip">
          <Button leftIcon={FiPlus}>
            Create Trip
          </Button>
        </Link>

      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <div className="relative flex-1">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search trips..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-11 pr-4 py-2 outline-none focus:ring-2 focus:ring-forest"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-xl px-4 py-2 min-w-[180px]"
        >
          <option value="all">All Trips</option>
          <option value="planning">Planning</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>

      </div>
            {filteredTrips.length === 0 ? (
        <Card className="p-10 text-center">

          <h2 className="text-xl font-semibold mb-2">
            No matching trips found
          </h2>

          <p className="text-gray-500 mb-5">
            Try changing the search/filter or create a new trip.
          </p>

          <Link to="/planner">
            <Button>Open AI Planner</Button>
          </Link>

        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredTrips.map((trip) => (
            <Link
              key={trip._id}
              to={`/trips/${trip._id}`}
            >
              <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">

                {trip.coverImage ? (
                  <img
                    src={trip.coverImage}
                    alt={trip.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="h-48 flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
                    <FiMapPin
                      size={40}
                      className="text-forest"
                    />
                  </div>
                )}

                <div className="p-5">

                  <div className="flex justify-between items-start gap-3">

                    <h2 className="font-semibold text-lg line-clamp-2">
                      {trip.title}
                    </h2>

                    <span
                      className={`text-xs px-3 py-1 rounded-full capitalize whitespace-nowrap ${
                        STATUS_STYLES[trip.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {trip.status}
                    </span>

                  </div>

                  <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                    <FiMapPin size={14} />
                    {trip.destinationId?.name || "Unknown Destination"}
                  </p>

                  <div className="mt-5 space-y-2 text-sm text-gray-600">

                    <div className="flex items-center gap-2">
                      <FiCalendar />
                      <span>
                        {formatDateRange(
                          trip.startDate,
                          trip.endDate
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FiUsers />
                      <span>
                        {trip.travelers}{" "}
                        {trip.travelers === 1
                          ? "Traveler"
                          : "Travelers"}
                      </span>
                    </div>

                  </div>

                  <div className="mt-5 pt-4 border-t border-border flex justify-between items-center">

                    <span className="text-sm font-medium text-forest">
                      ₹{trip.budget?.toLocaleString("en-IN")}
                    </span>

                    <span className="text-xs text-gray-400">
                      View Details →
                    </span>

                  </div>

                </div>

              </Card>
            </Link>
          ))}

        </div>
      )}

    </div>
  );
}

export default Itineraries;