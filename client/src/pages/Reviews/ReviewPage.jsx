import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";

import AddReviewModal from "../../components/review/AddReviewModal";
import useReview from "../../hooks/useReview";
import { deleteReview } from "../../services/reviewApi";

import ReviewStats from "../../components/review/ReviewStats";
import ReviewFilter from "../../components/review/ReviewFilter";
import ReviewList from "../../components/review/ReviewList";

const ReviewPage = () => {
  const {
    reviews,
    loading,
    error,
    refreshReviews,
  } = useReview();

  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const [openModal, setOpenModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const filteredReviews = useMemo(() => {
    let filtered = [...reviews];

    if (search) {
      filtered = filtered.filter((review) =>
        review.destination?.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (rating) {
      filtered = filtered.filter(
        (review) => review.rating >= Number(rating)
      );
    }

    if (sortBy === "highest") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "lowest") {
      filtered.sort((a, b) => a.rating - b.rating);
    } else {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    return filtered;
  }, [reviews, search, rating, sortBy]);

  // Create Review (temporary)
  const handleReviewSubmit = (reviewData) => {
    console.log("Review Submitted:", reviewData);

    setOpenModal(false);
    setEditingReview(null);

    // Backend integration will be added later
  };

  // Edit Review
  const handleEditReview = (review) => {
    setEditingReview(review);
    setOpenModal(true);
  };

  // Delete Review
  const handleDeleteReview = async (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {
      await deleteReview(reviewId);

      alert("Review deleted successfully.");

      refreshReviews();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to delete review."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading Reviews...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold">
              My Reviews
            </h1>

            <p className="text-gray-500 mt-2">
              Manage and explore your travel experiences.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingReview(null);
              setOpenModal(true);
            }}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl transition"
          >
            <FaPlus />
            Write Review
          </button>

        </div>

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
          onEdit={handleEditReview}
          onDelete={handleDeleteReview}
        />

      </div>

      <AddReviewModal
        isOpen={openModal}
        editingReview={editingReview}
        onClose={() => {
          setOpenModal(false);
          setEditingReview(null);
        }}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default ReviewPage;