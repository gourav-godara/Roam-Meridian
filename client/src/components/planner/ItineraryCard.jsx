import { useState } from "react";
import { FiHeart, FiCopy, FiSave, FiPrinter } from "react-icons/fi";
import DayAccordion from "./DayAccordion";
import Button from "../common/Button";

function ItineraryCard({ plan, onRegenerateDay, onSave, onFavorite, onDuplicate }) {
  const [regeneratingDay, setRegeneratingDay] = useState(null);

  const handleRegenerate = async (dayNumber) => {
    setRegeneratingDay(dayNumber);
    await onRegenerateDay(plan._id, dayNumber);
    setRegeneratingDay(null);
  };

  const handlePrint = () => window.print();

  return (
    <div className="bg-white border border-border rounded-3xl p-5 max-w-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl text-ink">{plan.response.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {plan.days} Days · ₹{plan.budget.toLocaleString("en-IN")} · {plan.travelers} Traveler{plan.travelers > 1 ? "s" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onFavorite(plan._id)}
          aria-label="Favorite"
          className="shrink-0 w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-mist transition-colors"
        >
          <FiHeart size={15} className={plan.favorite ? "fill-red-500 text-red-500" : "text-ink"} />
        </button>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {plan.response.days.map((day) => (
          <DayAccordion
            key={day.day}
            day={day}
            onRegenerate={handleRegenerate}
            regenerating={regeneratingDay === day.day}
          />
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-5 pt-5 border-t border-border">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Budget</p>
          <p className="text-sm font-semibold text-forest mt-0.5">₹{plan.response.totalBudget?.toLocaleString("en-IN")}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Best Time</p>
          <p className="text-sm text-ink mt-0.5">{plan.response.bestTime}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Weather</p>
          <p className="text-sm text-ink mt-0.5">{plan.response.weather}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Budget Breakdown</p>
          <p className="text-sm text-ink mt-0.5">
            Stay ₹{plan.response.budgetBreakdown?.stay} · Food ₹{plan.response.budgetBreakdown?.food} · Transport ₹{plan.response.budgetBreakdown?.transport} · Activities ₹{plan.response.budgetBreakdown?.activities}
          </p>
        </div>
      </div>

      {plan.response.packingChecklist?.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Packing Checklist</p>
          <div className="flex flex-wrap gap-1.5">
            {plan.response.packingChecklist.map((item, i) => (
              <span key={i} className="text-xs bg-mist/60 text-ink rounded-full px-2.5 py-1">{item}</span>
            ))}
          </div>
        </div>
      )}

      {plan.response.localTips?.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Local Tips</p>
          <ul className="flex flex-col gap-1">
            {plan.response.localTips.map((tip, i) => (
              <li key={i} className="text-sm text-ink flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0 mt-1.5" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {plan.response.emergencyNumbers?.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Emergency Numbers</p>
          <div className="flex flex-wrap gap-3">
            {plan.response.emergencyNumbers.map((e) => (
              <span key={e.label} className="text-xs text-ink">{e.label}: <strong>{e.number}</strong></span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-border">
        <Button variant="primary" onClick={() => onSave(plan._id)} className="!text-xs !py-2 !px-4 flex items-center gap-1.5">
          <FiSave size={13} /> Save Plan
        </Button>
        <Button variant="ghost" onClick={() => onDuplicate(plan._id)} className="!text-xs !py-2 !px-4 flex items-center gap-1.5">
          <FiCopy size={13} /> Duplicate
        </Button>
        <Button variant="ghost" onClick={handlePrint} className="!text-xs !py-2 !px-4 flex items-center gap-1.5">
          <FiPrinter size={13} /> Export PDF
        </Button>
      </div>
    </div>
  );
}

export default ItineraryCard;
