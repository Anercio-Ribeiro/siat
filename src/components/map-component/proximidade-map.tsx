import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

interface MapProps {
  markers: { lat: number; lng: number; popup?: string }[];
  onLocationSelected?: (lat: number, lng: number) => void;
  selectedLocation?: { lat: number; lng: number };
}

// Helper to add custom icon
const createCustomIcon = () =>
  L.divIcon({
    className: 'custom-pin',
    html: `<img src="https://www.openstreetmap.org/assets/leaflet/dist/images/marker-icon-3d253116ec4ba0e1f22a01cdf1ff7f120fa4d89a6cd0933d68f12951d19809b4.png" style="width: 24px; height: 24px;" />`,
    iconSize: [24, 24], // Aumentando o tamanho do ícone
    iconAnchor: [12, 24], // Ajusta o ponto de ancoragem
    popupAnchor: [0, -24], // Ajusta a posição do popup
  });

const FitBounds: React.FC<{ markers: { lat: number; lng: number }[] }> = ({ markers }) => {
  const map = useMap();
  if (markers.length > 0) {
    const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]));
    map.fitBounds(bounds, { padding: [50, 50] });
  }
  return null;
};

const MapComponent: React.FC<MapProps> = ({ markers, onLocationSelected, selectedLocation }) => {
  return (
    <MapContainer center={markers[0] || { lat: 0, lng: 0 }} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <FitBounds markers={markers} />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.lat, marker.lng]}
          icon={createCustomIcon()}
          eventHandlers={{
            click: () => {
              if (onLocationSelected) onLocationSelected(marker.lat, marker.lng);
            },
          }}
        >
          {marker.popup && <Popup>{marker.popup}</Popup>}
        </Marker>
      ))}
      {selectedLocation && (
        <Marker position={[selectedLocation.lat, selectedLocation.lng]} icon={createCustomIcon()}>
          <Popup>Localização Selecionada</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
