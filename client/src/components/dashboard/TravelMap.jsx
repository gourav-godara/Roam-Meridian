function TravelMap({ pins }) {
  const PIN_COLOR = {
    visited: "bg-forest",
    wishlist: "bg-gold",
  };

  return (
    <div className="bg-surface rounded-3xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-ink">
          Your Travel Map
        </h3>

        <button className="text-sm font-medium text-forest-light hover:text-forest">
          View Full Map
        </button>
      </div>

      <div className="relative aspect-[16/10] rounded-2xl bg-gray-50 overflow-hidden">
        {pins.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-muted">
            No visited places yet.
          </div>
        ) : (
          pins.map((pin) => (
            <span
              key={pin.id}
              className={`absolute w-3 h-3 rounded-full border-2 border-white shadow-sm ${
                PIN_COLOR[pin.type]
              }`}
              style={{
                top: pin.top,
                left: pin.left,
              }}
            />
          ))
        )}
      </div>

      <div className="flex items-center gap-4 mt-3">
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <span className="w-2 h-2 rounded-full bg-forest" />
          Visited
        </span>

        <span className="flex items-center gap-1.5 text-xs text-muted">
          <span className="w-2 h-2 rounded-full bg-gold" />
          Wishlist
        </span>
      </div>
    </div>
  );
}

export default TravelMap;