const HistoryCard = ({ trip }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300">
      <img
        src={trip.image}
        alt={trip.destination}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">
          {trip.destination}
        </h3>

        <p className="text-gray-500 text-sm">
          {trip.location}
        </p>

        <p className="text-teal-600 text-sm mt-2">
          {trip.month} {trip.year}
        </p>
      </div>
    </div>
  );
};

export default HistoryCard;