import { useEffect, useState } from "react";
import { FiSearch, FiTrash2, FiExternalLink } from "react-icons/fi";
import { useDebounce } from "../../hooks/useDebounce";
import { useToast } from "../../context/ToastContext";
import { getAllTripsAdmin, deleteTripAdmin } from "../../services/adminApi";
import Pagination from "../../components/admin/Pagination";
import StatusBadge from "../../components/admin/StatusBadge";
import ConfirmDialog from "../../components/admin/ConfirmDialog";

const STATUSES = ["draft", "planning", "ongoing", "completed"];

function AdminTrips() {
  const { showToast } = useToast();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [busyId, setBusyId] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const res = await getAllTripsAdmin({
        search: debouncedSearch || undefined,
        status: status || undefined,
        page,
        limit: 15,
      });
      setTrips(res.data);
      setTotalPages(res.totalPages);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load trips.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, status, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  const handleDelete = async () => {
    if (!confirmTarget) return;
    setBusyId(confirmTarget._id);
    try {
      await deleteTripAdmin(confirmTarget._id);
      showToast("Trip deleted.", "success");
      setConfirmTarget(null);
      await fetchTrips();
    } catch (err) {
      showToast(err.response?.data?.message || "Unable to delete trip.", "error");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Trips</h1>
        <p className="text-sm text-muted mt-1">
          Every trip created across the platform.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            type="text"
            placeholder="Search by trip title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-forest/40"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-border rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:border-forest/40"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="text-center text-red-600 text-sm py-16">{error}</p>
        ) : trips.length === 0 ? (
          <p className="text-center text-muted text-sm py-16">No trips found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted uppercase tracking-wide">
                  <th className="px-4 py-3 font-medium">Trip</th>
                  <th className="px-4 py-3 font-medium">Owner</th>
                  <th className="px-4 py-3 font-medium">Destination</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Budget</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => (
                  <tr key={trip._id} className="border-b border-border last:border-0 hover:bg-gray-50/60">
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink truncate max-w-[200px]">{trip.title}</p>
                      <p className="text-xs text-muted">
                        {new Date(trip.startDate).toLocaleDateString()} –{" "}
                        {new Date(trip.endDate).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-ink">
                      {trip.createdBy?.name || "Deleted user"}
                    </td>
                    <td className="px-4 py-3 text-ink">
                      {trip.destinationId
                        ? `${trip.destinationId.name}`
                        : "Unavailable"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge value={trip.status} />
                    </td>
                    <td className="px-4 py-3 text-ink">₹{trip.budget?.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/trips/${trip._id}`}
                          target="_blank"
                          rel="noreferrer"
                          title="View trip"
                          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-ink hover:bg-gray-100"
                        >
                          <FiExternalLink size={14} />
                        </a>
                        <button
                          onClick={() => setConfirmTarget(trip)}
                          disabled={busyId === trip._id}
                          title="Delete trip"
                          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-red-600 hover:bg-red-50 disabled:opacity-40"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <ConfirmDialog
        open={!!confirmTarget}
        title={`Delete "${confirmTarget?.title}"?`}
        message="This permanently deletes the trip and its itinerary. This can't be undone."
        confirmLabel="Delete Trip"
        loading={!!busyId}
        onConfirm={handleDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}

export default AdminTrips;
