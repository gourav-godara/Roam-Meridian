import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import FilterSection from "./FilterSection";
import CategoryFilter from "./CategoryFilter";
import BudgetSlider from "./BudgetSlider";
import RatingDropdown from "./RatingDropdown";
import Button from "../common/Button";
import { useEscapeKey } from "../../hooks/useEscapeKey";

function MobileFilterDrawer({ open, filters, onChange, onApply, onClear, onClose }) {
  useEscapeKey(onClose, open);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Filters" className="lg:hidden fixed inset-0 z-[100] bg-white flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-base font-semibold text-ink">Filters</h2>
        <button type="button" onClick={onClose} aria-label="Close filters" className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-mist transition-colors">
          <FiX size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-2">
        <FilterSection title="Categories">
          <CategoryFilter selected={filters.categories} onChange={(categories) => onChange({ ...filters, categories })} />
        </FilterSection>
        <FilterSection title="Budget">
          <BudgetSlider value={filters.budget} onChange={(budget) => onChange({ ...filters, budget })} />
        </FilterSection>
        <FilterSection title="Rating">
          <RatingDropdown value={filters.rating} onChange={(rating) => onChange({ ...filters, rating })} />
        </FilterSection>
      </div>

      <div className="px-5 py-4 border-t border-border" style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}>
        <div className="flex gap-3">
          <button type="button" onClick={onClear} className="px-5 py-3 rounded-full border border-border text-sm font-medium text-ink hover:bg-mist transition-colors">
            Clear all
          </button>
          <Button variant="primary" onClick={() => { onApply(); onClose(); }} className="!flex-1 !rounded-full !py-3">
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MobileFilterDrawer;
