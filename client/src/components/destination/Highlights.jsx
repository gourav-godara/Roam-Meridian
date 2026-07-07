import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiWind, FiStar } from "react-icons/fi";
import { PiSnowflakeBold, PiMountainsBold, PiPersonSimpleRunBold, PiForkKnifeBold, PiShoppingBagBold } from "react-icons/pi";

const ICON_MAP = {
  "Snow Activities": PiSnowflakeBold,
  "Scenic Views": PiMountainsBold,
  "Adventure Sports": PiPersonSimpleRunBold,
  "Local Food": PiForkKnifeBold,
  "Shopping": PiShoppingBagBold,
};

function Highlights({ items, places }) {
  const [active, setActive] = useState(null);
  const activePlaces = active ? places?.[active] || [] : [];

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-ink mb-4">Highlights</h3>

      <div className="flex flex-wrap gap-x-8 gap-y-3">
        {items.map((item) => {
          const Icon = ICON_MAP[item] || FiWind;
          const isActive = active === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setActive(isActive ? null : item)}
              className={`flex items-center gap-2 text-sm font-medium rounded-full px-1 py-1 transition-colors ${
                isActive ? "text-forest" : "text-ink hover:text-forest"
              }`}
            >
              <Icon size={18} className="text-forest" />
              {item}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {activePlaces.length === 0 && (
                <p className="text-sm text-gray-500">No specific spots listed yet for this.</p>
              )}
              {activePlaces.map((place) => (
                <div key={place.id} className="flex items-center gap-3 bg-mist/40 rounded-xl p-2.5">
                  <img src={place.image} alt={place.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">{place.name}</p>
                    <p className="text-xs text-gray-500">{place.distance}</p>
                    <span className="flex items-center gap-1 text-xs text-ink mt-0.5">
                      <FiStar size={11} className="fill-gold text-gold" />
                      {place.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Highlights;
