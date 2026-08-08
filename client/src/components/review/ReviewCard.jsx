import { FiStar, FiThumbsUp, FiEdit2, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.2 },
  },
};

const ReviewCard = ({ review, currentUserId, onEdit, onDelete }) => {
  const isOwner =
    !currentUserId ||
    !review.user?._id ||
    review.user._id === currentUserId;

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative bg-white/85 backdrop-blur-sm rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl hover:border-forest/20 transition-shadow duration-300 overflow-hidden group"
    >
      {/* hover accent glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-forest/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* left accent bar that grows in on hover */}
      <motion.span
        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold to-forest origin-top"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative flex justify-between items-start gap-4">
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

      <div className="relative flex items-center gap-1 mt-3">
        {[1, 2, 3, 4, 5].map((star, i) => (
          <motion.span
            key={star}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.25, ease: "backOut" }}
          >
            <FiStar
              size={15}
              className={
                star <= review.rating ? "fill-gold text-gold" : "text-gray-300"
              }
            />
          </motion.span>
        ))}
      </div>

      <p className="relative mt-3 text-sm text-ink leading-relaxed">
        {review.reviewText}
      </p>

      {review.images?.length > 0 && (
        <div className="relative flex gap-2.5 mt-4 overflow-x-auto">
          {review.images.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt="Review"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.2 }}
              className="w-20 h-20 rounded-xl object-cover shrink-0 cursor-pointer"
            />
          ))}
        </div>
      )}

      <div className="relative flex justify-between items-center mt-5 pt-4 border-t border-border">
        <motion.span
          whileTap={{ scale: 0.92 }}
          className="flex items-center gap-1.5 text-xs text-gray-500 cursor-default"
        >
          <FiThumbsUp size={13} />
          {review.likes || 0} Likes
        </motion.span>

        <div className="flex items-center gap-3">
          {review.isEdited && (
            <span className="text-xs text-forest font-medium">Edited</span>
          )}

          {isOwner && (onEdit || onDelete) && (
            <div className="flex items-center gap-2">
              {onEdit && (
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(review)}
                  className="text-xs text-gray-500 hover:text-forest flex items-center gap-1"
                  aria-label="Edit review"
                >
                  <FiEdit2 size={13} />
                </motion.button>
              )}

              {onDelete && (
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete(review)}
                  className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1"
                  aria-label="Delete review"
                >
                  <FiTrash2 size={13} />
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
