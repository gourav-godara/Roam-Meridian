import { useEffect, useState } from "react";
import { FiArrowLeft, FiX, FiSearch } from "react-icons/fi";
import Button from "./Button";
import DestinationPopover from "./DestinationPopover";
import DatePopover from "./DatePopover";
import GuestPopover from "./GuestPopover";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { formatDateRange, formatGuestSummary } from "../../utils/searchFormatters";

const STEPS = ["destination", "dates", "guests"];

function MobileSearchSheet({ open, onClose, destination, setDestination, dates, setDates, guests, setGuests, onSearch, searching }) {
  const [step, setStep] = useState(0);
  const [entered, setEntered] = useState(false);

  useEscapeKey(onClose, open);

  useEffect(() => {
    if (open) {
      setStep(0);
      document.body.style.overflow = "hidden";
      const raf = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(raf);
    }
    setEntered(false);
    document.body.style.overflow = "";
  }, [open]);

  if (!open) return null;

  const stepKey = STEPS[step];
  const goNext = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const goBack = () => setStep((s) => Math.max(0, s - 1));
  const dateLabel = formatDateRange(dates.checkIn, dates.checkOut);
  const guestLabel = formatGuestSummary(guests);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className={`sm:hidden fixed inset-0 z-[100] bg-white flex flex-col transition-all duration-200 ${
        entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        {step > 0 ? (
          <button onClick={goBack} aria-label="Back" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-mist">
            <FiArrowLeft size={18} />
          </button>
        ) : (
          <span className="w-9" />
        )}
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <span key={s} className={`w-6 h-1.5 rounded-full ${i === step ? "bg-forest" : "bg-mist"}`} />
          ))}
        </div>
        <button onClick={onClose} aria-label="Close search" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-mist">
          <FiX size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        {stepKey === "destination" && (
          <>
            <p className="text-lg font-display font-semibold text-ink mb-4">Where to?</p>
            <DestinationPopover
              className="!shadow-none !border-0 !p-0 w-full"
              onSelect={(name) => { setDestination(name); goNext(); }}
            />
          </>
        )}
        {stepKey === "dates" && (
          <>
            <p className="text-lg font-display font-semibold text-ink mb-4">When are you going?</p>
            <DatePopover
              checkIn={dates.checkIn}
              checkOut={dates.checkOut}
              monthsToShow={1}
              onChange={(next) => { setDates(next); if (next.checkIn && next.checkOut) goNext(); }}
              className="!shadow-none !border-0 !p-0 w-full"
            />
          </>
        )}
        {stepKey === "guests" && (
          <>
            <p className="text-lg font-display font-semibold text-ink mb-4">Who's coming?</p>
            <GuestPopover guests={guests} onChange={setGuests} onDone={() => {}} className="!shadow-none !border-0 !p-0 w-full" />
          </>
        )}
      </div>

      <div className="border-t border-border px-4 py-4">
        <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
          <span className="truncate">{destination || "Anywhere"}</span>
          <span className="truncate">{dateLabel || "Any dates"}</span>
          <span className="truncate">{guestLabel || "Add guests"}</span>
        </div>
        {step < STEPS.length - 1 ? (
          <Button variant="primary" onClick={goNext} className="!w-full !rounded-full !py-3.5 !text-sm font-semibold">
            Next
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => { onSearch(); onClose(); }}
            disabled={searching}
            className="!w-full !rounded-full !py-3.5 !text-sm font-semibold flex items-center justify-center gap-2"
          >
            {searching ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <FiSearch size={16} />}
            Search
          </Button>
        )}
      </div>
    </div>
  );
}

export default MobileSearchSheet;
