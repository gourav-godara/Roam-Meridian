import GuestCounter from "./GuestCounter";

const CATEGORIES = [
  { key: "adults", label: "Adults", sublabel: "Ages 13 or above", min: 1 },
  { key: "children", label: "Children", sublabel: "Ages 2–12", min: 0 },
  { key: "infants", label: "Infants", sublabel: "Under 2", min: 0 },
  { key: "pets", label: "Pets", sublabel: "Bringing a service animal?", min: 0 },
];

function GuestPopover({ guests, onChange, onDone, className = "" }) {
  const update = (key, value) => onChange({ ...guests, [key]: value });

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-border p-5 w-full sm:w-80 ${className}`}>
      {CATEGORIES.map((cat, i) => (
        <div key={cat.key} className={i > 0 ? "border-t border-border" : ""}>
          <GuestCounter
            label={cat.label}
            sublabel={cat.sublabel}
            count={guests[cat.key] ?? cat.min}
            min={cat.min}
            onChange={(v) => update(cat.key, v)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={onDone}
        className="mt-3 w-full py-2.5 rounded-full bg-forest text-white text-sm font-semibold hover:bg-forest-dark transition-colors"
      >
        Done
      </button>
    </div>
  );
}

export default GuestPopover;
