import { FiSearch, FiSliders } from "react-icons/fi";
import SortDropdown from "./SortDropdown";

function SearchToolbar({ query, onQueryChange, sort, onSortChange, onOpenFilters }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <div className="flex items-center gap-3 flex-1 bg-white rounded-full shadow-sm border border-border px-5 py-3">
        <FiSearch size={18} className="text-gray-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search destinations..."
          className="w-full text-sm outline-none placeholder:text-gray-400"
        />
      </div>
      <div className="flex items-center gap-3">
        <SortDropdown value={sort} onChange={onSortChange} />
        <button
          type="button"
          onClick={onOpenFilters}
          aria-label="Open filters"
          className="lg:hidden w-[46px] h-[46px] rounded-2xl bg-forest text-white flex items-center justify-center shrink-0 hover:bg-forest-dark transition-colors shadow-sm"
        >
          <FiSliders size={18} />
        </button>
      </div>
    </div>
  );
}

export default SearchToolbar;
