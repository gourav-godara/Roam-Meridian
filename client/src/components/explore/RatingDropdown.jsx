import { useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useEscapeKey } from "../../hooks/useEscapeKey";

const OPTIONS = [
  { value: 4.5, label: "4.5 & above" },
  { value: 4.0, label: "4.0 & above" },
  { value: 3.5, label: "3.5 & above" },
  { value: 0, label: "Any rating" },
];

function RatingDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false), open);
  useEscapeKey(() => setOpen(false), open);

  const current = OPTIONS.find((o) => o.value === value) || OPTIONS[3];

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-haspopup="listbox"
        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-border text-sm text-ink hover:border-forest/40 transition-colors">
        {current.label}
        <FiChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul role="listbox" className="absolute z-20 mt-2 w-full bg-white rounded-xl shadow-lg border border-border py-1.5">
          {OPTIONS.map((opt) => (
            <li key={opt.value}>
              <button type="button" role="option" aria-selected={value === opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-3.5 py-2 text-sm transition-colors ${
                  value === opt.value ? "text-forest font-semibold bg-forest/5" : "text-ink hover:bg-mist/60"
                }`}>
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RatingDropdown;
