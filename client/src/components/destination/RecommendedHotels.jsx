import Button from "../common/Button";

function RecommendedHotels({ items = [], onPlaceRoute }) {
  return (
    <div className="mt-10">
      <h3 className="text-base font-semibold text-ink mb-4">
        Recommended Hotels
      </h3>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">
          No nearby hotels found.
        </p>
      ) : (
        <div className="grid sm:grid-cols-3 gap-4">
          {items.slice(0, 6).map((hotel, index) => (
            <div
              key={`${hotel.name}-${index}`}
              className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="p-4 flex flex-col flex-1">
                <h4 className="text-sm font-semibold text-ink">
                  {hotel.name}
                </h4>

                <p className="text-xs text-gray-500 mt-2">
                  {hotel.address || "Address not available"}
                </p>

                {onPlaceRoute && (
                  <div className="mt-auto pt-4">
                    <Button
                      variant="ghost"
                      className="!py-1.5 !px-3 !text-xs"
                      onClick={() => onPlaceRoute(hotel)}
                    >
                      Show Route
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecommendedHotels;