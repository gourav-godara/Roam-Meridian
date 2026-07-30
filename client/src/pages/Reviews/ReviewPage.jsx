import { useEffect, useMemo, useState } from "react";
import useReview from "../../hooks/useReview";
import useAuth from "../../hooks/useAuth";
import { getTrips } from "../../services/tripApi";
import { useToast } from "../../context/ToastContext";

import ReviewStats from "../../components/review/ReviewStats";
import ReviewFilter from "../../components/review/ReviewFilter";
import ReviewList from "../../components/review/ReviewList";
import AddReviewModal from "./AddReviewModal";

const ReviewPage = () => {
  const {
    reviews,
    loading,
    error,
    actionError,
    addReview,
    editReview,
    removeReview,
  } = useReview();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  // Previously this modal was built but never mounted anywhere — the
  // page's only "write a review" entry point showed a "coming soon"
  // alert instead.
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [completedTrips, setCompletedTrips] = useState([]);

  useEffect(() => {
    let ignore = false;

    const loadTrips = async () => {
      try {
        const result = await getTrips();
        const completed = (result.data || []).filter(
          (trip) => trip.status === "completed"
        );
        if (!ignore) setCompletedTrips(completed);
      } catch {
        if (!ignore) setCompletedTrips([]);
      }
    };

    loadTrips();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredReviews = useMemo(() => {
    let filtered = [...reviews];

    if (search) {
      filtered = filtered.filter((review) =>
        review.destination?.name?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (rating) {
      filtered = filtered.filter((review) => review.rating >= Number(rating));
    }

    if (sortBy === "highest") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "lowest") {
      filtered.sort((a, b) => a.rating - b.rating);
    } else {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  }, [reviews, search, rating, sortBy]);

  const handleOpenCreate = () => {
    setEditingReview(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (review) => {
    setEditingReview(review);
    setModalOpen(true);
  };

  const handleClose = () => {
    if (submitting) return;
    setModalOpen(false);
    setEditingReview(null);
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);

    const success = editingReview
      ? await editReview(editingReview._id, {
          rating: formData.rating,
          reviewText: formData.reviewText,
        })
      : await addReview({
          rating: formData.rating,
          reviewText: formData.reviewText,
          itinerary: formData.itinerary,
        });

    setSubmitting(false);

    if (success) {
      showToast(
        editingReview
          ? "Review updated successfully."
          : "Review submitted successfully.",
        "success"
      );
      setModalOpen(false);
      setEditingReview(null);
    }
  };

  const handleDelete = async (review) => {
    if (!window.confirm("Delete this review? This can't be undone.")) return;

    const success = await removeReview(review._id);

    if (success) {
      showToast("Review deleted.", "success");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
          <p className="text-sm text-muted">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-28 sm:pt-32 pb-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="mb-10 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl text-ink">
              My Reviews
            </h1>
            <p className="text-muted mt-2">
              Manage and explore your travel experiences.
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-xl bg-forest text-white text-sm font-semibold hover:bg-forest-dark transition-colors"
          >
            + Write a Review
          </button>
        </div>

        {actionError && (
          <div className="mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {actionError}
          </div>
        )}

        <ReviewStats reviews={reviews} />

        <ReviewFilter
          search={search}
          setSearch={setSearch}
          rating={rating}
          setRating={setRating}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <ReviewList
          reviews={filteredReviews}
          onWriteReview={handleOpenCreate}
          currentUserId={user?.id}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      </div>

      <AddReviewModal
        isOpen={modalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        editingReview={editingReview}
        trips={completedTrips}
        submitting={submitting}
      />
    </div>
  );
};

export default ReviewPage;
