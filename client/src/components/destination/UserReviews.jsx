import {
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
function UserReviews({ items, onWriteReview }) {
  const totalReviews = items.length;

  const averageRating =
    totalReviews > 0
      ? (
          items.reduce((sum, review) => sum + review.rating, 0) /
          totalReviews
        ).toFixed(1)
      : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: items.filter((review) => Math.round(review.rating) === star).length,
  }));

  const [viewerOpen, setViewerOpen] = useState(false);
const [viewerImages, setViewerImages] = useState([]);
const [viewerIndex, setViewerIndex] = useState(0);
const [sortBy, setSortBy] = useState("newest");
const openViewer = (images, index) => {
  setViewerImages(images);
  setViewerIndex(index);
  setViewerOpen(true);
};

const nextImage = () => {
  setViewerIndex((prev) => (prev + 1) % viewerImages.length);
};

const previousImage = () => {
  setViewerIndex(
    (prev) =>
      (prev - 1 + viewerImages.length) %
      viewerImages.length
  );
};
const sortedReviews = [...items].sort((a, b) => {
  switch (sortBy) {
    case "highest":
      return b.rating - a.rating;

    case "lowest":
      return a.rating - b.rating;

    case "oldest":
      return new Date(a.date) - new Date(b.date);

    default:
      return new Date(b.date) - new Date(a.date);
  }
});
useEffect(() => {
  if (!viewerOpen) return;

  const handleKey = (e) => {
    if (e.key === "Escape") setViewerOpen(false);

    if (e.key === "ArrowRight") nextImage();

    if (e.key === "ArrowLeft") previousImage();
  };

  window.addEventListener("keydown", handleKey);

  return () =>
    window.removeEventListener("keydown", handleKey);
}, [viewerOpen, viewerIndex]);

useEffect(() => {
  if (viewerOpen)
    document.body.style.overflow = "hidden";
  else
    document.body.style.overflow = "";

  return () => {
    document.body.style.overflow = "";
  };
}, [viewerOpen]);
  return (
    <section className="mt-12">

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Left Summary */}
        <div className="lg:w-72 shrink-0 bg-white border border-border rounded-2xl p-6">

          <div className="flex items-center gap-2">
            <FiStar className="fill-yellow-400 text-yellow-400" size={26} />
            <span className="text-4xl font-bold text-ink">
              {averageRating}
            </span>
          </div>

          <p className="text-gray-500 mt-2">
            Based on {totalReviews} review
            {totalReviews !== 1 ? "s" : ""}
          </p>

          <div className="mt-6 space-y-3">

            {ratingCounts.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-3">

                <span className="w-5 text-sm">
                  {star}
                </span>

                <FiStar
                  size={14}
                  className="fill-yellow-400 text-yellow-400"
                />

                <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-yellow-400"
                    style={{
                      width:
                        totalReviews === 0
                          ? "0%"
                          : `${(count / totalReviews) * 100}%`,
                    }}
                  />

                </div>

                <span className="text-sm text-gray-600 w-6 text-right">
                  {count}
                </span>

              </div>
            ))}

          </div>

        </div>

        {/* Reviews */}
        <div className="flex-1">

          <div className="flex justify-between items-center mb-5">

            <div className="flex justify-between items-center mb-5">

  <h3 className="text-xl font-semibold">
    User Reviews
  </h3>

  <div className="flex items-center gap-3">

    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="border rounded-xl px-3 py-2 text-sm"
    >
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="highest">Highest Rating</option>
      <option value="lowest">Lowest Rating</option>
    </select>

    <button
      onClick={onWriteReview}
      className="px-5 py-2 rounded-xl bg-forest text-white hover:bg-forest-hover"
    >
      Write Review
    </button>

  </div>

</div>
          </div>

          

{sortedReviews.length === 0 ? (

            <div className="bg-white rounded-2xl border border-border p-10 text-center text-gray-500">
              No reviews yet.
              <br />
              Be the first to share your experience!
            </div>

          ) : (

            <div className="space-y-5">

              {sortedReviews.map((review) => (

                <div
                  key={review.id}
                  className="bg-white border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div>

                        <h4 className="font-semibold">
                          {review.name}
                        </h4>

                        <p className="text-sm text-gray-500">
                          {review.date}
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-1 text-yellow-500 font-semibold">

                      <FiStar className="fill-yellow-400" />

                      {review.rating}

                    </div>

                  </div>

                  <p className="mt-4 leading-7 text-gray-700">
                    {review.text}
                  </p>
                {review.images?.length > 0 && (
  <div className="flex gap-2 flex-wrap mt-4">
    {review.images.map((img, index) => (
      <img
  key={index}
  src={`${import.meta.env.VITE_API_URL}${img}`}
  alt=""
  onClick={() =>
    openViewer(review.images, index)
  }
  className="w-24 h-24 object-cover rounded-xl cursor-pointer hover:scale-105 transition"
/>
    ))}
  </div>
)}
                </div>

              ))}

            </div>

          )}

        </div>

      </div>
          <AnimatePresence>
  {viewerOpen && (
    <motion.div
      className="fixed inset-0 bg-black/95 z-[300] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        onClick={() => setViewerOpen(false)}
        className="absolute top-6 right-6 text-white"
      >
        <FiX size={36} />
      </button>

      {viewerImages.length > 1 && (
        <button
          onClick={previousImage}
          className="absolute left-6 text-white"
        >
          <FiChevronLeft size={50} />
        </button>
      )}

      <motion.img
        key={viewerImages[viewerIndex]}
        src={`${import.meta.env.VITE_API_URL}${viewerImages[viewerIndex]}`}
        className="max-w-[90vw] max-h-[90vh] rounded-xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      />

      {viewerImages.length > 1 && (
        <button
          onClick={nextImage}
          className="absolute right-6 text-white"
        >
          <FiChevronRight size={50} />
        </button>
      )}

      <div className="absolute bottom-8 text-white">
        {viewerIndex + 1} / {viewerImages.length}
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </section>
  );
}

export default UserReviews;