const CATEGORIES = [
  "All",
  "Beach",
  "Mountains",
  "Heritage",
  "Adventure",
];

function CategoryFilter({ selected, onChange }) {
  const toggle = (category) => {
    if (category === "All") {
      onChange(["All"]);
      return;
    }
    let next = selected.includes(category)
      ? selected.filter((c) => c !== category)
      : [...selected.filter((c) => c !== "All"), category];
    if (next.length === 0) next = ["All"];
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-2.5">
      {CATEGORIES.map((category) => {
        const checked = selected.includes(category);
        return (
          <label key={category} className="flex items-center gap-2.5 cursor-pointer group">
            <span
              className={`w-[18px] h-[18px] rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                checked ? "bg-forest border-forest" : "border-border group-hover:border-forest/50"
              }`}
            >
              {checked && (
                <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8.5 6.5 12 13 4" />
                </svg>
              )}
            </span>
            <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggle(category)} />
            <span className="text-sm text-ink group-hover:text-forest transition-colors">{category}</span>
          </label>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
