import {
  FiCalendar,
  FiUsers,
  FiClock,
  FiDollarSign,
  FiGlobe,
  FiMapPin,
  FiPhone,
  FiShield,
} from "react-icons/fi";

const FIELDS = [
  {
    key: "bestTime",
    label: "Best Time",
    icon: FiCalendar,
  },
  {
    key: "idealFor",
    label: "Ideal For",
    icon: FiUsers,
  },
  {
    key: "duration",
    label: "Suggested Stay",
    icon: FiClock,
  },
  {
    key: "budget",
    label: "Budget",
    icon: FiDollarSign,
  },
  {
    key: "country",
    label: "Country",
    icon: FiGlobe,
  },
  {
    key: "language",
    label: "Language",
    icon: FiMapPin,
  },
  {
    key: "entryFee",
    label: "Entry Fee",
    icon: FiShield,
  },
  {
    key: "emergency",
    label: "Emergency",
    icon: FiPhone,
  },
];

function InfoCards({ info }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
      {FIELDS.map(({ key, label, icon: Icon }) => (
        <div
  key={key}
  className="bg-white rounded-2xl border border-border p-4 hover:shadow-lg transition"
>
         <div className="flex items-center gap-3">

  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
    <Icon size={18} />
  </div>

  <div>
    <p className="text-xs text-gray-500">
      {label}
    </p>

    <p className="text-sm font-semibold text-ink">
      {info[key] || "N/A"}
    </p>
  </div>

</div>
        </div>
      ))}
    </div>
  );
}

export default InfoCards;
