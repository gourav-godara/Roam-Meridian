import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCompass, FiArrowLeft } from "react-icons/fi";
import PageBackdrop from "../../components/common/PageBackdrop";

const NotFound = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <PageBackdrop variant="lost" />

      <div className="text-center max-w-md">
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-border bg-surface text-forest mb-6"
          animate={{ rotate: [0, 25, -15, 40, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiCompass size={28} />
        </motion.div>

        <p className="font-display text-6xl text-ink mb-2">404</p>
        <h1 className="font-display text-xl text-ink mb-2">
          You've wandered off the map
        </h1>
        <p className="text-muted text-sm mb-8">
          The page you're looking for doesn't exist, or may have moved.
          Let's get you back on route.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest text-white text-sm font-semibold hover:bg-forest-hover transition-colors"
        >
          <FiArrowLeft size={15} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;