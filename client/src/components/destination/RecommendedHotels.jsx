import { FiStar } from "react-icons/fi";
import Button from "../common/Button";

function RecommendedHotels({ items }) {
  return (
    <div className="mt-10">
      <h3 className="text-base font-semibold text-ink mb-4">Recommended Hotels</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {items.map((h) => (
          <div key={h.id} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-3.5 flex flex-col flex-1">
              <h4 className="text-sm font-semibold text-ink truncate">{h.name}</h4>
              <span className="flex items-center gap-1 text-xs font-medium text-ink mt-1">
                <FiStar size={12} className="fill-gold text-gold" />
                {h.rating}
              </span>
              <div className="flex items-center justify-between mt-auto pt-3">
                <span className="text-sm font-semibold text-forest">{h.pricePerNight}<span className="text-xs text-gray-500 font-normal">/night</span></span>
                <Button variant="ghost" className="!py-1.5 !px-3 !text-xs">View</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedHotels;
