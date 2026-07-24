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
  loadingNearby,
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
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
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
        <div className="flex gap-3 mb-4">

  <a
    href={googleMapsUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-700 text-white hover:bg-green-800 transition"
  >
    Open in Google Maps
  </a>

  <button
    onClick={() => {
      navigator.geolocation.getCurrentPosition((pos) => {
        window.open(
          `https://www.google.com/maps/dir/${pos.coords.latitude},${pos.coords.longitude}/${latitude},${longitude}`,
          "_blank"
        );
      });
    }}
    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
  >
    Navigate
  </button>

</div>
      <div className="relative rounded-3xl border border-border overflow-hidden">

  {loadingNearby && (
    <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-20">
      <div className="w-10 h-10 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )}
        {loadingNearby ? (

<div className="h-[420px] flex items-center justify-center">

Loading nearby places...

</div>

) : (

<LeafletMap
    latitude={Number(latitude)}
    longitude={Number(longitude)}
    name={name}
    nearbyPlaces={nearbyPlaces}
    routeData={routeData}
    onPlaceRoute={onPlaceRoute}
/>

)}
      </div>
      <p className="text-sm text-gray-500 mt-3">
  Found {nearbyPlaces.length} nearby{" "}
  {nearbyType.replace("_", " ")}.
</p>
      {routeData && (

<div className="mt-5 rounded-xl bg-green-50 border border-green-200 p-4">

<h3 className="font-semibold mb-2">
Route Information
</h3>

<p>
Distance:
<strong>
{" "}
{(routeData.distance / 1000).toFixed(2)} km
</strong>
</p>

<p>
Estimated Time:
<strong>
{" "}
{Math.round(routeData.duration / 60)} mins
</strong>
</p>

</div>

)}
    </div>
  );
}

export default MapCard;