import { FiSearch, FiPlus, FiChevronDown } from "react-icons/fi";

const ExpenseFilters = ({
  onAddExpense,
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
}) => {
  return (
    <div className="bg-surface rounded-2xl border border-border p-4 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        <div className="relative w-full lg:w-1/3">
          <FiSearch
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search expenses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border text-sm outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40 transition-colors"
          />
        </div>

        <div className="relative w-full lg:w-52">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full appearance-none px-4 py-2.5 rounded-xl border border-border text-sm outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40 transition-colors bg-surface"
          >
            <option value="All">All Categories</option>
            <option value="Accommodation">Accommodation</option>
            <option value="Transport">Transport</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Activities">Activities</option>
            <option value="Other">Other</option>
          </select>
          <FiChevronDown
            size={14}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        <div className="relative w-full lg:w-44">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full appearance-none px-4 py-2.5 rounded-xl border border-border text-sm outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40 transition-colors bg-surface"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Settled">Settled</option>
          </select>
          <FiChevronDown
            size={14}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        <button
          onClick={onAddExpense}
          className="w-full lg:w-auto flex items-center justify-center gap-2 bg-forest hover:bg-forest-hover text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors shrink-0 shadow-sm hover:shadow-hover"
        >
          <FiPlus size={16} />
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default ExpenseFilters;