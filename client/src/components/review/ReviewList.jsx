import ReviewCard from "./ReviewCard";
import EmptyReview from "./EmptyReview";

const ReviewList = ({ reviews, onWriteReview }) => {
  if (!reviews || reviews.length === 0) {
    return <EmptyReview onWriteReview={onWriteReview} />;
  }

  return (
    <div className="grid gap-4">
      {reviews.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
