import { FaSearch, FaPlus } from "react-icons/fa";

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
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">

      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

        {/* Search */}
        <div className="relative w-full lg:w-1/3">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
  type="text"
  placeholder="Search expenses..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
/>

        </div>

        {/* Category Filter */}
        <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full lg:w-52 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
>
          <option value="All">All Categories</option>
          <option value="Accommodation">Accommodation</option>
<option value="Transport">Transport</option>
<option value="Food">Food</option>
<option value="Shopping">Shopping</option>
<option value="Activities">Activities</option>
<option value="Other">Other</option>
        </select>

        {/* Status Filter */}
        <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  className="w-full lg:w-44 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
>
          <option value="All">All Status</option>
<option value="Pending">Pending</option>
<option value="Settled">Settled</option>
        </select>

        {/* Add Expense Button */}
        <button onClick={onAddExpense}
          className="
            w-full
            lg:w-auto
            flex
            items-center
            justify-center
            gap-2
            bg-teal-600
            hover:bg-teal-700
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          <FaPlus />

          Add Expense
        </button>

      </div>

    </div>
  );
};

export default ExpenseFilters;