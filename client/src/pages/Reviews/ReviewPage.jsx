import { useMemo, useState } from "react";
import useReview from "../../hooks/useReview";

import ReviewStats from "../../components/review/ReviewStats";
import ReviewFilter from "../../components/review/ReviewFilter";
import ReviewList from "../../components/review/ReviewList";

const ReviewPage = () => {
  const { reviews, loading, error } = useReview();

  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("");
  const [sortBy, setSortBy] = useState("latest");

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
        <div className="mb-10">
          <h1 className="font-display text-3xl sm:text-4xl text-ink">
            My Reviews
          </h1>
          <p className="text-muted mt-2">
            Manage and explore your travel experiences.
          </p>
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
          onWriteReview={() => alert("Review form coming soon!")}
        />
      </div>
    </div>
  );
};

export default ReviewPage;
