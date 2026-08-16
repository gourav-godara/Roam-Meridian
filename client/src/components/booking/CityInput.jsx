import { useEffect, useRef, useState } from "react";

function CityInput({ label, value, onChange, cities = [], placeholder }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const filtered = value
    ? cities.filter((c) => c.toLowerCase().includes(value.toLowerCase()))
    : cities;

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-xs font-medium text-muted mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40"
      />

      {open && filtered.length > 0 && (
        <div className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto rounded-xl border border-border bg-white shadow-lg">
          {filtered.slice(0, 8).map((city) => (
            <button
              type="button"
              key={city}
              onClick={() => {
                onChange(city);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 border-b border-border last:border-0"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CityInput;
