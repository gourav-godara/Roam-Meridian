import { FiRefreshCw } from "react-icons/fi";

import DayAccordion from "./DayAccordion";

function ItineraryCard({
  plan,
  onRegenerateDay,
}) {
  const response = plan?.response || {};
  const days = Array.isArray(response.days) ? response.days : [];

  return (
    <article className="w-full min-w-0 max-w-full overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
      {/* Trip summary */}
      <header className="min-w-0 overflow-hidden bg-forest p-4 text-white sm:p-7">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65 sm:text-[11px] sm:tracking-[0.18em]">
            Your curated journey
          </p>

          <h3 className="mt-1 max-w-full break-words font-display text-xl leading-tight sm:text-3xl">
            {response.title || plan.title || "Your Trip"}
          </h3>

          <p className="mt-2 break-words text-xs leading-relaxed text-white/75 sm:text-sm">
            {plan.destination ||
              response.destination ||
              "Your destination"}
            {" · "}
            {plan.days || days.length}{" "}
            {Number(plan.days || days.length) === 1 ? "day" : "days"}
            {" · "}
            {plan.travelers || response.travelers || 1}{" "}
            {Number(plan.travelers || response.travelers || 1) === 1
              ? "traveler"
              : "travelers"}
          </p>
        </div>

        {/* Trip statistics */}
        <div className="mt-4 grid min-w-0 grid-cols-3 gap-2 sm:mt-6">
          <div className="min-w-0 rounded-xl bg-white/10 px-2.5 py-2 sm:px-3 sm:py-2.5">
            <p className="text-[9px] uppercase tracking-wide text-white/60 sm:text-[10px]">
              Budget
            </p>

            <p className="mt-0.5 truncate text-xs font-semibold sm:text-sm">
              ₹{Number(plan.budget || 0).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="min-w-0 rounded-xl bg-white/10 px-2.5 py-2 sm:px-3 sm:py-2.5">
            <p className="text-[9px] uppercase tracking-wide text-white/60 sm:text-[10px]">
              Weather
            </p>

            <p className="mt-0.5 truncate text-xs font-semibold sm:text-sm">
              {response.weather || "—"}
            </p>
          </div>

          <div className="min-w-0 rounded-xl bg-white/10 px-2.5 py-2 sm:px-3 sm:py-2.5">
            <p className="text-[9px] uppercase tracking-wide text-white/60 sm:text-[10px]">
              Best time
            </p>

            <p className="mt-0.5 truncate text-xs font-semibold sm:text-sm">
              {response.bestTime || "—"}
            </p>
          </div>
        </div>
      </header>

      {/* Days */}
      <div className="min-w-0 overflow-hidden p-3 sm:p-7">
        <div className="flex min-w-0 flex-col gap-2">
          {days.map((day) => (
            <DayAccordion
              key={day.day}
              day={day}
            />
          ))}
        </div>

        {/* Budget breakdown + local wisdom */}
        <div className="mt-5 grid min-w-0 gap-3 border-t border-border pt-4 sm:mt-6 sm:grid-cols-2 sm:pt-5">
          <div className="min-w-0 rounded-2xl bg-bg p-3 sm:p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted sm:text-[11px]">
              Budget breakdown
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-ink">
              <span className="min-w-0 break-words">
                Stay: ₹{response.budgetBreakdown?.stay || 0}
              </span>

              <span className="min-w-0 break-words">
                Food: ₹{response.budgetBreakdown?.food || 0}
              </span>

              <span className="min-w-0 break-words">
                Transport: ₹
                {response.budgetBreakdown?.transport || 0}
              </span>

              <span className="min-w-0 break-words">
                Activities: ₹
                {response.budgetBreakdown?.activities || 0}
              </span>
            </div>
          </div>

          <div className="min-w-0 rounded-2xl bg-forest/5 p-3 sm:p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-forest sm:text-[11px]">
              Local wisdom
            </p>

            <ul className="mt-3 space-y-2">
              {response.localTips?.slice(0, 3).map((tip) => (
                <li
                  key={tip}
                  className="flex min-w-0 gap-2 text-xs leading-relaxed text-ink"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />

                  <span className="min-w-0 break-words">
                    {tip}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Packing checklist */}
        {response.packingChecklist?.length > 0 && (
          <section className="mt-5 min-w-0">
            <p className="text-xs font-semibold text-ink">
              Pack for the journey
            </p>

            <div className="mt-3 flex min-w-0 flex-wrap gap-2">
              {response.packingChecklist.map((item) => (
                <span
                  key={item}
                  className="max-w-full break-words rounded-full border border-border bg-white px-3 py-1.5 text-xs text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Nearby attractions */}
        {response.nearbyAttractions?.length > 0 && (
          <section className="mt-5 min-w-0 overflow-hidden rounded-2xl bg-mist/50 p-3 sm:p-4">
            <p className="text-xs font-semibold text-ink">
              Worth adding nearby
            </p>

            <div className="mt-3 flex min-w-0 flex-wrap gap-2">
              {response.nearbyAttractions.map((place) => (
                <span
                  key={place}
                  className="max-w-full break-words rounded-full bg-white px-3 py-1.5 text-xs text-forest shadow-sm"
                >
                  {place}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Regeneration hint */}
        {onRegenerateDay && (
          <div className="mt-5 flex min-w-0 items-center gap-2 border-t border-border pt-4 text-[11px] text-gray-400 sm:mt-6 sm:text-xs">
            <FiRefreshCw
              className="shrink-0"
              size={13}
            />

            <span className="min-w-0 break-words">
              Open a day to regenerate it with a different idea.
            </span>
          </div>
        )}
      </div>
    </article>
  );
}

export default ItineraryCard;
