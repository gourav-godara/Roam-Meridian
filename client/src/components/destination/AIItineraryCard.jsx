import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiRefreshCw } from "react-icons/fi";
import Button from "../common/Button";

function AIItineraryCard({ itinerary, onRegenerate }) {
  const [expandedDay, setExpandedDay] = useState(1);
  const [regenerating, setRegenerating] = useState(false);

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => setRegenerating(false), 1200);
    onRegenerate?.();
  };

  return (
    <div className="mt-10 bg-white rounded-3xl border border-border p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
        <div>
          <h3 className="text-base font-semibold text-ink">AI Suggested 3-Day Itinerary</h3>
          <p className="text-xs text-gray-500 mt-0.5">Personalized by Roam Meridian's AI Planner</p>
        </div>
        <Button
          variant="outline"
          onClick={handleRegenerate}
          disabled={regenerating}
          className="!rounded-full !py-2 !px-4 !text-xs flex items-center gap-2"
        >
          <FiRefreshCw size={13} className={regenerating ? "animate-spin" : ""} />
          {regenerating ? "Generating..." : "Generate New Plan"}
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {itinerary.days.map((day) => {
          const isOpen = expandedDay === day.day;
          return (
            <div key={day.day} className="border border-border rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setExpandedDay(isOpen ? null : day.day)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-mist/40 transition-colors"
              >
                <span className="text-sm font-semibold text-ink">Day {day.day}: {day.title}</span>
                <FiChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <ul className="px-4 pb-4 pt-1 flex flex-col gap-1.5">
                      {day.items.map((item, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AIItineraryCard;
