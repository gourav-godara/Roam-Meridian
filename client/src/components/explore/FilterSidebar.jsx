const categories = ["Beach", "Mountains", "Heritage", "Adventure"];

function FilterSidebar({ selectedCategory, onSelectCategory }) {
  return (
    <div className="w-full md:w-56 shrink-0">
      <p className="text-sm font-medium text-ink mb-3">Category</p>
      <div className="flex flex-col gap-1">
        <button
          onClick={() => onSelectCategory(null)}
          className={`text-left text-sm px-3 py-2 rounded-lg ${
            selectedCategory === null ? "bg-forest text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`text-left text-sm px-3 py-2 rounded-lg ${
              selectedCategory === category ? "bg-forest text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterSidebar;
