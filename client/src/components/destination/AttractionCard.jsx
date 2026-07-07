import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

function AttractionCard({ attraction }) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md cursor-pointer"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img src={attraction.image} alt={attraction.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-3.5">
        <h4 className="text-sm font-semibold text-ink truncate">{attraction.name}</h4>
        <p className="text-xs text-gray-500 mt-0.5">{attraction.distance}</p>
        <span className="flex items-center gap-1 text-xs font-medium text-ink mt-1.5">
          <FiStar size={12} className="fill-gold text-gold" />
          {attraction.rating}
        </span>
      </div>
    </motion.article>
  );
}

export default AttractionCard;
