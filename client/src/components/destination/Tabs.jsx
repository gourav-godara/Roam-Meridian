const TABS = [
  { key: "overview", label: "Overview" },
  { key: "thingsToDo", label: "Things to do" },
  { key: "stay", label: "Stay" },
  { key: "reviews", label: "Reviews" },
];

function Tabs({ active, onChange, reviewCount }) {
  return (
    <div className="flex items-center justify-between border-b border-border">
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        const label = tab.key === "reviews" ? `Reviews (${reviewCount})` : tab.label;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`relative flex-1 text-center pb-4 text-lg font-medium transition-colors ${
              isActive ? "text-forest" : "text-gray-500 hover:text-ink"
            }`}
          >
            {label}
            {isActive && <span className="absolute left-0 right-0 -bottom-px h-[3px] bg-forest rounded-full" />}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
