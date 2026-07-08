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

    // Search
    if (search) {
      filtered = filtered.filter((review) =>
        review.destination?.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Rating
    if (rating) {
      filtered = filtered.filter(
        (review) => review.rating >= Number(rating)
      );
    }

    // Sort
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

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            My Reviews
          </h1>

          <p className="text-gray-500 mt-2">
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

        <ReviewList reviews={filteredReviews} />

      </div>

    </div>
  );
};

export default ReviewPage;