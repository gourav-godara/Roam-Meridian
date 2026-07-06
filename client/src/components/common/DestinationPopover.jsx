const RECENT = [{ id: "r1", name: "Manali, India", subtitle: "Mountains · viewed recently" }];

const POPULAR = [
  { id: "p1", name: "Goa, India", subtitle: "Beaches & nightlife" },
  { id: "p2", name: "Jaipur, India", subtitle: "Heritage & forts" },
  { id: "p3", name: "Srinagar, India", subtitle: "Lakes & nature" },
];

const CITIES = [
  { id: "c1", name: "Udaipur", subtitle: "City of Lakes" },
  { id: "c2", name: "Coorg", subtitle: "Coffee hills" },
];

const COUNTRIES = [
  { id: "n1", name: "Thailand", subtitle: "Islands & temples" },
  { id: "n2", name: "Japan", subtitle: "Culture & cities" },
];

function DestinationRow({ item, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.name)}
      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-mist/60 transition-colors text-left"
    >
      <span className="w-10 h-10 rounded-lg bg-mist shrink-0 flex items-center justify-center text-forest text-xs font-semibold">
        {item.name.charAt(0)}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-ink truncate">{item.name}</span>
        <span className="block text-xs text-gray-500 truncate">{item.subtitle}</span>
      </span>
    </button>
  );
}

function Section({ title, items, onSelect }) {
  if (!items.length) return null;
  return (
    <div className="mb-3 last:mb-0">
      <p className="px-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">{title}</p>
      {items.map((item) => (
        <DestinationRow key={item.id} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
}

function DestinationPopover({ onSelect, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-border p-3 w-full sm:w-96 max-h-[70vh] overflow-y-auto ${className}`}>
      <Section title="Recent Searches" items={RECENT} onSelect={onSelect} />
      <Section title="Popular Destinations" items={POPULAR} onSelect={onSelect} />
      <Section title="Suggested Cities" items={CITIES} onSelect={onSelect} />
      <Section title="Suggested Countries" items={COUNTRIES} onSelect={onSelect} />
    </div>
  );
}

export default DestinationPopover;
