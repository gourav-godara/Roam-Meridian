import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function ImageSlider({ images, activeIndex, onChange }) {
  const goPrev = () => onChange((activeIndex - 1 + images.length) % images.length);
  const goNext = () => onChange((activeIndex + 1) % images.length);

  return (
    <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-mist">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <Link
        to="/explore"
        className="absolute top-5 left-5 z-10 flex items-center gap-2 text-white text-sm font-medium bg-black/25 backdrop-blur-sm px-3.5 py-2 rounded-full hover:bg-black/35 transition-colors"
      >
        <FiArrowLeft size={16} />
        Back to Explore
      </Link>

      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors"
      >
        <FiChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next image"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors"
      >
        <FiChevronRight size={18} />
      </button>
    </div>
  );
}

export default ImageSlider;
