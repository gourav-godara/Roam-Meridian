import { FaRegCommentDots } from "react-icons/fa";

const EmptyReview = () => {
  return (
    <div className="bg-white rounded-3xl shadow-md p-12 text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center">
          <FaRegCommentDots className="text-4xl text-teal-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800">
        No Reviews Yet
      </h2>

      <p className="text-gray-500 mt-3 max-w-md mx-auto">
        You haven't shared any travel experiences yet.
        Start exploring destinations and let the community
        know about your journey.
      </p>

      <button
        className="
          mt-8
          bg-teal-500
          hover:bg-teal-600
          text-white
          px-8
          py-3
          rounded-xl
          transition
        "
      >
        Write Your First Review
      </button>
    </div>
  );
};

export default EmptyReview;