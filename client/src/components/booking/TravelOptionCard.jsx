import { FiClock, FiUsers } from "react-icons/fi";

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;
    return `${days}d ${remHours}h`;
  }
  return mins ? `${hours}h ${mins}m` : `${hours}h`;
}

function TravelOptionCard({ option, onSelect }) {
  const isCar = option.mode === "car";

  const modeDetail = () => {
    switch (option.mode) {
      case "flight":
        return `${option.details?.class || "Economy"}${
          option.details?.stops ? ` • ${option.details.stops} stop` : " • Nonstop"
        }`;
      case "train":
        return option.details?.trainClass;
      case "bus":
        return option.details?.busType;
      case "car":
        return `${option.details?.carModel} • ${option.details?.transmission} • ${option.details?.fuelType}`;
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-border p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-sm font-semibold text-ink">{option.operator}</span>
          {option.code && (
            <span className="text-xs text-muted">{option.code}</span>
          )}
        </div>

        {isCar ? (
          <div>
            <p className="text-sm text-ink">
              Pickup: {option.origin.city} — {formatDate(option.departureTime)},{" "}
              {formatTime(option.departureTime)}
            </p>
            <p className="text-xs text-muted mt-1">
              {formatDuration(option.durationMinutes)} rental
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div>
              <p className="text-lg font-semibold text-ink">
                {formatTime(option.departureTime)}
              </p>
              <p className="text-xs text-muted">{option.origin.city}</p>
            </div>

            <div className="flex-1 flex flex-col items-center min-w-[60px] px-2">
              <span className="text-[11px] text-muted mb-1 flex items-center gap-1">
                <FiClock size={10} />
                {formatDuration(option.durationMinutes)}
              </span>
              <div className="w-full h-px bg-border relative">
                <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-forest" />
              </div>
            </div>

            <div>
              <p className="text-lg font-semibold text-ink">
                {formatTime(option.arrivalTime)}
              </p>
              <p className="text-xs text-muted">{option.destination.city}</p>
            </div>
          </div>
        )}

        <p className="text-xs text-muted mt-2">{modeDetail()}</p>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 sm:gap-2 sm:border-l sm:border-border sm:pl-5 sm:min-w-[160px]">
        <div className="text-right">
          <p className="text-xl font-semibold text-forest font-display">
            ₹{option.price.toLocaleString()}
          </p>
          <p className="flex items-center gap-1 text-xs text-muted justify-end mt-0.5">
            <FiUsers size={11} />
            {option.seatsAvailable} left
          </p>
        </div>

        <button
          onClick={() => onSelect(option)}
          disabled={option.seatsAvailable === 0}
          className="px-5 py-2.5 rounded-xl bg-forest text-white text-sm font-semibold hover:bg-forest-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {option.seatsAvailable === 0 ? "Sold Out" : "Select"}
        </button>
      </div>
    </div>
  );
}

export default TravelOptionCard;
