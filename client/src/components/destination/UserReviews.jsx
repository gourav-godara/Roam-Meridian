import { FiStar } from "react-icons/fi";

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

            <h3 className="text-xl font-semibold">
              User Reviews
            </h3>

            <button
  onClick={onWriteReview}
  className="px-5 py-2 rounded-xl bg-green-700 text-white hover:bg-green-800 transition"
>
  Write Review
</button>

          </div>

          {items.length === 0 ? (

            <div className="bg-white rounded-2xl border border-border p-10 text-center text-gray-500">
              No reviews yet.
              <br />
              Be the first to share your experience!
            </div>

          ) : (

            <div className="space-y-5">

              {items.map((review) => (

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
        className="w-24 h-24 object-cover rounded-xl"
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

    </section>
  );
}

export default UserReviews;