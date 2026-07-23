import { FiStar } from "react-icons/fi";

function UserReviews({ items }) {
  return (
    <div className="mt-10">
      <h3 className="text-base font-semibold text-ink mb-4">User Reviews</h3>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">
          No reviews yet — be the first to share your experience.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
        {items.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl border border-border p-4">
            <div className="flex items-center gap-3">
              <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink truncate">{r.name}</p>
                <p className="text-xs text-gray-500">{r.date}</p>
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-ink ml-auto shrink-0">
                <FiStar size={12} className="fill-gold text-gold" />
                {r.rating}
              </span>
            </div>
            <p className="text-sm text-ink leading-relaxed mt-3">{r.text}</p>
          </div>
        ))}
        </div>
      )}
    </div>
  );
}

export default UserReviews;