import { FiStar, FiThumbsUp, FiEdit2, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";

const ReviewCard = ({ review, currentUserId, onEdit, onDelete }) => {
  const isOwner =
    !currentUserId ||
    !review.user?._id ||
    review.user._id === currentUserId;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-lg font-semibold text-ink font-display">
            {review.destination?.name || "Travel Review"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            By {review.user?.name || "Anonymous"}
          </p>
        </div>
        <span className="text-xs text-gray-400 shrink-0">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="flex items-center gap-1 mt-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            size={15}
            className={
              star <= review.rating ? "fill-gold text-gold" : "text-gray-300"
            }
          />
        ))}
      </div>

      <p className="mt-3 text-sm text-ink leading-relaxed">
        {review.reviewText}
      </p>

      {review.images?.length > 0 && (
        <div className="flex gap-2.5 mt-4 overflow-x-auto">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Review"
              className="w-20 h-20 rounded-xl object-cover shrink-0"
            />
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-5 pt-4 border-t border-border">
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <FiThumbsUp size={13} />
          {review.likes || 0} Likes
        </span>

        <div className="flex items-center gap-3">
          {review.isEdited && (
            <span className="text-xs text-forest font-medium">Edited</span>
          )}

          {/* Edit/delete were previously nowhere in the UI, even though
              the backend fully supports both with ownership checks. */}
          {isOwner && (onEdit || onDelete) && (
            <div className="flex items-center gap-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(review)}
                  className="text-xs text-gray-500 hover:text-forest flex items-center gap-1"
                  aria-label="Edit review"
                >
                  <FiEdit2 size={13} />
                </button>
              )}

              {onDelete && (
                <button
                  onClick={() => onDelete(review)}
                  className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1"
                  aria-label="Delete review"
                >
                  <FiTrash2 size={13} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
