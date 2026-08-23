import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

function DayAccordion({
  day,
  onRegenerate,
  regenerating = false,
}) {
  const [open, setOpen] = useState(day.day === 1);

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-border bg-white">
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-expanded={open}
        className="flex w-full min-w-0 items-center justify-between gap-3 px-3 py-3.5 text-left transition-colors hover:bg-bg sm:gap-4 sm:px-5 sm:py-4"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-forest text-xs font-bold text-white sm:h-9 sm:w-9">
            {day.day}
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted sm:text-[11px]">
              Day {day.day}
            </p>

            <h4 className="break-words text-sm font-semibold leading-tight text-ink sm:truncate">
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
            className="min-w-0 overflow-hidden"
          >
            <div className="min-w-0 border-t border-border px-3 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
              {day.arrival && (
                <div className="mb-4 min-w-0 rounded-xl bg-bg px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                    Arrival note
                  </p>

                  <p className="mt-1 break-words text-xs leading-relaxed text-ink sm:text-sm">
                    {day.arrival}
                  </p>
                </div>
              )}

              {day.activities?.length > 0 && (
                <div className="min-w-0 border-l-2 border-forest/20 pl-3 sm:pl-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                    Today's journey
                  </p>

                  <div className="mt-3 min-w-0 space-y-4">
                    {day.activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="relative min-w-0"
                      >
                        <span className="absolute -left-[18px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-forest sm:-left-[21px]" />

                        <div className="flex min-w-0 items-start justify-between gap-2">
                          <p className="min-w-0 break-words text-xs font-medium leading-relaxed text-ink sm:text-sm">
                            {activity.title}
                          </p>

                          {activity.estimatedCost > 0 && (
                            <span className="shrink-0 text-[11px] font-semibold text-forest sm:text-xs">
                              ₹
                              {Number(
                                activity.estimatedCost
                              ).toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>

                        <p className="mt-0.5 break-words text-[11px] leading-relaxed text-muted sm:text-xs">
                          {activity.startTime &&
                            `${activity.startTime} · `}
                          {activity.duration}
                          {activity.category &&
                            ` · ${activity.category}`}
                        </p>

                        {activity.description && (
                          <p className="mt-1 break-words text-[11px] leading-relaxed text-gray-500 sm:text-xs">
                            {activity.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-2">
                {day.restaurants?.length > 0 && (
                  <div className="min-w-0 overflow-hidden rounded-xl bg-mist/50 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                      Eat local
                    </p>

                    <p className="mt-1 break-words text-xs leading-relaxed text-ink">
                      {day.restaurants.join(" · ")}
                    </p>
                  </div>
                )}

                {day.stay && (
                  <div className="min-w-0 overflow-hidden rounded-xl bg-mist/50 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                      Stay
                    </p>

                    <p className="mt-1 break-words text-xs leading-relaxed text-ink">
                      {day.stay}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-3 flex min-w-0 items-center justify-between gap-3 px-1">
                <div />

                <p className="shrink-0 text-xs font-semibold text-forest sm:text-sm">
                  Estimated: ₹
                  {Number(day.estimatedCost || 0).toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>

              {onRegenerate && (
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => onRegenerate(day.day)}
                    disabled={regenerating}
                    className="rounded-full border border-border px-3 py-1.5 text-[11px] font-medium text-muted transition hover:border-forest/30 hover:text-forest disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {regenerating
                      ? "Regenerating..."
                      : "Regenerate day"}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DayAccordion;
