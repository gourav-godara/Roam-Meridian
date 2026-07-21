import { useState } from "react";
import { FaStar } from "react-icons/fa";

const AddReviewModal = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Please select a rating.");
      return;
    }

    if (!reviewText.trim()) {
      alert("Please write your review.");
      return;
    }

    onSubmit({
      rating,
      reviewText,
    });

    setRating(0);
    setReviewText("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-lg p-8">

        <h2 className="text-2xl font-bold mb-6">
          Write Review
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="font-medium">
              Rating
            </label>

            <div className="flex gap-2 mt-3">

              {[1,2,3,4,5].map((star)=>(
                <FaStar
                  key={star}
                  onClick={()=>setRating(star)}
                  className={`cursor-pointer text-3xl ${
                    star<=rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}

            </div>

          </div>

          <div>

            <label className="font-medium">
              Review
            </label>

            <textarea
              rows={5}
              value={reviewText}
              onChange={(e)=>setReviewText(e.target.value)}
              className="w-full border rounded-xl mt-2 p-3 resize-none"
              placeholder="Share your experience..."
            />

          </div>

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-xl"
            >
              Submit Review
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddReviewModal;