import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

const defaultIcon = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function FitBounds({ latitude, longitude, routePositions }) {
  const map = useMap();

  useEffect(() => {
    if (routePositions.length > 0) {
      map.fitBounds(routePositions, {
        padding: [50, 50],
      });
    } else {
      map.setView([latitude, longitude], 13);
    }

    // Helps Leaflet calculate its size correctly
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map, latitude, longitude, routePositions]);

  return null;
}

function LeafletMap({
  latitude,
  longitude,
  name,
  nearbyPlaces = [],
  routeData,
  onPlaceRoute,
  onNavigate,
  height = "400px",
}) {
  const routePositions =
    routeData?.geometry?.coordinates?.map(([lng, lat]) => [lat, lng]) || [];

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom
      style={{
        height,
        width: "100%",
        borderRadius: "16px",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds
        latitude={latitude}
        longitude={longitude}
        routePositions={routePositions}
      />

      <Marker
        position={[latitude, longitude]}
        icon={defaultIcon}
      >
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
          icon={defaultIcon}
        >
          <Popup>
  <strong>{place.name}</strong>
  <br />
  {place.address}
  <br />

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginTop: "8px",
    }}
  >
    <button
      type="button"
      onClick={() => onPlaceRoute(place)}
    >
      Show Route
    </button>

    <button
      type="button"
      onClick={() => onNavigate(place)}
    >
      Navigate with Google Maps
    </button>
  </div>
</Popup>
        </Marker>
      ))}

      {routePositions.length > 0 && (
        <Polyline
          positions={routePositions}
          pathOptions={{
            color: "#16a34a",
            weight: 6,
            opacity: 1,
          }}
        />
      )}
    </MapContainer>
  );
}

export default LeafletMap;