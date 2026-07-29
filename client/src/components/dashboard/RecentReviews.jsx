import { FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";

function RecentReviews({ reviews = [] }) {
  return (
    <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">Recent Reviews</h2>

        {/* Was pointing at /profile/reviews, which isn't a registered
            route — the real reviews page is /reviews. */}
        <Link
          to="/reviews"
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
            // Field names below must match dashboard.service.js's
            // recentReviewsFormatted shape: _id, destinationName,
            // reviewText — a previous mismatch (id/review) meant these
            // never rendered and every card used an undefined React key.
            <div key={review._id} className="border rounded-2xl p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">
                  {review.destinationName || "Destination"}
                </h3>

                <div className="flex items-center gap-1 text-yellow-500">
                  <FiStar className="fill-yellow-400" />
                  {review.rating}
                </div>
              </div>

              <p className="mt-2 text-gray-600 line-clamp-2">
                {review.reviewText}
              </p>

              <p className="text-xs text-gray-400 mt-3">{review.createdAt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentReviews;
