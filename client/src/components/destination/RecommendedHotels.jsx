import Button from "../common/Button";

function RecommendedHotels({ items = [], onPlaceRoute }) {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-semibold text-ink">
          Recommended Hotels
        </h3>

        <span className="text-sm text-gray-500">
          {items.length} found
        </span>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border p-8 text-center text-gray-500">
          No nearby hotels found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {items.slice(0, 6).map((hotel, index) => (
            <div
              key={`${hotel.name}-${index}`}
              className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-lg transition p-5 flex flex-col"
            >
              <h4 className="font-semibold text-lg">
                {hotel.name}
              </h4>

              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {hotel.address || "Address not available"}
              </p>

              {hotel.category?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {hotel.category.slice(0, 2).map((cat) => (
                    <span
                      key={cat}
                      className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs"
                    >
                      {cat.replaceAll(".", " ")}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-auto pt-5">
                <Button
                  onClick={() => {
                    if (hotel.latitude && hotel.longitude) {
                      const url = `https://www.google.com/maps/search/?api=1&query=${hotel.latitude},${hotel.longitude}`;
                      window.open(url, "_blank", "noopener,noreferrer");
                    }
                    onPlaceRoute?.(hotel);
                  }}
                  className="w-full"
                >
                  Open in Google Maps
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecommendedHotels;