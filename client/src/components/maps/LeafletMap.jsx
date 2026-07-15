import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

function LeafletMap({
  latitude,
  longitude,
  name,
}) {
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
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[latitude, longitude]}>
        <Popup>
          <strong>{name}</strong>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default LeafletMap;