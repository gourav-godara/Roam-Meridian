import { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="py-4 border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-sm font-semibold text-ink"
        aria-expanded={open}
      >
        {title}
        {open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export default FilterSection;
