const PROMPTS = [
  "Plan a 5 day Goa trip under ₹30,000",
  "Family trip to Kerala",
  "Romantic Manali getaway",
  "Backpacking Himachal",
  "Budget Rajasthan tour",
];

function PromptCards({ onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {PROMPTS.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className="shrink-0 rounded-full bg-mist/60 px-3.5 py-2 text-left text-xs font-medium text-ink transition-colors hover:bg-forest hover:text-white"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}

export default PromptCards;
