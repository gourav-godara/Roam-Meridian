import { useState } from "react";
import { FiStar, FiX } from "react-icons/fi";

function WriteReviewModal({
    open,
    onClose,
    onSubmit,
    destinationId,
}) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [images, setImages] = useState([]);
const [previewImages, setPreviewImages] = useState([]);

const handleImageChange = (e) => {
  const files = Array.from(e.target.files);

  setImages((prev) => [...prev, ...files]);

  const previews = files.map((file) =>
    URL.createObjectURL(file)
  );

  setPreviewImages((prev) => [...prev, ...previews]);
};

const removeImage = (index) => {
  setImages((prev) =>
    prev.filter((_, i) => i !== index)
  );

  setPreviewImages((prev) =>
    prev.filter((_, i) => i !== index)
  );
};
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5"
        >
          <FiX size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          Write Review
        </h2>

        <div className="flex gap-2 mb-5">
          {[1,2,3,4,5].map((star)=>(
            <button
              key={star}
              onClick={()=>setRating(star)}
            >
              <FiStar
                size={32}
                className={
                  star<=rating
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
          onChange={(e)=>setReview(e.target.value)}
          className="w-full border rounded-xl p-4"
          placeholder="Share your experience..."
        />
          <div className="mt-5">
  <label className="block font-medium mb-2">
    Upload Photos
  </label>
            <div className="flex gap-3 flex-wrap mt-4">

  {previewImages.map((image, index) => (

    <div key={index} className="relative">

      <img
        src={image}
        alt=""
        className="w-24 h-24 rounded-xl object-cover"
      />

      <button
        onClick={() => removeImage(index)}
        className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full"
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
    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
  >
    📷 Add Photos
  </label>
</div>
        <button
  onClick={() => {
    onSubmit({
    rating,
    reviewText: review,
    images,
    destinationId,
});

    setReview("");
    setRating(5);
    setImages([]);
    setPreviewImages([]);
  }}
  className="mt-5 w-full py-3 rounded-xl bg-green-700 text-white"
>
  Submit Review
</button>

      </div>

    </div>
  );
}

export default WriteReviewModal;