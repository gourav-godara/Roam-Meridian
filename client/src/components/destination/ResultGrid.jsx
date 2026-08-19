import { useState } from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

function ResultGrid({
  title,
  items = [],
  initialCount = 4,
  priceKey,
  subLabelKey,
  onItemClick,
}) {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? items : items.slice(0, initialCount);
  const hasMore = items.length > initialCount;

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold text-ink mb-5">
        {title}
      </h3>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">
          No results found nearby.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {visible.map((item, index) => (
            <motion.article
              key={item.id || `${item.name}-${index}`}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={() => onItemClick?.(item)}
              className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md cursor-pointer flex flex-col"
            >
              {item.image && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name || item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-4 flex flex-col flex-1">
                <h4 className="text-sm font-semibold text-ink">
                  {item.name || item.title || "Unknown Place"}
                </h4>

                <p className="text-xs text-gray-500 mt-1">
                  {subLabelKey
                    ? item[subLabelKey]
                    : item.address || ""}
                </p>

                <div className="flex items-center justify-between mt-auto pt-2">
                  {item.rating !== undefined && (
                    <span className="flex items-center gap-1 text-xs font-medium text-ink">
                      <FiStar
                        size={12}
                        className="fill-gold text-gold"
                      />
                      {item.rating}
                    </span>
                  )}

                  {priceKey && item[priceKey] && (
                    <span className="text-sm font-semibold text-forest">
                      {item[priceKey]}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (item.latitude && item.longitude) {
                      const url = `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`;
                      window.open(url, "_blank", "noopener,noreferrer");
                    }
                    onItemClick?.(item);
                  }}
                  className="w-full rounded-xl bg-forest text-white py-2 hover:bg-forest-hover transition text-sm font-medium mt-3"
                >
                  Open in Google Maps
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-5 text-sm font-semibold text-forest hover:underline"
        >
          {expanded
            ? "Show less"
            : `View more (${items.length - initialCount} more)`}
        </button>
      )}
    </div>
  );
}

export default ResultGrid;