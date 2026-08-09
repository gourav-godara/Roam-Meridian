import { motion } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi";
import Button from "../common/Button";

const EmptyReview = ({ onWriteReview }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-white/85 backdrop-blur-sm rounded-3xl border border-border p-12 text-center overflow-hidden"
    >
      {/* soft ambient glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-forest/10 blur-3xl" />

      <motion.div
        className="relative flex justify-center mb-5"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center">
          <FiMessageCircle size={26} className="text-forest" />
        </div>
      </motion.div>

      <h2 className="relative text-xl font-semibold text-ink font-display">
        No Reviews Yet
      </h2>

      <p className="relative text-sm text-gray-500 mt-2.5 max-w-sm mx-auto leading-relaxed">
        You haven't shared any travel experiences yet. Start exploring
        destinations and let the community know about your journey.
      </p>

      <motion.div
        className="relative inline-block mt-7"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        <Button
          variant="primary"
          onClick={onWriteReview}
          className="!rounded-full !px-7 !py-3"
        >
          Write Your First Review
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default EmptyReview;
