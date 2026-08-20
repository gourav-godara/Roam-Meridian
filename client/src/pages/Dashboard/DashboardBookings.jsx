import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiSend, FiTrendingUp, FiTruck, FiKey, FiCalendar, FiTrash2, FiExternalLink,
} from "react-icons/fi";
import { getUserBookings, deleteBooking } from "../../services/bookingApi";
import { useToast } from "../../context/ToastContext";
import ConfirmDialog from "../../components/admin/ConfirmDialog";

const MODE_ICON = { flight: FiSend, train: FiTrendingUp, bus: FiTruck, car: FiKey };
const PARTNER_LABEL = {
  makemytrip: "MakeMyTrip",
  irctc: "IRCTC",
  redbus: "RedBus",
  zoomcar: "Zoomcar",
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });
}

function BookingCard({ booking, onDelete }) {
  const Icon = MODE_ICON[booking.mode] || FiCalendar;
  const isCar = booking.mode === "car";

  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0">
            <Icon size={16} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink truncate">
              {isCar ? `Pickup: ${booking.origin}` : `${booking.origin} → ${booking.destination}`}
            </p>
            <p className="text-xs text-muted flex items-center gap-1">
              Booked via {PARTNER_LABEL[booking.partner]}
              <FiExternalLink size={10} />
            </p>
          </div>
        </div>
        <button
          onClick={() => onDelete(booking)}
          title="Remove from dashboard"
          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-red-600 hover:bg-red-50 shrink-0"
        >
          <FiTrash2 size={13} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-border text-sm">
        <div>
          <p className="text-xs text-muted">{isCar ? "Pickup Date" : "Travel Date"}</p>
          <p className="text-ink font-medium">{formatDate(booking.travelDate)}</p>
        </div>
        <div>
          <p className="text-xs text-muted">{isCar ? "Cars" : "Passengers"}</p>
          <p className="text-ink font-medium">{booking.passengers}</p>
        </div>
        <div>
          <p className="text-xs text-muted">Reference</p>
          <p className="text-ink font-medium truncate">
            {booking.referenceNumber || "—"}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted">Amount Paid</p>
          <p className="text-forest font-semibold">
            {booking.amountPaid ? `₹${booking.amountPaid.toLocaleString()}` : "—"}
          </p>
        </div>
      </div>

      {booking.notes && (
        <p className="text-xs text-muted mt-3 pt-3 border-t border-border">
          {booking.notes}
        </p>
      )}
    </div>
  );
}

function DashboardBookings() {
  const { showToast } = useToast();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await getUserBookings(filter ? { mode: filter } : {});
      setBookings(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load your bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleDelete = async () => {
    if (!confirmTarget) return;
    setDeleting(true);
    try {
      await deleteBooking(confirmTarget._id);
      showToast("Booking removed.", "success");
      setConfirmTarget(null);
      await fetchBookings();
    } catch (err) {
      showToast(err.response?.data?.message || "Unable to remove this booking.", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
          <div>
            <h1 className="font-display text-3xl text-ink">My Bookings</h1>
            <p className="text-muted mt-1">
              Flights, trains, buses, and car rentals you've booked through
              our partner sites.
            </p>
          </div>
          <Link
            to="/travel-booking"
            className="px-5 py-2.5 rounded-xl bg-forest text-white text-sm font-semibold hover:bg-forest-hover transition-colors"
          >
            + Book Travel
          </Link>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { value: "", label: "All" },
            { value: "flight", label: "Flights" },
            { value: "train", label: "Trains" },
            { value: "bus", label: "Buses" },
            { value: "car", label: "Car Rentals" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                filter === opt.value
                  ? "bg-forest text-white"
                  : "bg-white border border-border text-ink hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="text-center text-red-600 text-sm py-16">{error}</p>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border p-10 text-center">
            <p className="text-muted mb-4">
              You haven't logged any bookings yet.
            </p>
            <Link to="/travel-booking" className="text-forest text-sm font-semibold">
              Search flights, trains, buses & car rentals →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onDelete={setConfirmTarget}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!confirmTarget}
        title="Remove this booking?"
        message="This only removes it from your Roam Meridian dashboard — it won't cancel anything on the partner site where you actually booked it."
        confirmLabel="Remove"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}

export default DashboardBookings;
