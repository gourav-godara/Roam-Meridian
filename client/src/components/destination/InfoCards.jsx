const FIELDS = [
  { key: "bestTime", label: "Best time" },
  { key: "idealFor", label: "Ideal for" },
  { key: "duration", label: "Trip duration" },
  { key: "budget", label: "Budget" },
];

function InfoCards({ info }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
      {FIELDS.map(({ key, label }) => (
        <div
          key={key}
          className="bg-white rounded-2xl border border-border px-4 py-3.5 hover:shadow-md transition-shadow"
        >
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-sm font-semibold text-ink mt-1">{info[key]}</p>
        </div>
      ))}
    </div>
  );
}

export default InfoCards;
