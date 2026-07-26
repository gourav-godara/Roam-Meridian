function NearbyRestaurants({ items = [], onPlaceRoute }) {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-semibold text-ink">
          Nearby Restaurants
        </h3>

        <span className="text-sm text-gray-500">
          {items.length} found
        </span>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border p-8 text-center text-gray-500">
          No nearby restaurants found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {items.slice(0, 6).map((restaurant, index) => (
            <div
              key={`${restaurant.name}-${index}`}
              className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-lg transition p-5 flex flex-col"
            >
              <h4 className="font-semibold text-lg text-ink">
                {restaurant.name}
              </h4>

              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {restaurant.address || "Address not available"}
              </p>

              {restaurant.category?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {restaurant.category.slice(0, 2).map((cat) => (
                    <span
                      key={cat}
                      className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs"
                    >
                      {cat.replaceAll(".", " ")}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-auto pt-5">
                
                <button
                  onClick={() => {
                    console.log(restaurant);
                    onPlaceRoute?.(restaurant)}}
                  className="w-full rounded-xl bg-green-700 text-white py-2 hover:bg-green-800"
                >
                  Show Route
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NearbyRestaurants;