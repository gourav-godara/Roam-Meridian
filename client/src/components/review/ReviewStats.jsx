import {
  FaStar,
  FaRegCommentDots,
  FaHeart,
  FaCamera,
} from "react-icons/fa";

const ReviewStats = ({ reviews = [] }) => {
  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / totalReviews
        ).toFixed(1)
      : "0.0";

  const totalLikes = reviews.reduce(
    (sum, review) => sum + (review.likes || 0),
    0
  );

  const reviewsWithPhotos = reviews.filter(
    (review) => review.images?.length > 0
  ).length;

  const stats = [
    {
      title: "Average Rating",
      value: averageRating,
      icon: <FaStar />,
      color: "bg-yellow-500",
    },
    {
      title: "Total Reviews",
      value: totalReviews,
      icon: <FaRegCommentDots />,
      color: "bg-blue-500",
    },
    {
      title: "Total Likes",
      value: totalLikes,
      icon: <FaHeart />,
      color: "bg-red-500",
    },
    {
      title: "With Photos",
      value: reviewsWithPhotos,
      icon: <FaCamera />,
      color: "bg-teal-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6"
        >
          <div
            className={`${stat.color} w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl mb-5`}
          >
            {stat.icon}
          </div>

          <p className="text-gray-500 text-sm">
            {stat.title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-gray-800">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ReviewStats;