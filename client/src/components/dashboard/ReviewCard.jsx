import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div className="flex gap-4 border-b last:border-none pb-4 last:pb-0">
      <img
        src={review.image}
        alt={review.destination}
        className="w-20 h-20 rounded-xl object-cover"
      />

      <div className="flex-1">
        <h3 className="font-semibold">
          {review.destination}
        </h3>

        <div className="flex items-center gap-1 text-yellow-500 my-1">
          {[...Array(review.rating)].map((_, index) => (
            <FaStar key={index} />
          ))}
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">
          {review.review}
        </p>

        <p className="text-xs text-gray-400 mt-2">
          {review.createdAt}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;