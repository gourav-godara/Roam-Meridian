const PROMPTS = [
  "Plan a 5 day Goa trip under ₹30,000",
  "Family trip to Kerala",
  "Romantic Manali getaway",
  "Backpacking Himachal",
  "Budget Rajasthan Tour",
];

function PromptCards({ onSelect }) {
  return (
    <div className="flex gap-3 overflow-x-auto px-6 pb-3">
      {PROMPTS.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className="shrink-0 text-left text-sm text-ink bg-mist/60 hover:bg-mist rounded-2xl px-4 py-3 max-w-[220px] transition-colors"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}

export default PromptCards;
