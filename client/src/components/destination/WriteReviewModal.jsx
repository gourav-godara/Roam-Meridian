import { useEffect, useState } from "react";
import { FiStar, FiX, FiLoader } from "react-icons/fi";

function WriteReviewModal({
  open,
  onClose,
  onSubmit,
  destinationId,
  submitting = false,
  error = "",
}) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    // Release the blob URL being discarded — previously these were never
    // revoked, so every add/remove cycle leaked memory for the life of
    // the page.
    URL.revokeObjectURL(previewImages[index]);

    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Revoke any remaining preview URLs when the modal unmounts/closes for
  // good, so nothing is left dangling.
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    previewImages.forEach((url) => URL.revokeObjectURL(url));
    setReview("");
    setRating(5);
    setImages([]);
    setPreviewImages([]);
  };

  const handleSubmit = () => {
    if (submitting) return;

    // Basic guard so an empty review never even reaches the network —
    // the parent also validates this, but failing fast here avoids a
    // round trip for an obviously incomplete form.
    if (!review.trim()) {
      return;
    }

    onSubmit({
      rating,
      reviewText: review,
      images,
      destinationId,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="absolute top-5 right-5"
          aria-label="Close"
        >
          <FiX size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Write Review</h2>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
            {error}
          </div>
        )}

        <div className="flex gap-2 mb-5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              aria-label={`Rate ${star} out of 5`}
              aria-pressed={star === rating}
            >
              <FiStar
                size={32}
                className={
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            </button>
          ))}
        </div>

        <textarea
          rows={5}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full border rounded-xl p-4"
          placeholder="Share your experience..."
          maxLength={1000}
        />
        <p className="text-xs text-gray-400 mt-1 text-right">
          {review.length}/1000
        </p>

        <div className="mt-5">
          <label className="block font-medium mb-2">Upload Photos</label>
          <div className="flex gap-3 flex-wrap mt-4">
            {previewImages.map((image, index) => (
              <div key={image} className="relative">
                <img
                  src={image}
                  alt=""
                  className="w-24 h-24 rounded-xl object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full"
                  aria-label="Remove photo"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="reviewImages"
          />

          <label
            htmlFor="reviewImages"
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 mt-4"
          >
            📷 Add Photos
          </label>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting || !review.trim()}
          className="mt-5 w-full py-3 rounded-xl bg-green-700 text-white flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting && <FiLoader className="animate-spin" size={18} />}
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}

export default WriteReviewModal;
