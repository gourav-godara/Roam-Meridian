import { useEffect, useState } from "react";
import { FiSearch, FiTrash2, FiStar } from "react-icons/fi";
import { useDebounce } from "../../hooks/useDebounce";
import { useToast } from "../../context/ToastContext";
import { getAllReviewsAdmin, deleteReviewAdmin } from "../../services/adminApi";
import Pagination from "../../components/admin/Pagination";
import ConfirmDialog from "../../components/admin/ConfirmDialog";

function AdminReviews() {
  const { showToast } = useToast();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [busyId, setBusyId] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await getAllReviewsAdmin({
        search: debouncedSearch || undefined,
        rating: rating || undefined,
        page,
        limit: 12,
      });
      setReviews(res.data);
      setTotalPages(res.totalPages);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, rating, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, rating]);

  const handleDelete = async () => {
    if (!confirmTarget) return;
    setBusyId(confirmTarget._id);
    try {
      await deleteReviewAdmin(confirmTarget._id);
      showToast("Review deleted.", "success");
      setConfirmTarget(null);
      await fetchReviews();
    } catch (err) {
      showToast(err.response?.data?.message || "Unable to delete review.", "error");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Reviews</h1>
        <p className="text-sm text-muted mt-1">
          Moderate reviews across all destinations.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            type="text"
            placeholder="Search review text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-forest/40"
          />
        </div>

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border border-border rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:border-forest/40"
        >
          <option value="">All Ratings</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r !== 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
        </div>
      ) : error ? (
        <p className="text-center text-red-600 text-sm py-16">{error}</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-muted text-sm py-16 bg-white rounded-2xl border border-border">
          No reviews found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-2xl border border-border p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-ink truncate">
                    {review.destination?.name || "Destination"}
                  </p>
                  <p className="text-xs text-muted truncate">
                    By {review.user?.name || "Unknown"} ({review.user?.email})
                  </p>
                </div>
                <button
                  onClick={() => setConfirmTarget(review)}
                  disabled={busyId === review._id}
                  title="Delete review"
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-red-600 hover:bg-red-50 disabled:opacity-40 shrink-0"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>

              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    size={13}
                    className={
                      star <= review.rating
                        ? "fill-gold text-gold"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="text-xs text-muted ml-1">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm text-ink mt-3 line-clamp-3">
                {review.reviewText}
              </p>
            </div>
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      <ConfirmDialog
        open={!!confirmTarget}
        title="Delete this review?"
        message="This permanently removes the review and recalculates the destination's average rating."
        confirmLabel="Delete Review"
        loading={!!busyId}
        onConfirm={handleDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}

export default AdminReviews;
