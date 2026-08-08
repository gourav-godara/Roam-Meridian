import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch, FiUsers, FiCalendar, FiExternalLink, FiAlertCircle, FiInfo,
} from "react-icons/fi";
import ModeTabs, { MODES } from "../../components/booking/ModeTabs";
import { getRedirectUrl } from "../../services/bookingApi";
import useAuth from "../../hooks/useAuth";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function TravelBooking() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [mode, setMode] = useState("flight");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(todayISO());
  const [passengers, setPassengers] = useState(1);
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  const isCarMode = mode === "car";
  const currentMode = MODES.find((m) => m.value === mode);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!origin.trim()) {
      setError(`Please enter a ${isCarMode ? "pickup" : "departure"} city.`);
      return;
    }
    if (!isCarMode && !destination.trim()) {
      setError("Please enter a destination city.");
      return;
    }

    setError("");
    setRedirecting(true);

    try {
      const res = await getRedirectUrl({
        mode,
        origin: origin.trim(),
        destination: isCarMode ? undefined : destination.trim(),
        date,
      });

      // Open the real partner site in a new tab — the user searches and
      // books there with real, live prices.
      window.open(res.data.url, "_blank", "noopener,noreferrer");

      // Take them to the "log your booking" page so if they do complete
      // a booking on the partner site, it's one click away from showing
      // up in their dashboard.
      const params = new URLSearchParams({
        mode,
        origin: origin.trim(),
        destination: isCarMode ? "" : destination.trim(),
        date,
        passengers: String(passengers),
      });
      navigate(`/travel-booking/log?${params.toString()}`);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to open the booking partner right now."
      );
    } finally {
      setRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg pt-28 sm:pt-32 pb-16">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl text-ink">
            Travel Booking
          </h1>
          <p className="text-muted mt-2">
            Search flights, trains, buses, and car rentals — book directly
            on a trusted partner, then keep track of it right here.
          </p>
        </div>

        <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 mb-6">
          <FiInfo className="text-blue-600 mt-0.5 shrink-0" size={16} />
          <p className="text-sm text-blue-800">
            Roam Meridian doesn't sell tickets directly. Search here, then
            we'll take you to <strong>{currentMode?.partner}</strong> — a
            real booking platform — to complete your booking with live
            prices and availability.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-border p-5 sm:p-6">
          <ModeTabs mode={mode} onChange={setMode} />

          <form
            onSubmit={handleSubmit}
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              isCarMode ? "lg:grid-cols-4" : "lg:grid-cols-5"
            } gap-4 mt-5`}
          >
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">
                {isCarMode ? "Pickup City" : "From"}
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Surat"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40"
              />
            </div>

            {!isCarMode && (
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">
                  To
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Delhi"
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">
                {isCarMode ? "Pickup Date" : "Departure Date"}
              </label>
              <div className="relative">
                <FiCalendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  size={14}
                />
                <input
                  type="date"
                  value={date}
                  min={todayISO()}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none focus:border-forest/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">
                {isCarMode ? "Cars" : "Passengers"}
              </label>
              <div className="relative">
                <FiUsers
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  size={14}
                />
                <input
                  type="number"
                  min="1"
                  max="9"
                  value={passengers}
                  onChange={(e) =>
                    setPassengers(Math.max(1, Number(e.target.value)))
                  }
                  className="w-full border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none focus:border-forest/40"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={redirecting}
              className="flex items-center justify-center gap-2 bg-forest text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-forest-hover transition-colors disabled:opacity-60 self-end"
            >
              {redirecting ? (
                "Opening..."
              ) : (
                <>
                  <FiSearch size={15} />
                  Search on {currentMode?.partner}
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 mt-4">
              <FiAlertCircle size={15} />
              {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {MODES.map(({ value, label, icon: Icon, partner }) => (
            <div
              key={value}
              className="bg-white rounded-2xl border border-border p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0">
                <Icon size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-ink">{label}</p>
                <p className="text-xs text-muted flex items-center gap-1">
                  via {partner} <FiExternalLink size={10} />
                </p>
              </div>
            </div>
          ))}
        </div>

        {isAuthenticated && (
          <div className="text-center mt-8">
            <p className="text-sm text-muted">
              Already booked something?{" "}
              <a
                href="/dashboard/bookings"
                className="text-forest font-semibold hover:underline"
              >
                View your bookings
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TravelBooking;
