import { motion } from "framer-motion";

function ThumbnailStrip({ images, activeIndex, onSelect }) {
  return (
    <div className="grid grid-cols-6 gap-2 mt-2">
      {images.slice(0, 6).map((src, i) => (
        <motion.button
          key={src}
          type="button"
          onClick={() => onSelect(i)}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.15 }}
          aria-label={`View image ${i + 1}`}
          aria-current={activeIndex === i}
          className={`rounded-xl overflow-hidden aspect-[4/3] border-2 transition-colors ${
            activeIndex === i ? "border-forest" : "border-transparent"
          }`}
        >
          <img src={src} alt="" className="w-full h-full object-cover" />
        </motion.button>
      ))}
    </div>
  );
}

export default ThumbnailStrip;
