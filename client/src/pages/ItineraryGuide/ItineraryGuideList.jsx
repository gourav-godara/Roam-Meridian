import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiMapPin, FiClock, FiChevronDown } from "react-icons/fi";
import { getAllItineraries } from "../../services/itineraryApi";
import { useDebounce } from "../../hooks/useDebounce";

const THEMES = [
  "All", "Heritage", "Adventure", "Family", "Honeymoon",
  "Spiritual", "Nature", "City", "Budget", "Luxury",
];

function ItineraryCard({ itinerary, index }) {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
      onClick={() => navigate(`/itinerary-guide/${itinerary._id}`)}
      className="group bg-surface rounded-[20px] border border-border shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        {itinerary.coverImage ? (
          <img
            src={itinerary.coverImage}
            alt={itinerary.title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FiMapPin size={28} className="text-forest/30" />
          </div>
        )}

        <span className="absolute top-3 left-3 bg-forest text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          {itinerary.durationNights} Night{itinerary.durationNights !== 1 ? "s" : ""} /{" "}
          {itinerary.durationDays} Day{itinerary.durationDays !== 1 ? "s" : ""}
        </span>

        {itinerary.theme && (
          <span className="absolute top-3 right-3 bg-white/85 backdrop-blur-sm text-ink text-xs font-medium px-3 py-1.5 rounded-full">
            {itinerary.theme}
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="flex items-center gap-1 text-xs text-gold font-semibold uppercase tracking-wide">
          <FiMapPin size={11} />
          {itinerary.destinationName}
        </p>
        <h3 className="text-base font-display text-ink mt-1.5 leading-snug">
          {itinerary.title}
        </h3>
        <p className="text-sm text-muted mt-1.5 line-clamp-2">
          {itinerary.summary}
        </p>

        {itinerary.bestTime && (
          <p className="flex items-center gap-1.5 text-xs text-muted mt-3 pt-3 border-t border-border">
            <FiClock size={12} />
            Best time: {itinerary.bestTime}
          </p>
        )}
      </div>
    </motion.article>
  );
}

function ItineraryGuideList() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const fetchItineraries = async () => {
      setLoading(true);
      try {
        const response = await getAllItineraries({
          page,
          limit: 12,
          search: debouncedSearch,
          theme: theme === "All" ? "" : theme,
        });
        setItineraries(response.data || []);
        setTotalPages(response.totalPages || 1);
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, [page, debouncedSearch, theme]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, theme]);

  return (
    <div className="min-h-screen bg-bg pt-28 sm:pt-32 pb-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold tracking-[0.15em] text-gold uppercase mb-2">
            Travel Itineraries
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-ink">
            Day-by-Day Trip Guides
          </h1>
          <p className="text-muted mt-3 max-w-xl mx-auto">
            Ready-made itineraries for popular destinations — see what to do
            each day, then customize it as your own trip.
          </p>
        </motion.div>

        <div className="bg-surface rounded-2xl border border-border p-4 shadow-sm flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FiSearch
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by destination, e.g. Paris, Goa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border text-sm outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40 transition-colors"
            />
          </div>

          <div className="relative sm:w-52">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 rounded-xl border border-border text-sm outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40 transition-colors bg-surface"
            >
              {THEMES.map((t) => (
                <option key={t} value={t}>
                  {t === "All" ? "All Themes" : t}
                </option>
              ))}
            </select>
            <FiChevronDown
              size={14}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-[20px] bg-mist animate-pulse"
                />
              ))}
            </div>
          ) : itineraries.length === 0 ? (
            <div className="bg-surface rounded-2xl border border-border p-12 text-center">
              <FiMapPin size={26} className="text-forest/30 mx-auto mb-3" />
              <h3 className="font-display text-lg text-ink mb-1">
                No itineraries found
              </h3>
              <p className="text-muted text-sm">
                Try a different destination or theme.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {itineraries.map((itinerary, i) => (
                <ItineraryCard key={itinerary._id} itinerary={itinerary} index={i} />
              ))}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-border text-sm font-medium disabled:opacity-40 hover:bg-mist transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-muted px-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border border-border text-sm font-medium disabled:opacity-40 hover:bg-mist transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItineraryGuideList;