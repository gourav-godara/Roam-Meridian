function SearchField({ icon: Icon, label, value, placeholder, onClick, active, showDivider = true }) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`flex flex-col justify-center text-left flex-1 min-w-0 px-5 sm:px-7 h-full rounded-2xl transition-colors ${
          active ? "bg-mist/70" : "hover:bg-mist/40"
        }`}
      >
        <span className="text-[11px] sm:text-xs font-semibold text-ink flex items-center gap-1.5">
          {Icon && <Icon size={14} className="text-forest shrink-0" />}
          {label}
        </span>
        <span className={`text-sm sm:text-[15px] truncate ${value ? "text-ink" : "text-gray-400"}`}>
          {value || placeholder}
        </span>
      </button>
      {showDivider && <span className="hidden md:block w-px h-8 bg-border self-center shrink-0" />}
    </>
  );
}

export default SearchField;
