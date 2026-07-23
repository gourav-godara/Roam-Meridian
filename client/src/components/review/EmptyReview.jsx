import { FiMessageCircle } from "react-icons/fi";
import Button from "../common/Button";

const EmptyReview = ({ onWriteReview }) => {
  return (
    <div className="bg-white rounded-3xl border border-border p-12 text-center">
      <div className="flex justify-center mb-5">
        <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center">
          <FiMessageCircle size={26} className="text-forest" />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-ink font-display">
        No Reviews Yet
      </h2>

      <p className="text-sm text-gray-500 mt-2.5 max-w-sm mx-auto leading-relaxed">
        You haven't shared any travel experiences yet. Start exploring
        destinations and let the community know about your journey.
      </p>

      <Button
        variant="primary"
        onClick={onWriteReview}
        className="!rounded-full !px-7 !py-3 !mt-7"
      >
        Write Your First Review
      </Button>
    </div>
  );
};

export default EmptyReview;
