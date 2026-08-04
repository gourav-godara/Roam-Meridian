import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiStar } from "react-icons/fi";
import { useDebounce } from "../../hooks/useDebounce";
import { useToast } from "../../context/ToastContext";
import { getAllDestinations, deleteDestination } from "../../services/adminApi";
import Pagination from "../../components/admin/Pagination";
import ConfirmDialog from "../../components/admin/ConfirmDialog";

const CATEGORIES = [
  "Beach", "Mountains", "Heritage", "Adventure", "Nature",
  "Wildlife", "City", "Spiritual", "Snow", "Food",
];

function AdminDestinations() {
  const { showToast } = useToast();

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [busyId, setBusyId] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const res = await getAllDestinations({
        search: debouncedSearch,
        category,
        page,
        limit: 12,
      });
      setDestinations(res.data);
      setTotalPages(res.totalPages);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load destinations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, category, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category]);

  const handleDelete = async () => {
    if (!confirmTarget) return;
    setBusyId(confirmTarget._id);
    try {
      await deleteDestination(confirmTarget._id);
      showToast("Destination deleted.", "success");
      setConfirmTarget(null);
      await fetchDestinations();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Unable to delete destination.",
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
          <h1 className="font-display text-2xl text-ink">Destinations</h1>
          <p className="text-sm text-muted mt-1">
            Manage the destination catalog shown across the site.
          </p>
        </div>

        <Link
          to="/admin/destinations/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest text-white text-sm font-semibold hover:bg-forest-hover transition-colors"
        >
          <FiPlus size={16} />
          Add Destination
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            type="text"
            placeholder="Search by name, city, or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-forest/40"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-border rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:border-forest/40"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
        </div>
      ) : error ? (
        <p className="text-center text-red-600 text-sm py-16">{error}</p>
      ) : destinations.length === 0 ? (
        <p className="text-center text-muted text-sm py-16 bg-white rounded-2xl border border-border">
          No destinations found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((destination) => (
            <div
              key={destination._id}
              className="bg-white rounded-2xl border border-border overflow-hidden"
            >
              <img
                src={destination.images?.[0] || "https://placehold.co/400x220"}
                alt={destination.name}
                className="w-full h-36 object-cover"
              />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-ink truncate">
                      {destination.name}
                    </p>
                    <p className="text-xs text-muted truncate">
                      {destination.city}, {destination.country}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gold font-medium shrink-0">
                    <FiStar size={12} className="fill-gold" />
                    {destination.rating?.average?.toFixed(1) ?? "0.0"}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="px-2.5 py-1 rounded-full bg-forest/10 text-forest text-xs font-medium">
                    {destination.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/destinations/${destination._id}/edit`}
                      title="Edit"
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-ink hover:bg-gray-100"
                    >
                      <FiEdit2 size={13} />
                    </Link>
                    <button
                      onClick={() => setConfirmTarget(destination)}
                      disabled={busyId === destination._id}
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
        title={`Delete ${confirmTarget?.name}?`}
        message="This removes the destination from the entire site, including anywhere it's referenced. This can't be undone."
        confirmLabel="Delete Destination"
        loading={!!busyId}
        onConfirm={handleDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}

export default AdminDestinations;
