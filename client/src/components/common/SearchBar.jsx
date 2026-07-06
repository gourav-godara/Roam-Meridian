import { useRef, useState } from "react";
import { FiMapPin, FiCalendar, FiUsers, FiSearch } from "react-icons/fi";
import Button from "./Button";
import SearchField from "./SearchField";
import AnimatedPanel from "./AnimatedPanel";
import DestinationPopover from "./DestinationPopover";
import DatePopover from "./DatePopover";
import GuestPopover from "./GuestPopover";
import MobileSearchSheet from "./MobileSearchSheet";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { formatDateRange, formatGuestSummary } from "../../utils/searchFormatters";

const DEFAULT_GUESTS = { adults: 1, children: 0, infants: 0, pets: 0 };

function SearchBar() {
  const [panel, setPanel] = useState(null); // 'destination' | 'dates' | 'guests' | null
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState({ checkIn: null, checkOut: null });
  const [guests, setGuests] = useState(DEFAULT_GUESTS);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searching, setSearching] = useState(false);

  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setPanel(null), !!panel);
  useEscapeKey(() => setPanel(null), !!panel);

  const handleSearch = () => {
    setSearching(true);
    // TODO: wire to real search/navigation once a destinations search endpoint exists
    setTimeout(() => setSearching(false), 1200);
  };

  const dateLabel = formatDateRange(dates.checkIn, dates.checkOut);
  const guestLabel = formatGuestSummary(guests);

  return (
    <>
      {/* Desktop / tablet */}
      <div ref={containerRef} className="relative hidden sm:block w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg flex items-stretch h-[72px] px-1.5">
          <SearchField
            icon={FiMapPin}
            label="Where to?"
            placeholder="Search destinations"
            value={destination}
            active={panel === "destination"}
            onClick={() => setPanel(panel === "destination" ? null : "destination")}
          />
          <SearchField
            icon={FiCalendar}
            label="Dates"
            placeholder="Add dates"
            value={dateLabel}
            active={panel === "dates"}
            onClick={() => setPanel(panel === "dates" ? null : "dates")}
          />
          <SearchField
            icon={FiUsers}
            label="Guests"
            placeholder="Add guests"
            value={guestLabel}
            active={panel === "guests"}
            showDivider={false}
            onClick={() => setPanel(panel === "guests" ? null : "guests")}
          />
          <div className="flex items-center pr-1.5 pl-2">
            <Button
              variant="primary"
              onClick={handleSearch}
              disabled={searching}
              className="!rounded-xl !px-6 !py-3.5 !text-sm font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all disabled:opacity-70"
            >
              {searching ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Searching
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <FiSearch size={16} />
                  Search
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="absolute top-full left-0 mt-3 z-30">
          <AnimatedPanel show={panel === "destination"}>
            <DestinationPopover
              onSelect={(name) => {
                setDestination(name);
                setPanel("dates");
              }}
            />
          </AnimatedPanel>
        </div>

        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-30">
          <AnimatedPanel show={panel === "dates"}>
            <DatePopover
              checkIn={dates.checkIn}
              checkOut={dates.checkOut}
              monthsToShow={2}
              onChange={(next) => {
                setDates(next);
                if (next.checkIn && next.checkOut) setPanel("guests");
              }}
            />
          </AnimatedPanel>
        </div>

        <div className="absolute top-full right-0 mt-3 z-30">
          <AnimatedPanel show={panel === "guests"}>
            <GuestPopover guests={guests} onChange={setGuests} onDone={() => setPanel(null)} />
          </AnimatedPanel>
        </div>
      </div>

      {/* Mobile collapsed pill */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="sm:hidden flex items-center gap-3 w-full bg-white rounded-2xl shadow-lg px-5 py-4 text-left"
      >
        <FiSearch size={18} className="text-forest shrink-0" />
        <span className="text-sm text-gray-500 truncate">
          {destination || "Where are you going?"}
        </span>
      </button>

      <MobileSearchSheet
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        destination={destination}
        setDestination={setDestination}
        dates={dates}
        setDates={setDates}
        guests={guests}
        setGuests={setGuests}
        onSearch={handleSearch}
        searching={searching}
      />
    </>
  );
}

export default SearchBar;
