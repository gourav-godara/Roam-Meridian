import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

function LeafletMap({
  latitude,
  longitude,
  name,
  nearbyPlaces = [],
  routeData,
  onPlaceRoute,
}) {
  const routePositions =
    routeData?.geometry?.coordinates?.map(([lng, lat]) => [
      lat,
      lng,
    ]) || [];

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "16px",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[latitude, longitude]}>
        <Popup>
          <strong>{name}</strong>
        </Popup>
      </Marker>

      {nearbyPlaces.map((place, index) => (
        <Marker
          key={`${place.name}-${index}`}
          position={[
            Number(place.latitude),
            Number(place.longitude),
          ]}
        >
          <Popup>
            <strong>{place.name}</strong>

            {place.address && (
              <>
                <br />
                {place.address}
              </>
            )}

            <br />

            <button
              type="button"
              onClick={() => onPlaceRoute(place)}
              style={{
                marginTop: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Show Route
            </button>
          </Popup>
        </Marker>
      ))}

      {routePositions.length > 0 && (
        <Polyline positions={routePositions} />
      )}
    </MapContainer>
  );
}

export default LeafletMap;