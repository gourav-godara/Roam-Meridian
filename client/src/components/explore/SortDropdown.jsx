function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-sm border border-slate-200 rounded-full px-4 py-2.5 bg-white outline-none text-slate-600"
    >
      <option value="recommended">Recommended</option>
      <option value="price-low">Price: low to high</option>
      <option value="price-high">Price: high to low</option>
      <option value="rating">Rating: high to low</option>
    </select>
  );
}

export default SortDropdown;
