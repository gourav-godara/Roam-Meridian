import LeafletMap from "../maps/LeafletMap";

function MapCard({
  latitude,
  longitude,
  name,
  nearbyPlaces,
  nearbyType,
  setNearbyType,
  routeData,
  onPlaceRoute,
}) {
  const placeTypes = [
    { label: "Restaurants", value: "restaurant" },
    { label: "Hotels", value: "hotel" },
    { label: "Cafes", value: "cafe" },
    { label: "Hospitals", value: "hospital" },
    { label: "ATMs", value: "atm" },
    { label: "Petrol", value: "petrol_pump" },
    { label: "Attractions", value: "tourist_attraction" },
    { label: "Bus Stops", value: "bus_stop" },
  ];

  return (
    <div className="mt-5">
      <div className="flex gap-2 overflow-x-auto pb-3">
        {placeTypes.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => setNearbyType(type.value)}
            className={`whitespace-nowrap px-3 py-2 rounded-full text-xs font-medium border transition ${
              nearbyType === type.value
                ? "bg-ink text-white border-ink"
                : "bg-white text-ink border-border hover:bg-gray-100"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="relative rounded-3xl border border-border overflow-hidden">
        <LeafletMap
          latitude={Number(latitude)}
          longitude={Number(longitude)}
          name={name}
          nearbyPlaces={nearbyPlaces}
          routeData={routeData}
          onPlaceRoute={onPlaceRoute}
        />
      </div>

      {routeData && (
        <div className="mt-3 text-sm">
          <p>
            Distance: {(routeData.distance / 1000).toFixed(2)} km
          </p>

          <p>
            Estimated Duration: {Math.round(routeData.duration / 60)} minutes
          </p>
        </div>
      )}
    </div>
  );
}

export default MapCard;