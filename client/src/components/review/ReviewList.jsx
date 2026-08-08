import { AnimatePresence, motion } from "framer-motion";
import ReviewCard from "./ReviewCard";
import EmptyReview from "./EmptyReview";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const ReviewList = ({
  reviews,
  onWriteReview,
  currentUserId,
  onEdit,
  onDelete,
}) => {
  if (!reviews || reviews.length === 0) {
    return <EmptyReview onWriteReview={onWriteReview} />;
  }

  return (
    <motion.div
      layout
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid gap-4"
    >
      <AnimatePresence mode="popLayout">
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            currentUserId={currentUserId}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ReviewList;
