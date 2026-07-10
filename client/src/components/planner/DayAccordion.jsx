import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiRefreshCw } from "react-icons/fi";

function DayAccordion({ day, onRegenerate, regenerating }) {
  const [open, setOpen] = useState(day.day === 1);

  return (
    <div className="border border-border rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-mist/40 transition-colors"
      >
        <span className="text-sm font-semibold text-ink">Day {day.day}: {day.title}</span>
        <FiChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 flex flex-col gap-3 text-sm">
              {day.arrival && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Arrival</p>
                  <p className="text-ink mt-0.5">{day.arrival}</p>
                </div>
              )}
              {day.activities?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Activities</p>
                  <ul className="mt-1 flex flex-col gap-1">
                    {day.activities.map((a, i) => (
                      <li key={i} className="flex items-center gap-2 text-ink">
                        <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {day.restaurants?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Restaurants</p>
                  <p className="text-ink mt-0.5">{day.restaurants.join(", ")}</p>
                </div>
              )}
              {day.stay && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Stay</p>
                  <p className="text-ink mt-0.5">{day.stay}</p>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-sm font-semibold text-forest">₹{day.estimatedCost?.toLocaleString("en-IN")}</span>
                <button
                  type="button"
                  onClick={() => onRegenerate(day.day)}
                  disabled={regenerating}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-forest transition-colors disabled:opacity-50"
                >
                  <FiRefreshCw size={12} className={regenerating ? "animate-spin" : ""} />
                  Regenerate this day
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DayAccordion;
