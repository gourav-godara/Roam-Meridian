import { FiSearch } from "react-icons/fi";

function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2.5 shadow-sm">
      <FiSearch className="text-slate-400" size={16} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search destinations..."
        className="flex-1 outline-none text-sm placeholder:text-slate-400"
      />
    </div>
  );
}

export default SearchBar;
