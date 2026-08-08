import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiCheckCircle, FiDownload, FiCalendar } from "react-icons/fi";
import { getBookingById } from "../../services/bookingApi";

function formatDateTime(dateStr) {
  return new Date(dateStr).toLocaleString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function BookingConfirmation() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const res = await getBookingById(id);
        if (!ignore) setBooking(res.data);
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message || "Booking not found.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="w-8 h-8 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center px-6">
        <p className="text-red-600 text-sm mb-3">{error}</p>
        <Link to="/dashboard/bookings" className="text-forest text-sm font-medium">
          View your bookings
        </Link>
      </div>
    );
  }

  const { snapshot } = booking;
  const isCar = booking.mode === "car";

  return (
    <div className="min-h-screen bg-bg pt-28 sm:pt-32 pb-16">
      <div className="max-w-[700px] mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-forest/10 text-forest flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle size={32} />
          </div>

          <h1 className="font-display text-2xl text-ink mb-1">
            Booking Confirmed!
          </h1>
          <p className="text-muted text-sm mb-6">
            A confirmation has been recorded for your {booking.mode}.
          </p>

          <div className="bg-mist/60 rounded-2xl px-5 py-3 inline-block mb-6">
            <p className="text-xs text-muted">Booking Reference</p>
            <p className="text-lg font-semibold text-ink tracking-wide font-display">
              {booking.bookingReference}
            </p>
          </div>

          <div className="text-left border border-border rounded-2xl p-5 mb-6">
            <p className="text-sm font-semibold text-ink mb-1">
              {snapshot.operator} {snapshot.code && `• ${snapshot.code}`}
            </p>

            {isCar ? (
              <p className="text-sm text-muted">
                Pickup: {snapshot.origin.city}
                <br />
                {formatDateTime(snapshot.departureTime)}
              </p>
            ) : (
              <p className="text-sm text-muted">
                {snapshot.origin.city} → {snapshot.destination.city}
                <br />
                Departure: {formatDateTime(snapshot.departureTime)}
              </p>
            )}

            <div className="border-t border-border mt-4 pt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted">Travelers</p>
                <p className="text-ink font-medium">
                  {booking.travelers.length}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">Total Paid</p>
                <p className="text-forest font-semibold">
                  ₹{booking.totalPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/dashboard/bookings"
              className="flex-1 flex items-center justify-center gap-2 bg-forest text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-forest-hover transition-colors"
            >
              <FiCalendar size={15} />
              View My Bookings
            </Link>
            <button
              onClick={() => window.print()}
              className="flex-1 flex items-center justify-center gap-2 border border-border rounded-xl px-5 py-2.5 text-sm font-semibold text-ink hover:bg-gray-50 transition-colors"
            >
              <FiDownload size={15} />
              Save / Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
