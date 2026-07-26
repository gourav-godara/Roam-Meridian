import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiRefreshCw } from "react-icons/fi";

function DayAccordion({ day, onRegenerate, regenerating }) {
  const [open, setOpen] = useState(day.day === 1);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-bg sm:px-5"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-forest text-xs font-bold text-white">
            {day.day}
          </span>

          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
              Day {day.day}
            </p>

            <h4 className="truncate text-sm font-semibold text-ink">
              {day.title}
            </h4>
          </div>
        </div>

        <FiChevronDown
          size={17}
          className={
            open
              ? "shrink-0 rotate-180 text-forest transition-transform"
              : "shrink-0 text-muted transition-transform"
          }
        />
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
            <div className="border-t border-border px-4 pb-5 pt-4 sm:px-5">
              {day.arrival && (
                <div className="mb-4 rounded-xl bg-bg px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                    Arrival note
                  </p>

                  <p className="mt-1 text-sm text-ink">{day.arrival}</p>
                </div>
              )}

              {day.activities?.length > 0 && (
                <div className="border-l-2 border-forest/20 pl-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                    Today's journey
                  </p>

                  <div className="mt-3 space-y-4">
                    {day.activities.map((activity) => (
                      <div key={activity.id} className="relative">
                        <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-forest" />

                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-ink">
                            {activity.title}
                          </p>
                          {activity.estimatedCost > 0 && (
                            <span className="text-xs font-semibold text-forest shrink-0">
                              ₹{activity.estimatedCost}
                            </span>
                          )}
                        </div>

                        <p className="mt-0.5 text-xs text-muted">
                          {activity.startTime && `${activity.startTime} · `}
                          {activity.duration}
                          {activity.category && ` · ${activity.category}`}
                        </p>

                        {activity.description && (
                          <p className="mt-1 text-xs text-gray-500">
                            {activity.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {day.restaurants?.length > 0 && (
                  <div className="rounded-xl bg-mist/50 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                      Eat local
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-ink">
                      {day.restaurants.join(" · ")}
                    </p>
                  </div>
                )}

                {day.stay && (
                  <div className="rounded-xl bg-mist/50 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                      Stay
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-ink">
                      {day.stay}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                <p className="text-sm font-semibold text-forest">
                  Estimated: ₹{day.estimatedCost?.toLocaleString("en-IN") || 0}
                </p>

                <button
                  type="button"
                  onClick={() => onRegenerate(day.day)}
                  disabled={regenerating}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition-colors hover:text-forest disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FiRefreshCw
                    size={13}
                    className={regenerating ? "animate-spin" : ""}
                  />
                  Try another version
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
