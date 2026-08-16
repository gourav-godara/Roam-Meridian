import { FiSend, FiTrendingUp, FiTruck, FiKey } from "react-icons/fi";

const MODES = [
  { value: "flight", label: "Flights", icon: FiSend, partner: "MakeMyTrip" },
  { value: "train", label: "Trains", icon: FiTrendingUp, partner: "IRCTC" },
  { value: "bus", label: "Buses", icon: FiTruck, partner: "RedBus" },
  { value: "car", label: "Car Rentals", icon: FiKey, partner: "Zoomcar" },
];

function ModeTabs({ mode, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {MODES.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
            mode === value
              ? "bg-forest text-white"
              : "bg-white border border-border text-ink hover:bg-gray-50"
          }`}
        >
          <Icon size={15} />
          {label}
        </button>
      ))}
    </div>
  );
}

export default ModeTabs;
export { MODES };

