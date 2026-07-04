import TripCard from "./TripCard";

const UpcomingTrips = ({ trips = [] }) => {
  return (
    <div className="bg-white/10
backdrop-blur-xl
border border-white/10 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">
          Upcoming Trips
        </h2>

        {trips.length > 0 && (
          <button className="text-teal-600 font-medium hover:underline">
            View All
          </button>
        )}
      </div>

      {trips.length === 0 ? (
        <p className="text-gray-500">
          No upcoming trips yet.
        </p>
      ) : (
        <div className="space-y-5">
          {trips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingTrips;