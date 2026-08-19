import { useEffect, useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

const AddReviewModal = ({
  isOpen,
  onClose,
  onSubmit,
  editingReview,
  trips = [],
  submitting = false,
}) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [formError, setFormError] = useState("");
    const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    // Release the blob URL being discarded so repeated add/remove cycles
    // don't leak memory for the life of the page.
    URL.revokeObjectURL(previewImages[index]);

    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };
  // Previously editingReview was accepted as a prop but never actually
  // used to populate the form — clicking "Edit" opened a blank form
  // instead of the review's existing content.
  useEffect(() => {
    if (editingReview) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRating(editingReview.rating || 0);
      setReviewText(editingReview.reviewText || "");
      setItinerary(editingReview.itinerary?._id || editingReview.itinerary || "");
    } else {
      setRating(0);
      setReviewText("");
      setItinerary("");
    }
        // Editing an existing review only updates text/rating (images aren't
    // editable after the fact), so always clear any staged photo picks.
    previewImages.forEach((url) => URL.revokeObjectURL(url));
    setImages([]);
    setPreviewImages([]);
    setFormError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingReview, isOpen]);
    // Revoke any remaining preview URLs when the modal unmounts for good.
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (submitting) return;

    if (!rating) {
      setFormError("Please select a rating.");
      return;
    }

    if (!reviewText.trim()) {
      setFormError("Please write your review.");
      return;
    }

    if (!editingReview && !itinerary) {
      setFormError("Please select a trip.");
      return;
    }

    setFormError("");

    onSubmit({
      rating,
      reviewText,
      itinerary,
      images,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {editingReview ? "Edit Review" : "Write Review"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
            aria-label="Close"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {formError && (
          <div className="mb-5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
            {formError}
          </div>
        )}

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
              maxLength={1000}
            />
            <p className="text-xs text-gray-400 mt-1 text-right">
              {reviewText.length}/1000
            </p>
          </div>
                        {!editingReview && (
            <div>
              <label className="font-medium">Photos</label>

              {previewImages.length > 0 && (
                <div className="flex gap-3 flex-wrap mt-3">
                  {previewImages.map((image, index) => (
                    <div key={image} className="relative">
                      <img
                        src={image}
                        alt=""
                        className="w-20 h-20 rounded-xl object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 rounded-full text-xs leading-none"
                        aria-label="Remove photo"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="addReviewImages"
              />

              <label
                htmlFor="addReviewImages"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 mt-3 text-sm"
              >
                📷 Add Photos
              </label>
            </div>
          )}
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
              disabled={submitting}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting && <FiLoader className="animate-spin" size={16} />}
              {editingReview ? "Update Review" : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
