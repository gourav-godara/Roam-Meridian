import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiLoader, FiUser } from "react-icons/fi";
import { getTravelOptionById } from "../../services/travelOptionApi";
import { createBooking } from "../../services/bookingApi";
import useAuth from "../../hooks/useAuth";
import { useToast } from "../../context/ToastContext";

function formatDateTime(dateStr) {
  return new Date(dateStr).toLocaleString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const emptyTraveler = () => ({ name: "", age: "", gender: "male" });

function BookingForm() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const initialPassengers = location.state?.passengers || 1;

  const [option, setOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [travelers, setTravelers] = useState(
    Array.from({ length: initialPassengers }, emptyTraveler)
  );
  const [contactEmail, setContactEmail] = useState(user?.email || "");
  const [contactPhone, setContactPhone] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const res = await getTravelOptionById(id);
        if (!ignore) setOption(res.data);
      } catch (err) {
        if (!ignore) {
          setLoadError(
            err.response?.data?.message || "This option is no longer available."
          );
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

  const isCar = option?.mode === "car";

  const updateTraveler = (index, field, value) => {
    setTravelers((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [field]: value } : t))
    );
  };

  const addTraveler = () => {
    if (!option) return;
    if (travelers.length >= option.seatsAvailable) {
      setFormError(`Only ${option.seatsAvailable} seat(s) available.`);
      return;
    }
    setTravelers((prev) => [...prev, emptyTraveler()]);
  };

  const removeTraveler = (index) => {
    if (travelers.length === 1) return;
    setTravelers((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    for (const t of travelers) {
      if (!t.name.trim()) return "Every traveler needs a name.";
      if (!t.age || Number(t.age) <= 0) return "Every traveler needs a valid age.";
    }
    if (!contactEmail.trim()) return "Contact email is required.";
    if (!contactPhone.trim()) return "Contact phone is required.";
    if (!/^\S+@\S+\.\S+$/.test(contactEmail)) return "Enter a valid email address.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError("");
    setSubmitting(true);

    try {
      const res = await createBooking({
        travelOptionId: id,
        travelers: travelers.map((t) => ({
          name: t.name.trim(),
          age: Number(t.age),
          gender: t.gender,
        })),
        contactEmail: contactEmail.trim(),
        contactPhone: contactPhone.trim(),
      });

      showToast("Booking confirmed!", "success");
      navigate(`/travel-booking/confirmation/${res.data._id}`);
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Unable to complete this booking."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="w-8 h-8 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
      </div>
    );
  }

  if (loadError || !option) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center px-6">
        <p className="text-red-600 text-sm mb-3">{loadError}</p>
        <Link to="/travel-booking" className="text-forest text-sm font-medium">
          ← Back to search
        </Link>
      </div>
    );
  }

  const totalPrice = option.price * travelers.length;

  return (
    <div className="min-h-screen bg-bg pt-28 sm:pt-32 pb-16">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12">
        <Link
          to="/travel-booking"
          className="flex items-center gap-2 text-sm text-muted hover:text-ink w-fit mb-6"
        >
          <FiArrowLeft size={15} /> Back to search
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-border p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-ink mb-1">
                {isCar ? "Renter Details" : "Traveler Details"}
              </h2>
              <p className="text-sm text-muted mb-5">
                Enter details exactly as they appear on a valid photo ID.
              </p>

              {formError && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 mb-5">
                  {formError}
                </div>
              )}

              <div className="flex flex-col gap-5">
                {travelers.map((traveler, index) => (
                  <div
                    key={index}
                    className="border border-border rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="flex items-center gap-1.5 text-sm font-medium text-ink">
                        <FiUser size={14} />
                        Traveler {index + 1}
                      </span>
                      {travelers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTraveler(index)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Full name"
                        value={traveler.name}
                        onChange={(e) =>
                          updateTraveler(index, "name", e.target.value)
                        }
                        className="sm:col-span-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-forest/40"
                      />
                      <input
                        type="number"
                        placeholder="Age"
                        min="0"
                        value={traveler.age}
                        onChange={(e) =>
                          updateTraveler(index, "age", e.target.value)
                        }
                        className="border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-forest/40"
                      />
                      <select
                        value={traveler.gender}
                        onChange={(e) =>
                          updateTraveler(index, "gender", e.target.value)
                        }
                        className="border border-border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-forest/40"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              {!isCar && (
                <button
                  type="button"
                  onClick={addTraveler}
                  className="text-sm text-forest font-medium mt-4 hover:text-forest-hover"
                >
                  + Add another traveler
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-border p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-ink mb-5">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 bg-forest text-white rounded-xl px-6 py-3.5 text-sm font-semibold hover:bg-forest-hover transition-colors disabled:opacity-60 lg:hidden"
            >
              {submitting && <FiLoader className="animate-spin" size={16} />}
              Confirm &amp; Pay ₹{totalPrice.toLocaleString()}
            </button>
          </form>

          <aside className="bg-white rounded-2xl border border-border p-5 sm:p-6 h-fit lg:sticky lg:top-32">
            <h3 className="text-sm font-semibold text-ink mb-4">
              Booking Summary
            </h3>

            <div className="text-sm text-ink mb-1 font-medium">
              {option.operator} {option.code && `• ${option.code}`}
            </div>

            {isCar ? (
              <p className="text-xs text-muted mb-4">
                Pickup: {option.origin.city}
                <br />
                {formatDateTime(option.departureTime)}
              </p>
            ) : (
              <p className="text-xs text-muted mb-4">
                {option.origin.city} → {option.destination.city}
                <br />
                {formatDateTime(option.departureTime)}
              </p>
            )}

            <div className="border-t border-border pt-4 flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">
                  ₹{option.price.toLocaleString()} × {travelers.length}
                </span>
                <span className="text-ink">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t border-border mt-1">
                <span>Total</span>
                <span className="text-forest">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="hidden lg:flex w-full items-center justify-center gap-2 bg-forest text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-forest-hover transition-colors disabled:opacity-60 mt-5"
            >
              {submitting && <FiLoader className="animate-spin" size={16} />}
              Confirm Booking
            </button>

            <p className="text-[11px] text-muted mt-3 text-center">
              This is a demo booking flow — no real payment is processed.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
