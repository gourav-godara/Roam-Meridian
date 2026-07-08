const MIN = 0;
const MAX = 50000;
const STEP = 500;

function formatPrice(value) {
  if (value >= MAX) return "₹50,000+";
  return `₹${value.toLocaleString("en-IN")}`;
}

function BudgetSlider({ value, onChange }) {
  const [min, max] = value;

  const handleMin = (e) => onChange([Math.min(Number(e.target.value), max - STEP), max]);
  const handleMax = (e) => onChange([min, Math.max(Number(e.target.value), min + STEP)]);

  const minPct = ((min - MIN) / (MAX - MIN)) * 100;
  const maxPct = ((max - MIN) / (MAX - MIN)) * 100;

  return (
    <div>
      <div className="relative h-1.5 rounded-full bg-mist mt-2 mb-4">
        <div className="absolute h-1.5 rounded-full bg-forest" style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }} />
        <input type="range" min={MIN} max={MAX} step={STEP} value={min} onChange={handleMin}
          className="range-thumb absolute w-full top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none" aria-label="Minimum budget" />
        <input type="range" min={MIN} max={MAX} step={STEP} value={max} onChange={handleMax}
          className="range-thumb absolute w-full top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none" aria-label="Maximum budget" />
      </div>
      <p className="text-sm text-gray-500">{formatPrice(min)} - {formatPrice(max)}</p>
    </div>
  );
}

export default BudgetSlider;
