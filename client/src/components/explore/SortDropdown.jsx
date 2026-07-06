import { useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useEscapeKey } from "../../hooks/useEscapeKey";

const OPTIONS = ["Recommended", "Highest Rated", "Lowest Price", "Highest Price", "Most Popular"];

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false), open);
  useEscapeKey(() => setOpen(false), open);

  return (
    <div ref={ref} className="relative shrink-0">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-haspopup="listbox"
        className="flex items-center gap-2 px-4 sm:px-5 py-3 rounded-full bg-white border border-border text-sm text-ink shadow-sm hover:border-forest/40 transition-colors whitespace-nowrap">
        <span className="text-gray-500">Sort by:</span>
        <span className="font-medium">{value}</span>
        <FiChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul role="listbox" className="absolute right-0 z-20 mt-2 w-48 bg-white rounded-xl shadow-lg border border-border py-1.5">
          {OPTIONS.map((opt) => (
            <li key={opt}>
              <button type="button" role="option" aria-selected={value === opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  value === opt ? "text-forest font-semibold bg-forest/5" : "text-ink hover:bg-mist/60"
                }`}>
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SortDropdown;
