import { FiStar } from "react-icons/fi";

function NearbyRestaurants({ items }) {
  return (
    <div className="mt-10">
      <h3 className="text-base font-semibold text-ink mb-4">Nearby Restaurants</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {items.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-3.5">
              <h4 className="text-sm font-semibold text-ink truncate">{r.name}</h4>
              <p className="text-xs text-gray-500 mt-0.5">{r.cuisine}</p>
              <div className="flex items-center justify-between mt-1.5">
                <span className="flex items-center gap-1 text-xs font-medium text-ink">
                  <FiStar size={12} className="fill-gold text-gold" />
                  {r.rating}
                </span>
                <span className="text-xs text-gray-500">{r.cost}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NearbyRestaurants;
