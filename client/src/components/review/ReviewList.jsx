import ReviewCard from "./ReviewCard";
import EmptyReview from "./EmptyReview";

const ReviewList = ({
  reviews,
  onEdit,
  onDelete,
}) => {
  if (!reviews || reviews.length === 0) {
    return <EmptyReview />;
  }

  return (
    <div className="grid gap-6">
      {reviews.map((review) => (
        <ReviewCard
          key={review._id}
          review={review}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ReviewList;