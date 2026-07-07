import { FiExternalLink, FiMapPin } from "react-icons/fi";

function MapCard({ mapImage, name }) {
  return (
    <div className="relative rounded-3xl border border-border overflow-hidden mt-5 aspect-[4/3]">
      <img src={mapImage} alt={`Map of ${name}`} className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center">
        <FiMapPin size={32} className="text-red-700 drop-shadow" />
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <button
          type="button"
          className="flex items-center gap-2 bg-white text-ink text-sm font-medium px-4 py-2.5 rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          View on Map
          <FiExternalLink size={14} />
        </button>
      </div>
    </div>
  );
}

export default MapCard;
