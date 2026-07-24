import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function ImageSlider({ images, activeIndex, onChange }) {
  const goPrev = () => onChange((activeIndex - 1 + images.length) % images.length);
  const goNext = () => onChange((activeIndex + 1) % images.length);
  const [fullscreen, setFullscreen] = useState(false);

useEffect(() => {
  const handleKeyDown = (e) => {
    if (!fullscreen) return;

    if (e.key === "Escape") {
      setFullscreen(false);
    }

    if (e.key === "ArrowRight") {
      goNext();
    }

    if (e.key === "ArrowLeft") {
      goPrev();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => window.removeEventListener("keydown", handleKeyDown);
}, [fullscreen, activeIndex]);
  return (
    <>
    <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-mist">
      <AnimatePresence mode="wait">
        <motion.img
  onClick={() => setFullscreen(true)}
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 w-full h-full object-cover cursor-zoom-in"
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
    <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setFullscreen(false)}
              className="absolute top-6 right-6 text-white text-4xl"
            >
              ×
            </button>

            <button
              onClick={goPrev}
              className="absolute left-6 text-white text-5xl"
            >
              ❮
            </button>

            <motion.img
              key={images[activeIndex]}
              src={images[activeIndex]}
              alt=""
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
            />

            <button
              onClick={goNext}
              className="absolute right-6 text-white text-5xl"
            >
              ❯
            </button>

            <div className="absolute bottom-6 text-white text-sm">
              {activeIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ImageSlider;
