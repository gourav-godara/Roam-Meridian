import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin, FiClock, FiDollarSign, FiSun, FiCoffee, FiHome,
  FiCheckCircle, FiChevronDown, FiArrowLeft, FiCompass,
} from "react-icons/fi";
import { getItineraryById } from "../../services/itineraryApi";

function DayAccordion({ day, isOpen, onToggle }) {
  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-forest text-white flex items-center justify-center font-display font-semibold shrink-0">
            {day.day}
          </div>
          <div>
            <p className="text-xs text-muted">Day {day.day}</p>
            <h3 className="font-display text-lg text-ink leading-tight">
              {day.title}
            </h3>
          </div>
        </div>
        <FiChevronDown
          size={18}
          className={`text-muted shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pl-[4.75rem] flex flex-col gap-4">
              {day.image && (
                <img
                  src={day.image}
                  alt={day.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
              )}

              {day.activities?.length > 0 && (
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-forest uppercase tracking-wide mb-2">
                    <FiSun size={13} />
                    Things to do
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {day.activities.map((activity, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink">
                        <FiCheckCircle size={14} className="text-forest mt-0.5 shrink-0" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {day.restaurants?.length > 0 && (
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-gold uppercase tracking-wide mb-2">
                    <FiCoffee size={13} />
                    Where to eat
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {day.restaurants.map((r, i) => (
                      <span
                        key={i}
                        className="bg-gold/10 text-gold text-xs font-medium px-3 py-1.5 rounded-full"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4 pt-2 border-t border-border text-sm">
                {day.stay && (
                  <p className="flex items-center gap-1.5 text-muted">
                    <FiHome size={13} />
                    {day.stay}
                  </p>
                )}
                {day.estimatedCost > 0 && (
                  <p className="flex items-center gap-1.5 text-muted">
                    <FiDollarSign size={13} />
                    ~₹{day.estimatedCost.toLocaleString("en-IN")}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ItineraryGuideDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDay, setOpenDay] = useState(1);

  useEffect(() => {
    const fetchItinerary = async () => {
      setLoading(true);
      try {
        const response = await getItineraryById(id);
        setItinerary(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Couldn't load this itinerary."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [id]);

  // Reuses the exact param pattern ActionButtons.jsx already sends from
  // the Destination page, so AIPlanner.jsx needs no changes to read it.
  const handlePlanWithAI = () => {
    const params = new URLSearchParams({
      destinationId: itinerary.destination?._id || "",
      destinationName: itinerary.destinationName || "",
    });
    navigate(`/planner?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="w-8 h-8 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !itinerary) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg gap-3 px-6 text-center">
        <p className="text-red-600 text-sm">{error || "Itinerary not found."}</p>
        <button
          onClick={() => navigate("/itinerary-guide")}
          className="text-forest text-sm font-medium hover:underline"
        >
          Back to all itineraries
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pt-28 sm:pt-32 pb-16">
      <div className="max-w-[900px] mx-auto px-6">
        <button
          onClick={() => navigate("/itinerary-guide")}
          className="flex items-center gap-1.5 text-sm text-muted hover:text-forest transition-colors mb-6"
        >
          <FiArrowLeft size={14} />
          All itineraries
        </button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl bg-forest"
        >
          {itinerary.coverImage && (
            <>
              <img
                src={itinerary.coverImage}
                alt={itinerary.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/70 to-forest/30" />
            </>
          )}

          <div className="relative z-10 p-8 sm:p-10">
            <p className="flex items-center gap-1.5 text-gold text-xs font-semibold uppercase tracking-wide">
              <FiMapPin size={12} />
              {itinerary.destinationName}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl text-white mt-2 leading-tight">
              {itinerary.title}
            </h1>
            <p className="text-white/75 text-sm mt-3 max-w-xl">
              {itinerary.summary}
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <span className="bg-white/15 text-white text-xs font-medium px-3.5 py-2 rounded-full flex items-center gap-1.5">
                <FiClock size={13} />
                {itinerary.durationNights} Nights / {itinerary.durationDays} Days
              </span>
              {itinerary.theme && (
                <span className="bg-white/15 text-white text-xs font-medium px-3.5 py-2 rounded-full">
                  {itinerary.theme}
                </span>
              )}
              {itinerary.bestTime && (
                <span className="bg-white/15 text-white text-xs font-medium px-3.5 py-2 rounded-full flex items-center gap-1.5">
                  <FiSun size={13} />
                  Best time: {itinerary.bestTime}
                </span>
              )}
              {itinerary.estimatedBudget > 0 && (
                <span className="bg-white/15 text-white text-xs font-medium px-3.5 py-2 rounded-full flex items-center gap-1.5">
                  <FiDollarSign size={13} />
                  ~₹{itinerary.estimatedBudget.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Plan with AI CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-gold/10 border border-gold/30 rounded-2xl p-5 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center shrink-0">
              <FiCompass size={18} className="text-gold" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">
                Like this itinerary?
              </p>
              <p className="text-xs text-muted mt-0.5">
                Customize it into your own trip with the AI Planner.
              </p>
            </div>
          </div>
          <button
            onClick={handlePlanWithAI}
            className="w-full sm:w-auto bg-forest hover:bg-forest-hover text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shrink-0"
          >
            Plan This Trip
          </button>
        </motion.div>

        {/* Highlights */}
        {itinerary.highlights?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-8"
          >
            <h2 className="font-display text-xl text-ink mb-3">Trip Highlights</h2>
            <div className="flex flex-wrap gap-2">
              {itinerary.highlights.map((h, i) => (
                <span
                  key={i}
                  className="bg-forest/10 text-forest text-sm font-medium px-3.5 py-1.5 rounded-full"
                >
                  {h}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Day by day */}
        <div className="mt-8">
          <h2 className="font-display text-xl text-ink mb-4">
            Day-by-Day Itinerary
          </h2>
          <div className="flex flex-col gap-3">
            {itinerary.days.map((day) => (
              <DayAccordion
                key={day.day}
                day={day}
                isOpen={openDay === day.day}
                onToggle={() => setOpenDay(openDay === day.day ? null : day.day)}
              />
            ))}
          </div>
        </div>

        {/* Tips */}
        {itinerary.tips?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-surface rounded-2xl border border-border p-6 mt-8"
          >
            <h2 className="font-display text-lg text-ink mb-3">Travel Tips</h2>
            <ul className="flex flex-col gap-2">
              {itinerary.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted">
                  <FiCheckCircle size={14} className="text-forest mt-0.5 shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Link back to the full destination page */}
        {itinerary.destination?._id && (
          <div className="text-center mt-10">
            <button
              onClick={() => navigate(`/destination/${itinerary.destination._id}`)}
              className="text-forest text-sm font-medium hover:underline"
            >
              View full {itinerary.destinationName} destination guide →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItineraryGuideDetail;