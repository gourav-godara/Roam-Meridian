import { useState } from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

function ResultGrid({ title, items, initialCount = 4, priceKey, subLabelKey }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, initialCount);
  const hasMore = items.length > initialCount;

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold text-ink mb-5">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {visible.map((item) => (
          <motion.article
            key={item.id}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md cursor-pointer flex flex-col"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src={item.image} alt={item.name || item.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h4 className="text-sm font-semibold text-ink truncate">{item.name || item.title}</h4>
              <p className="text-xs text-gray-500 mt-0.5 truncate">{item[subLabelKey]}</p>
              <div className="flex items-center justify-between mt-auto pt-2">
                {"rating" in item && (
                  <span className="flex items-center gap-1 text-xs font-medium text-ink">
                    <FiStar size={12} className="fill-gold text-gold" />
                    {item.rating}
                  </span>
                )}
                {priceKey && item[priceKey] && (
                  <span className="text-sm font-semibold text-forest">{item[priceKey]}</span>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-5 text-sm font-semibold text-forest hover:underline"
        >
          {expanded ? "Show less" : `View more (${items.length - initialCount} more)`}
        </button>
      )}
    </div>
  );
}

export default ResultGrid;
