import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiMapPin, FiSend, FiSliders } from "react-icons/fi";
import Button from "../common/Button";

function MessageInput({
  value,
  onChange,
  onSend,
  disabled,
  tripParams,
  onTripParamsChange,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 144)}px`;
  }, [value]);

  const handleSend = () => {
    if (!value.trim() || disabled) return;

    onSend(value.trim());
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const updateParam = (key, nextValue) => {
    onTripParamsChange({
      ...tripParams,
      [key]: nextValue,
    });
  };

  return (
    <div className="border-t border-border bg-white px-4 py-4 sm:px-6">
      {showDetails && (
        <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
          <label className="col-span-2 rounded-xl border border-border bg-bg px-3 py-2 sm:col-span-1">
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted">
              Destination
            </span>

            <input
              value={tripParams.destination}
              onChange={(event) =>
                updateParam("destination", event.target.value)
              }
              className="mt-0.5 w-full bg-transparent text-sm text-ink outline-none"
            />
          </label>

          <label className="rounded-xl border border-border bg-bg px-3 py-2">
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted">
              Days
            </span>

            <input
              type="number"
              min="1"
              value={tripParams.days}
              onChange={(event) =>
                updateParam("days", Number(event.target.value))
              }
              className="mt-0.5 w-full bg-transparent text-sm text-ink outline-none"
            />
          </label>

          <label className="rounded-xl border border-border bg-bg px-3 py-2">
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted">
              Budget (₹)
            </span>

            <input
              type="number"
              min="0"
              value={tripParams.budget}
              onChange={(event) =>
                updateParam("budget", Number(event.target.value))
              }
              className="mt-0.5 w-full bg-transparent text-sm text-ink outline-none"
            />
          </label>

          <label className="rounded-xl border border-border bg-bg px-3 py-2">
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted">
              Travelers
            </span>

            <input
              type="number"
              min="1"
              value={tripParams.travelers}
              onChange={(event) =>
                updateParam("travelers", Number(event.target.value))
              }
              className="mt-0.5 w-full bg-transparent text-sm text-ink outline-none"
            />
          </label>

          <label className="rounded-xl border border-border bg-bg px-3 py-2">
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted">
              Style
            </span>

            <select
              value={tripParams.travelStyle}
              onChange={(event) =>
                updateParam("travelStyle", event.target.value)
              }
              className="mt-0.5 w-full bg-transparent text-sm text-ink outline-none"
            >
              <option>Balanced</option>
              <option>Budget</option>
              <option>Luxury</option>
              <option>Adventure</option>
              <option>Relaxed</option>
            </select>
          </label>
        </div>
      )}

      <div className="flex items-end gap-2 rounded-2xl border border-border bg-bg px-3 py-2 transition-all focus-within:border-forest/40 focus-within:ring-4 focus-within:ring-forest/5">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me to plan a trip, refine an idea, or find inspiration..."
          rows={1}
          className="max-h-36 flex-1 resize-none bg-transparent py-1.5 text-sm outline-none placeholder:text-gray-400"
        />

        <Button
          variant="primary"
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="!h-9 !w-9 !rounded-full !p-0 shrink-0"
        >
          <FiSend size={14} />
        </Button>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 px-1">
        <button
          type="button"
          onClick={() => setShowDetails((isOpen) => !isOpen)}
          className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-forest"
        >
          <FiSliders size={13} />
          Trip details
          <FiChevronDown
            size={12}
            className={
              showDetails
                ? "rotate-180 transition-transform"
                : "transition-transform"
            }
          />
        </button>

        <span className="hidden items-center gap-1 text-[11px] text-gray-400 sm:inline-flex">
          <FiMapPin size={11} />
          {tripParams.destination} · {tripParams.days} days · ₹
          {tripParams.budget.toLocaleString("en-IN")}
        </span>

        <span className="text-[11px] text-gray-400">Enter to send</span>
      </div>
    </div>
  );
}

export default MessageInput;
