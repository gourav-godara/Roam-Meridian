import {
  FaStar,
  FaRegStar,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ReviewCard = ({
  review,
  onEdit,
  onDelete,
}) => {
  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const isOwner =
    currentUser?.id === review.user?._id;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="
        bg-white
        rounded-2xl
        shadow-md
        hover:shadow-xl
        p-6
        transition-all
      "
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {review.destination?.name || "Travel Review"}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            By {review.user?.name || "Anonymous"}
          </p>
        </div>

        <span className="text-xs text-gray-400">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-4 text-yellow-500">
        {[1, 2, 3, 4, 5].map((star) =>
          star <= review.rating ? (
            <FaStar key={star} />
          ) : (
            <FaRegStar key={star} />
          )
        )}
      </div>

      {/* Review */}
      <p className="mt-4 text-gray-600 leading-relaxed">
        {review.reviewText}
      </p>

      {/* Images */}
      {review.images?.length > 0 && (
        <div className="flex gap-3 mt-5 overflow-x-auto">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Review"
              className="w-24 h-24 rounded-xl object-cover"
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t">

        <div className="flex items-center gap-3">

          <span className="text-sm text-gray-500">
            👍 {review.likes || 0} Likes
          </span>

          {review.isEdited && (
            <span className="text-xs text-blue-500">
              Edited
            </span>
          )}

        </div>

        {isOwner && (
          <div className="flex gap-3">

            <button
              onClick={() => onEdit(review)}
              className="
                p-2
                rounded-lg
                text-blue-600
                hover:bg-blue-50
                transition
              "
            >
              <FaEdit />
            </button>

            <button
              onClick={() => onDelete(review._id)}
              className="
                p-2
                rounded-lg
                text-red-600
                hover:bg-red-50
                transition
              "
            >
              <FaTrash />
            </button>

          </div>
        )}

      </div>
    </motion.div>
  );
};

export default ReviewCard;