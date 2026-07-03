const UpcomingTrips = ({ trips = [] }) => {
  if (!trips.length) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">
                Upcoming Trips
            </h2>

            <p className="text-gray-500">
                No upcoming trips yet.
            </p>
        </div>
    );
}
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      Upcoming Trips
    </div>
  );
};

export default UpcomingTrips;