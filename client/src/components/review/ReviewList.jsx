import ReviewCard from "./ReviewCard";
import EmptyReview from "./EmptyReview";

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
    <div className="grid gap-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review._id}
          review={review}
          currentUserId={currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ReviewList;

