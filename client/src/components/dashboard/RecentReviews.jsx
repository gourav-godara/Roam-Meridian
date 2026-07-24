import { FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";

function RecentReviews({ reviews = [] }) {
  return (
    <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">
          Recent Reviews
        </h2>

        <Link
          to="/profile/reviews"
          className="text-sm text-green-700 font-medium hover:underline"
        >
          View All
        </Link>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            You haven't reviewed any destination yet.
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Reviews help other travellers.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border rounded-2xl p-4"
            >
              <div className="flex justify-between items-center">

                <h3 className="font-semibold">
                  {review.destinationName ||
                    review.destination?.name}
                </h3>

                <div className="flex items-center gap-1 text-yellow-500">
                  <FiStar className="fill-yellow-400" />
                  {review.rating}
                </div>

              </div>

              <p className="mt-2 text-gray-600 line-clamp-2">
                {review.reviewText}
              </p>

              <p className="text-xs text-gray-400 mt-3">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentReviews;