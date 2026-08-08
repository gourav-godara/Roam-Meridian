import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import useReview from "../../hooks/useReview";
import useAuth from "../../hooks/useAuth";
import { getTrips } from "../../services/tripApi";
import { useToast } from "../../context/ToastContext";

import ReviewStats from "../../components/review/ReviewStats";
import ReviewFilter from "../../components/review/ReviewFilter";
import ReviewList from "../../components/review/ReviewList";
import ReviewBackdrop from "../../components/review/ReviewBackdrop";
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
      <div className="relative min-h-screen flex items-center justify-center">
        <ReviewBackdrop />
        <div className="flex flex-col items-center gap-3">
          <motion.div
            className="w-9 h-9 border-2 border-forest/20 border-t-forest rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-sm text-muted"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading reviews...
          </motion.p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <ReviewBackdrop />
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-600 text-sm bg-white/80 backdrop-blur-sm border border-red-200 rounded-xl px-4 py-3"
        >
          {error}
        </motion.p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-28 sm:pt-32 pb-16">
      <ReviewBackdrop />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex items-start justify-between gap-4 flex-wrap"
        >
          <div>
            <h1 className="font-display text-3xl sm:text-4xl text-ink">
              My Reviews
            </h1>
            <p className="text-muted mt-2">
              Manage and explore your travel experiences.
            </p>
          </div>

          <motion.button
            onClick={handleOpenCreate}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 rounded-xl bg-forest text-white text-sm font-semibold hover:bg-forest-dark transition-colors shadow-sm hover:shadow-lg hover:shadow-forest/20"
          >
            + Write a Review
          </motion.button>
        </motion.div>

        {actionError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
          >
            {actionError}
          </motion.div>
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
