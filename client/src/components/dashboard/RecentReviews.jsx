import ReviewCard from "./ReviewCard";

const RecentReviews = ({ reviews = [] }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Recent Reviews
        </h2>

        {reviews.length > 0 && (
          <button className="text-teal-600 hover:underline">
            View All
          </button>
        )}
      </div>

      {reviews.length === 0 ? (
        <p className="text-gray-500">
          No reviews yet.
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentReviews;