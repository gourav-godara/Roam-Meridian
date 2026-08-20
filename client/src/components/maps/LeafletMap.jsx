import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
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

function FitBounds({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], 13);

    // Helps Leaflet calculate its size correctly
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map, latitude, longitude]);

  return null;
}

function LeafletMap({
  latitude,
  longitude,
  name,
  nearbyPlaces = [],
  height = "400px",
}) {
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

      <FitBounds latitude={latitude} longitude={longitude} />

      <Marker position={[latitude, longitude]} icon={defaultIcon}>
        <Popup>
          <strong>{name}</strong>
        </Popup>
      </Marker>

      {nearbyPlaces.map((place, index) => (
        <Marker
          key={`${place.name}-${index}`}
          position={[Number(place.latitude), Number(place.longitude)]}
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
                gap: "6px",
                marginTop: "8px",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  if (place.latitude && place.longitude) {
                    const url = `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`;
                    window.open(url, "_blank", "noopener,noreferrer");
                  }
                }}
                style={{
                  backgroundColor: "#1b4332",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "6px 10px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                Open in Google Maps
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default LeafletMap;