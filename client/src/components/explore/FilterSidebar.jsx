import FilterSection from "./FilterSection";
import CategoryFilter from "./CategoryFilter";
import BudgetSlider from "./BudgetSlider";
import RatingDropdown from "./RatingDropdown";
import Button from "../common/Button";

function FilterSidebar({ filters, onChange, onApply, onClear }) {
  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="sticky top-28 bg-white rounded-3xl shadow-sm border border-border p-6">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-base font-semibold text-ink">Filters</h2>
          <button type="button" onClick={onClear} className="text-xs text-gray-500 hover:text-forest transition-colors">
            Clear all
          </button>
        </div>

        <FilterSection title="Categories">
          <CategoryFilter selected={filters.categories} onChange={(categories) => onChange({ ...filters, categories })} />
        </FilterSection>

        <FilterSection title="Budget">
          <BudgetSlider value={filters.budget} onChange={(budget) => onChange({ ...filters, budget })} />
        </FilterSection>

        <FilterSection title="Rating">
          <RatingDropdown value={filters.rating} onChange={(rating) => onChange({ ...filters, rating })} />
        </FilterSection>

        <Button variant="primary" onClick={onApply} className="!w-full !rounded-full !py-3 mt-5 hover:!scale-[1.02] transition-transform">
          Apply Filters
        </Button>
      </div>
    </aside>
  );
}

export default FilterSidebar;
