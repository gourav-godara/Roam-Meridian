import { useMemo, useState } from "react";

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function buildMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

function MonthGrid({ year, month, today, checkIn, checkOut, hoverDate, onHover, onSelect }) {
  const cells = useMemo(() => buildMonthGrid(year, month), [year, month]);
  const monthLabel = new Date(year, month, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const previewEnd = checkIn && !checkOut && hoverDate && hoverDate > checkIn ? hoverDate : null;

  return (
    <div className="w-full sm:w-64">
      <p className="text-sm font-semibold text-ink text-center mb-3">{monthLabel}</p>
      <div className="grid grid-cols-7 gap-y-1 text-center">
        {DAY_LABELS.map((d) => (
          <span key={d} className="text-[11px] text-gray-400 font-medium py-1">{d}</span>
        ))}
        {cells.map((date, i) => {
          if (!date) return <span key={i} />;
          const isPast = date < today;
          const isToday = date.getTime() === today.getTime();
          const isCheckIn = checkIn && date.getTime() === checkIn.getTime();
          const isCheckOut = checkOut && date.getTime() === checkOut.getTime();
          const isEndpoint = isCheckIn || isCheckOut;
          const inRange =
            (checkIn && checkOut && date > checkIn && date < checkOut) ||
            (previewEnd && date > checkIn && date < previewEnd);

          return (
            <button
              key={i}
              type="button"
              disabled={isPast}
              onMouseEnter={() => onHover(date)}
              onClick={() => onSelect(date)}
              aria-label={date.toDateString()}
              className={[
                "h-9 text-sm rounded-full transition-colors",
                isPast ? "text-gray-300 cursor-not-allowed" : "text-ink hover:bg-mist",
                isEndpoint ? "bg-forest text-white hover:bg-forest-dark" : "",
                inRange && !isEndpoint ? "bg-forest/10" : "",
                isToday && !isEndpoint ? "border border-forest" : "",
              ].join(" ")}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DatePopover({ checkIn, checkOut, onChange, monthsToShow = 2, className = "" }) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [hoverDate, setHoverDate] = useState(null);

  const handleSelect = (date) => {
    if (!checkIn || (checkIn && checkOut) || date < checkIn) {
      onChange({ checkIn: date, checkOut: null });
    } else {
      onChange({ checkIn, checkOut: date });
    }
  };

  const goPrev = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const goNext = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const months = Array.from({ length: monthsToShow }, (_, i) => {
    const d = new Date(viewDate.getFullYear(), viewDate.getMonth() + i, 1);
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-border p-5 w-full sm:w-auto ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <button type="button" onClick={goPrev} aria-label="Previous month" className="w-8 h-8 rounded-full hover:bg-mist flex items-center justify-center text-ink">‹</button>
        <button type="button" onClick={goNext} aria-label="Next month" className="w-8 h-8 rounded-full hover:bg-mist flex items-center justify-center text-ink">›</button>
      </div>
      <div className="flex flex-col sm:flex-row gap-6" onMouseLeave={() => setHoverDate(null)}>
        {months.map(({ year, month }) => (
          <MonthGrid
            key={`${year}-${month}`}
            year={year}
            month={month}
            today={today}
            checkIn={checkIn}
            checkOut={checkOut}
            hoverDate={hoverDate}
            onHover={setHoverDate}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default DatePopover;
