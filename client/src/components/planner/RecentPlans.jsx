import { useState } from "react";
import { FiSearch, FiHeart, FiTrash2 } from "react-icons/fi";

function RecentPlans({ history, loading, onSearch, onFavorite, onDelete }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="bg-white border border-border rounded-3xl p-5">
      <h3 className="text-sm font-semibold text-ink mb-3">Recent Plans</h3>

      <div className="flex items-center gap-2 bg-mist/50 rounded-xl px-3 py-2 mb-3">
        <FiSearch size={14} className="text-gray-400 shrink-0" />
        <input
          value={query}
          onChange={handleSearch}
          placeholder="Search plans..."
          className="w-full text-xs bg-transparent outline-none placeholder:text-gray-400"
        />
      </div>

      {loading ? (
        <p className="text-xs text-gray-400">Loading...</p>
      ) : history.length === 0 ? (
        <p className="text-xs text-gray-400">No saved plans yet.</p>
      ) : (
        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
          {history.map((plan) => (
            <div key={plan._id} className="flex items-center justify-between gap-2 bg-mist/30 rounded-xl px-3 py-2">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-ink truncate">{plan.response?.title || plan.destination}</p>
                <p className="text-[11px] text-gray-500">{plan.days} days · ₹{plan.budget?.toLocaleString("en-IN")}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button type="button" onClick={() => onFavorite(plan._id)} aria-label="Favorite" className="p-1 hover:text-red-500 transition-colors">
                  <FiHeart size={13} className={plan.favorite ? "fill-red-500 text-red-500" : "text-gray-400"} />
                </button>
                <button type="button" onClick={() => onDelete(plan._id)} aria-label="Delete" className="p-1 hover:text-red-500 transition-colors">
                  <FiTrash2 size={13} className="text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentPlans;
