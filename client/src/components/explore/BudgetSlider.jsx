const MIN = 0;
const MAX = 500000;
const STEP = 500;

function formatPrice(value) {
  if (value >= MAX) return "₹5,00,000+";
  return `₹${value.toLocaleString("en-IN")}`;
}

function BudgetSlider({ value, onChange }) {
  const [min, max] = value;

  const handleMin = (e) => onChange([Math.min(Number(e.target.value), max - STEP), max]);
  const handleMax = (e) => onChange([min, Math.max(Number(e.target.value), min + STEP)]);

  const minPct = ((min - MIN) / (MAX - MIN)) * 100;
  const maxPct = ((max - MIN) / (MAX - MIN)) * 100;
console.log({
    min,
    max,
    minPct,
    maxPct,
});
  return (
    
    <div>
      <div className="relative h-2 mt-2 mb-4">
  <div className="absolute inset-0 rounded-full bg-mist" />

  <div
    className="absolute h-2 rounded-full bg-forest"
    style={{
      left: `${minPct}%`,
      right: `${100 - maxPct}%`,
    }}
  />

<input
  type="range"
  min={MIN}
  max={MAX}
  step={STEP}
  value={min}
  onChange={handleMin}
  className="range-thumb absolute inset-0 w-full h-2 z-10"
/>

<input
  type="range"
  min={MIN}
  max={MAX}
  step={STEP}
  value={max}
  onChange={handleMax}
  className="range-thumb absolute inset-0 w-full h-2 z-20"
/>
</div>
      <p className="text-sm text-gray-500">{formatPrice(min)} - {formatPrice(max)}</p>
    </div>
  );
}

export default BudgetSlider;
