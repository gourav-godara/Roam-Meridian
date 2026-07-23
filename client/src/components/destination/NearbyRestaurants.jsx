function NearbyRestaurants({ items = [], onPlaceRoute }) {
  return (
    <div className="mt-10">
      <h3 className="text-base font-semibold text-ink mb-4">
        Nearby Restaurants
      </h3>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">
          No nearby restaurants found.
        </p>
      ) : (
        <div className="grid sm:grid-cols-3 gap-4">
          {items.slice(0, 6).map((restaurant, index) => (
            <div
              key={`${restaurant.name}-${index}`}
              className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <h4 className="text-sm font-semibold text-ink">
                  {restaurant.name}
                </h4>

                <p className="text-xs text-gray-500 mt-2">
                  {restaurant.address || "Address not available"}
                </p>

                {onPlaceRoute && (
                  <button
                    type="button"
                    onClick={() => onPlaceRoute(restaurant)}
                    className="mt-4 text-sm font-semibold text-forest"
                  >
                    Show Route
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NearbyRestaurants;