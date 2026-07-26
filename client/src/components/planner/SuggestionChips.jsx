const CHIPS = ["Weekend Trip", "Family Vacation", "Adventure", "Mountains", "Beach", "Budget Trip", "Luxury", "Solo Travel", "Road Trip"];

function SuggestionChips({ onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 px-6 py-3">
      {CHIPS.map((chip) => (
        <button
          key={chip}
          type="button"
          onClick={() => onSelect(chip)}
          className="text-xs font-medium text-forest border border-forest/30 rounded-full px-3.5 py-1.5 hover:bg-forest/5 transition-colors"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}

export default SuggestionChips;
