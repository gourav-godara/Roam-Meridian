import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import {
  FiCheckCircle, FiSend, FiTrendingUp, FiTruck, FiKey, FiLoader,
} from "react-icons/fi";
import { createBooking } from "../../services/bookingApi";
import { useToast } from "../../context/ToastContext";
import useAuth from "../../hooks/useAuth";

const MODE_ICON = { flight: FiSend, train: FiTrendingUp, bus: FiTruck, car: FiKey };
const MODE_PARTNER = {
  flight: "MakeMyTrip",
  train: "IRCTC",
  bus: "RedBus",
  car: "Zoomcar",
};

function LogBooking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();

  const mode = searchParams.get("mode") || "flight";
  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const date = searchParams.get("date") || "";
  const passengers = Number(searchParams.get("passengers")) || 1;

  const Icon = MODE_ICON[mode] || FiSend;
  const isCar = mode === "car";

  const [referenceNumber, setReferenceNumber] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: `/travel-booking/log?${searchParams.toString()}` },
      });
      return;
    }

    setSaving(true);
    try {
      await createBooking({
        mode,
        origin,
        destination,
        travelDate: date,
        passengers,
        referenceNumber: referenceNumber.trim(),
        amountPaid: amountPaid ? Number(amountPaid) : null,
        notes: notes.trim(),
      });

      showToast("Booking saved to your dashboard.", "success");
      navigate("/dashboard/bookings");
    } catch (err) {
      showToast(
        err.response?.data?.message || "Unable to save this booking.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg pt-28 sm:pt-32 pb-16">
      <div className="max-w-[600px] mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-3xl border border-border p-6 sm:p-8">
          <div className="w-14 h-14 rounded-full bg-forest/10 text-forest flex items-center justify-center mb-4">
            <Icon size={24} />
          </div>

          <h1 className="font-display text-2xl text-ink mb-1">
            Did you complete your booking?
          </h1>
          <p className="text-muted text-sm mb-6">
            We opened {MODE_PARTNER[mode]} in a new tab for your search.
            If you finished booking there, save the details here so it
            shows up in your dashboard.
          </p>

          <div className="bg-mist/60 rounded-2xl px-4 py-3 mb-6 text-sm">
            {isCar ? (
              <p className="text-ink">
                <strong>Pickup:</strong> {origin || "—"}
              </p>
            ) : (
              <p className="text-ink">
                <strong>{origin || "—"}</strong> → <strong>{destination || "—"}</strong>
              </p>
            )}
            <p className="text-muted mt-1">
              {date && new Date(date).toLocaleDateString(undefined, {
                weekday: "short", day: "numeric", month: "short", year: "numeric",
              })}
              {" • "}
              {passengers} {isCar ? "car" : "passenger"}{passengers !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">
                Booking Reference / PNR{" "}
                <span className="text-muted font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder={`From your ${MODE_PARTNER[mode]} confirmation`}
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">
                Amount Paid (₹){" "}
                <span className="text-muted font-normal">(optional)</span>
              </label>
              <input
                type="number"
                min="0"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                placeholder="e.g. 4500"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">
                Notes <span className="text-muted font-normal">(optional)</span>
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Seat number, class, anything worth remembering..."
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40 resize-none"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 bg-forest text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-forest-hover transition-colors disabled:opacity-60"
            >
              {saving ? (
                <FiLoader className="animate-spin" size={16} />
              ) : (
                <FiCheckCircle size={16} />
              )}
              Yes, Save This Booking
            </button>

            <Link
              to="/travel-booking"
              className="flex-1 flex items-center justify-center gap-2 border border-border rounded-xl px-5 py-2.5 text-sm font-semibold text-ink hover:bg-gray-50 transition-colors"
            >
              I Didn't Book / Search Again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogBooking;
