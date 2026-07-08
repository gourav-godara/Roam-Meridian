import { Link } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";

const STATUS_STYLES = {
  Confirmed: "bg-forest-light/10 text-forest-light",
  Completed: "bg-gray-100 text-gray-600",
  Upcoming: "bg-gold/10 text-gold",
  Cancelled: "bg-red-50 text-red-600",
};

function RecentBookings({ bookings }) {
  return (
    <div className="bg-surface rounded-3xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-ink">Recent Bookings</h3>
        <Link to="/dashboard/bookings" className="text-sm font-medium text-forest-light hover:text-forest">View All</Link>
      </div>

      <div className="flex flex-col overflow-x-auto">
        {bookings.map((b) => (
          <div key={b.id} className="flex items-center gap-4 py-3 border-b last:border-b-0 border-border/70">
            <img src={b.image} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink truncate">{b.name}</p>
              <p className="text-xs text-muted">{b.location}</p>
            </div>
            <p className="text-xs text-muted hidden sm:block w-32 shrink-0">{b.date}</p>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${STATUS_STYLES[b.status]}`}>
              {b.status}
            </span>
            <p className="text-sm font-semibold text-ink w-20 text-right shrink-0">{b.amount}</p>
            <button aria-label="More options" className="text-muted hover:text-ink shrink-0">
              <FiMoreVertical size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentBookings;
