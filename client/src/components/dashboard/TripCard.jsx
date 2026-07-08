import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const TripCard = ({ trip }) => {
  return (
    <div className="flex justify-between items-center border-b last:border-none pb-4 last:pb-0">
      {/* Left */}
      <div className="flex gap-4">
        <img
          src={trip.image}
          alt={trip.destination}
          className="w-28 h-20 rounded-xl object-cover"
        />

        <div>
          <h3 className="font-semibold text-lg">
            {trip.destination}
          </h3>

          <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
            <FaCalendarAlt />
            <span>
              {trip.startDate} - {trip.endDate}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <FaMapMarkerAlt />
            <span>{trip.location}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <FaUsers />
            <span>{trip.members} Members</span>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div>
        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
          {trip.status}
        </span>
      </div>
    </div>
  );
};

export default TripCard;