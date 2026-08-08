import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiClock, FiEyeOff } from "react-icons/fi";
import { useDebounce } from "../../hooks/useDebounce";
import { useToast } from "../../context/ToastContext";
import { getAllItineraries, deleteItinerary } from "../../services/adminApi";
import Pagination from "../../components/admin/Pagination";
import ConfirmDialog from "../../components/admin/ConfirmDialog";

const THEMES = [
  "Heritage", "Adventure", "Family", "Honeymoon", "Spiritual",
  "Nature", "City", "Budget", "Luxury",
];

function AdminItineraries() {
  const { showToast } = useToast();

  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [busyId, setBusyId] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  const fetchItineraries = async () => {
    setLoading(true);
    try {
      // Admin list should show unpublished drafts too, unlike the public
      // endpoint's implicit published-only filter — see note in
      // itinerary.controller.js if you want to add that distinction later.
      const res = await getAllItineraries({
        search: debouncedSearch,
        theme,
        page,
        limit: 12,
      });
      setItineraries(res.data);
      setTotalPages(res.totalPages);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load itineraries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, theme, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, theme]);

  const handleDelete = async () => {
    if (!confirmTarget) return;
    setBusyId(confirmTarget._id);
    try {
      await deleteItinerary(confirmTarget._id);
      showToast("Itinerary deleted.", "success");
      setConfirmTarget(null);
      await fetchItineraries();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Unable to delete itinerary.",
        "error"
      );
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl text-ink">Travel Itineraries</h1>
          <p className="text-sm text-muted mt-1">
            Curated day-by-day guides shown on the public Itinerary Guide page.
          </p>
        </div>

        <Link
          to="/admin/itineraries/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest text-white text-sm font-semibold hover:bg-forest-hover transition-colors"
        >
          <FiPlus size={16} />
          Add Itinerary
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            type="text"
            placeholder="Search by title or destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-forest/40"
          />
        </div>

        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="border border-border rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:border-forest/40"
        >
          <option value="">All Themes</option>
          {THEMES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
        </div>
      ) : error ? (
        <p className="text-center text-red-600 text-sm py-16">{error}</p>
      ) : itineraries.length === 0 ? (
        <p className="text-center text-muted text-sm py-16 bg-white rounded-2xl border border-border">
          No itineraries found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {itineraries.map((itinerary) => (
            <div
              key={itinerary._id}
              className="bg-white rounded-2xl border border-border overflow-hidden"
            >
              <div className="relative">
                <img
                  src={itinerary.coverImage || "https://placehold.co/400x220"}
                  alt={itinerary.title}
                  className="w-full h-36 object-cover"
                />
                {!itinerary.published && (
                  <span className="absolute top-2 right-2 bg-black/70 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <FiEyeOff size={11} />
                    Draft
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="min-w-0">
                  <p className="font-medium text-ink truncate">{itinerary.title}</p>
                  <p className="text-xs text-muted truncate">
                    {itinerary.destinationName}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest/10 text-forest text-xs font-medium">
                    <FiClock size={11} />
                    {itinerary.durationDays}D / {itinerary.durationNights}N
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/itineraries/${itinerary._id}/edit`}
                      title="Edit"
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-ink hover:bg-gray-100"
                    >
                      <FiEdit2 size={13} />
                    </Link>
                    <button
                      onClick={() => setConfirmTarget(itinerary)}
                      disabled={busyId === itinerary._id}
                      title="Delete"
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-red-600 hover:bg-red-50 disabled:opacity-40"
                    >
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      <ConfirmDialog
        open={!!confirmTarget}
        title={`Delete "${confirmTarget?.title}"?`}
        message="This removes the itinerary from the public guide. This can't be undone."
        confirmLabel="Delete Itinerary"
        loading={!!busyId}
        onConfirm={handleDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}

export default AdminItineraries;