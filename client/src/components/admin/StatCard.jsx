function StatCard({ icon: Icon, label, value, sub, accent = "forest" }) {
  const ACCENT_BG = {
    forest: "bg-forest/10 text-forest",
    gold: "bg-gold/15 text-gold",
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted uppercase tracking-wide">
          {label}
        </span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${ACCENT_BG[accent]}`}>
          <Icon size={16} />
        </div>
      </div>
      <p className="text-2xl font-semibold text-ink font-display">{value}</p>
      {sub && <p className="text-xs text-muted mt-1">{sub}</p>}
    </div>
  );
}

export default StatCard;
