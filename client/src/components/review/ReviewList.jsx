import ReviewCard from "./ReviewCard";
import EmptyReview from "./EmptyReview";

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <EmptyReview />;
  }

  return (
    <div className="grid gap-6">
      {reviews.map((review) => (
        <ReviewCard
          key={review._id}
          review={review}
        />
      ))}
    </div>
  );
};

export default ReviewList;