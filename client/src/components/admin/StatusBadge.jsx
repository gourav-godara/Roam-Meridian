const STYLES = {
  // Trip statuses
  draft: "bg-gray-100 text-gray-600",
  planning: "bg-blue-50 text-blue-700",
  ongoing: "bg-gold/15 text-gold",
  completed: "bg-forest/10 text-forest",
  wishlist: "bg-purple-50 text-purple-700",

  // Expense statuses
  Pending: "bg-gold/15 text-gold",
  Settled: "bg-forest/10 text-forest",

  // User roles / status
  admin: "bg-forest text-white",
  user: "bg-gray-100 text-gray-600",
  active: "bg-forest/10 text-forest",
  suspended: "bg-red-50 text-red-600",
};

function StatusBadge({ value }) {
  const style = STYLES[value] || "bg-gray-100 text-gray-600";

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize whitespace-nowrap ${style}`}
    >
      {value}
    </span>
  );
}

export default StatusBadge;
