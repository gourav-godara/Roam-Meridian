import { FiStar, FiMessageCircle, FiHeart, FiCamera } from "react-icons/fi";

const ReviewStats = ({ reviews = [] }) => {
  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(
          1,
        )
      : "0.0";

  const totalLikes = reviews.reduce((sum, r) => sum + (r.likes || 0), 0);
  const reviewsWithPhotos = reviews.filter((r) => r.images?.length > 0).length;

  const stats = [
    { title: "Average Rating", value: averageRating, icon: FiStar },
    { title: "Total Reviews", value: totalReviews, icon: FiMessageCircle },
    { title: "Total Likes", value: totalLikes, icon: FiHeart },
    { title: "With Photos", value: reviewsWithPhotos, icon: FiCamera },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map(({ title, value, icon: Icon }) => (
        <div
          key={title}
          className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-shadow"
        >
          <div className="w-11 h-11 rounded-xl bg-forest/10 flex items-center justify-center mb-4">
            <Icon size={19} className="text-forest" />
          </div>
          <p className="text-xs text-gray-500">{title}</p>
          <h2 className="text-2xl font-semibold text-ink mt-1 font-display">
            {value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ReviewStats;
