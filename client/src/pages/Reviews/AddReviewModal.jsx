import { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";

const AddReviewModal = ({
  isOpen,
  onClose,
  onSubmit,
  editingReview,
  trips = [],
}) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [itinerary, setItinerary] = useState("");



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

    if (!editingReview && !itinerary) {
      alert("Please select a trip.");
      return;
    }

    onSubmit({
      rating,
      reviewText,
      itinerary,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {editingReview ? "Edit Review" : "Write Review"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trip — locked once editing, since a review is tied to one trip */}
          <div>
            <label className="font-medium">Trip</label>

            <select
              value={itinerary}
              onChange={(e) => setItinerary(e.target.value)}
              disabled={!!editingReview}
              className="w-full border rounded-xl mt-2 p-3 disabled:bg-gray-100"
            >
              <option value="">Select a completed trip</option>

              {trips.map((trip) => (
                <option key={trip._id} value={trip._id}>
                  {trip.title}
                </option>
              ))}
            </select>

            {trips.length === 0 && !editingReview && (
              <p className="text-sm text-gray-500 mt-2">
                You can only review a trip once it's marked completed.
              </p>
            )}
          </div>

          <div>
            <label className="font-medium">Rating</label>

            <div className="flex gap-2 mt-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer text-3xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="font-medium">Review</label>

            <textarea
              rows={5}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
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
              {editingReview ? "Update Review" : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;