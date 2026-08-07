import { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import DayAccordion from "./DayAccordion";

function ItineraryCard({
  plan,
  onRegenerateDay,
}) {
  const [regeneratingDay, setRegeneratingDay] = useState(null);

  const handleRegenerateDay = async (dayNumber) => {
    setRegeneratingDay(dayNumber);

    await onRegenerateDay(plan._id, dayNumber);

    setRegeneratingDay(null);
  };

  const handleCopy = async () => {
    const itineraryText = [
      plan.response.title,
      `${plan.days} days · ₹${plan.budget.toLocaleString("en-IN")}`,
      "",
      ...plan.response.days.map((day) => `Day ${day.day}: ${day.title}`),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(itineraryText);
    } catch {
      // Copy may be unavailable in some browsers.
    }
  };

  return (
    <article className="max-w-3xl overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
      <header className="bg-forest p-5 text-white sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
              Your curated journey
            </p>

            <h3 className="mt-1 font-display text-2xl sm:text-3xl">
              {plan.response.title}
            </h3>

            <p className="mt-2 text-sm text-white/75">
              {plan.destination} · {plan.days} days · {plan.travelers} traveler
              {plan.travelers > 1 ? "s" : ""}
            </p>
          </div>

        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-white/10 px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-wide text-white/60">
              Budget
            </p>
            <p className="mt-0.5 text-sm font-semibold">
              ₹{plan.budget.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="rounded-xl bg-white/10 px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-wide text-white/60">
              Weather
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold">
              {plan.response.weather || "—"}
            </p>
          </div>

          <div className="rounded-xl bg-white/10 px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-wide text-white/60">
              Best time
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold">
              {plan.response.bestTime || "—"}
            </p>
          </div>
        </div>
      </header>

      <div className="p-5 sm:p-7">

        <div className="flex flex-col gap-2">
          {plan.response.days.map((day) => (
            <DayAccordion
              key={day.day}
              day={day}
              onRegenerate={handleRegenerateDay}
              regenerating={regeneratingDay === day.day}
            />
          ))}
        </div>

        <div className="mt-6 grid gap-3 border-t border-border pt-5 sm:grid-cols-2">
          <div className="rounded-2xl bg-bg p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
              Budget breakdown
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-ink">
              <span>Stay: ₹{plan.response.budgetBreakdown?.stay || 0}</span>
              <span>Food: ₹{plan.response.budgetBreakdown?.food || 0}</span>
              <span>
                Transport: ₹{plan.response.budgetBreakdown?.transport || 0}
              </span>
              <span>
                Activities: ₹{plan.response.budgetBreakdown?.activities || 0}
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-forest/5 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-forest">
              Local wisdom
            </p>

            <ul className="mt-3 space-y-2">
              {plan.response.localTips?.slice(0, 3).map((tip) => (
                <li
                  key={tip}
                  className="flex gap-2 text-xs leading-relaxed text-ink"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {plan.response.packingChecklist?.length > 0 && (
          <section className="mt-5">
            <p className="text-xs font-semibold text-ink">
              Pack for the journey
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {plan.response.packingChecklist.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-white px-3 py-1.5 text-xs text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        )}

        {plan.response.nearbyAttractions?.length > 0 && (
          <section className="mt-5 rounded-2xl bg-mist/50 p-4">
            <p className="text-xs font-semibold text-ink">
              Worth adding nearby
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {plan.response.nearbyAttractions.map((place) => (
                <span
                  key={place}
                  className="rounded-full bg-white px-3 py-1.5 text-xs text-forest shadow-sm"
                >
                  {place}
                </span>
              ))}
            </div>
          </section>
        )}

        <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-xs text-gray-400">
          <FiRefreshCw size={13} />
          Open a day to regenerate it with a different idea.
        </div>
      </div>
    </article>
  );
}

export default ItineraryCard;
