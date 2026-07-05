import HistoryCard from "./HistoryCard";

const TravelHistory = ({ history = [] }) => {
  if (!history.length) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-xl font-semibold mb-4">
          Travel History
        </h2>

        <p className="text-gray-500">
          No completed trips yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h2 className="text-xl font-semibold mb-6">
        Travel History
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {history.map((trip) => (
          <HistoryCard
            key={trip._id}
            trip={trip}   // ✅ pass trip
          />
        ))}
      </div>
    </div>
  );
};

export default TravelHistory;