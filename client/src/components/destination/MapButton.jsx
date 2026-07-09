import { useState } from "react";
import { FiMapPin, FiX } from "react-icons/fi";
import MapCard from "./MapCard";

function MapButton({ mapImage, name }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center gap-2 bg-forest-light/10 text-forest-light rounded-2xl py-3.5 text-sm font-semibold hover:bg-forest-light/20 transition-colors"
      >
        <FiMapPin size={17} />
        View Map
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-end"
          onClick={() => setOpen(false)}
        >
          <div className="bg-white rounded-t-3xl w-full p-6 pb-10" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} className="mb-4 text-gray-500" aria-label="Close">
              <FiX size={22} />
            </button>
            <MapCard mapImage={mapImage} name={name} />
          </div>
        </div>
      )}
    </>
  );
}

export default MapButton;
