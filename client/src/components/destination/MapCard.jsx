import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiMaximize2, FiX } from "react-icons/fi";
import LeafletMap from "../maps/LeafletMap";


function MapCard({
  latitude,
  longitude,
  name,
  nearbyPlaces = [],
  nearbyType,
  setNearbyType,
  routeData,
  onPlaceRoute,
  loadingNearby,
}) {
  const [isMapExpanded, setIsMapExpanded] = useState(false);

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

  const handleNavigate = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      window.open(
        `https://www.google.com/maps/dir/${pos.coords.latitude},${pos.coords.longitude}/${latitude},${longitude}`,
        "_blank"
      );
    });
  };

  // Prevent page behind fullscreen map from scrolling
  useEffect(() => {
    if (isMapExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMapExpanded]);

  return (
    <div className="mt-5 w-full min-w-0">
      {/* Nearby place filters */}
      <div className="flex gap-2 overflow-x-auto pb-3">
        {placeTypes.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => setNearbyType(type.value)}
            className={`shrink-0 whitespace-nowrap px-3 py-2 rounded-full text-xs font-medium border transition ${
              nearbyType === type.value
                ? "bg-ink text-white border-ink"
                : "bg-white text-ink border-border hover:bg-gray-100"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Google Maps buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl bg-green-700 text-white hover:bg-green-800 transition text-sm font-medium"
        >
          Open in Google Maps
        </a>

        <button
          type="button"
          onClick={handleNavigate}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 transition text-sm font-medium"
        >
          Navigate
        </button>
      </div>

      {/* Normal map */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl border border-border overflow-hidden">
        {/* Expand map button */}
        {!loadingNearby && (
          <button
            type="button"
            onClick={() => setIsMapExpanded(true)}
            aria-label="Expand map"
            className="absolute top-3 right-3 z-[500] flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-md border border-gray-200 hover:bg-gray-50 transition"
          >
            <FiMaximize2 size={17} />

            <span className="hidden sm:inline text-xs font-semibold">
              Expand Map
            </span>
          </button>
        )}

        {/* Loading overlay */}
        {loadingNearby && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-20">
            <div className="w-10 h-10 border-4 border-green-700 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {loadingNearby ? (
          <div className="h-[320px] sm:h-[400px] flex items-center justify-center">
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

      {/* Nearby places count */}
      <p className="text-sm text-gray-500 mt-3">
        Found {nearbyPlaces.length} nearby{" "}
        {nearbyType.replaceAll("_", " ")}.
      </p>

      {/* Route information */}
      {routeData && (
        <div className="mt-5 rounded-xl bg-green-50 border border-green-200 p-4">
          <h3 className="font-semibold mb-2">
            Route Information
          </h3>

          <p>
            Distance:{" "}
            <strong>
              {(routeData.distance / 1000).toFixed(2)} km
            </strong>
          </p>

          <p>
            Estimated Time:{" "}
            <strong>
              {Math.round(routeData.duration / 60)} mins
            </strong>
          </p>
        </div>
      )}

            {/* Fullscreen map */}
      {isMapExpanded &&
        createPortal(
          <div
            className="fixed inset-0 bg-white flex flex-col"
            style={{ zIndex: 999999 }}
          >
          {/* Fullscreen header */}
          <div className="relative z-[1000] flex items-center justify-between px-4 sm:px-6 py-4 border-b bg-white">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-ink">
                Explore {name}
              </h2>

              <p className="text-xs text-gray-500">
                Drag and zoom to explore nearby places
              </p>
            </div>

            {/* Close fullscreen button */}
            <button
              type="button"
              onClick={() => setIsMapExpanded(false)}
              aria-label="Close expanded map"
              className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-100 transition"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Filters in fullscreen */}
          <div className="relative z-[1000] bg-white border-b px-4 sm:px-6 py-3">
            <div className="flex gap-2 overflow-x-auto">
              {placeTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setNearbyType(type.value)}
                  className={`shrink-0 whitespace-nowrap px-3 py-2 rounded-full text-xs font-medium border transition ${
                    nearbyType === type.value
                      ? "bg-ink text-white border-ink"
                      : "bg-white text-ink border-border hover:bg-gray-100"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fullscreen Leaflet map */}
          <div className="flex-1 min-h-0">
            <LeafletMap
              latitude={Number(latitude)}
              longitude={Number(longitude)}
              name={name}
              nearbyPlaces={nearbyPlaces}
              routeData={routeData}
              onPlaceRoute={onPlaceRoute}
              height="100%"
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default MapCard;