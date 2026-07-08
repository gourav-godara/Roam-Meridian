function GuestCounter({ label, sublabel, count, min = 0, max = 10, onChange }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-semibold text-ink">{label}</p>
        {sublabel && <p className="text-xs text-gray-500">{sublabel}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, count - 1))}
          disabled={count <= min}
          aria-label={`Decrease ${label}`}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-forest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-mist transition-colors"
        >
          −
        </button>
        <span className="w-5 text-center text-sm font-medium text-ink">{count}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, count + 1))}
          disabled={count >= max}
          aria-label={`Increase ${label}`}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-forest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-mist transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default GuestCounter;
