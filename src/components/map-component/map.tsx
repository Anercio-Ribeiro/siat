import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define the props interface
export interface MapProps {
  onLocationSelected: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number } | null;
}

// Create custom icon using the provided image path
const customIcon = L.divIcon({
  className: 'custom-pin-icon',
  html: `<img src="https://www.openstreetmap.org/assets/leaflet/dist/images/marker-icon-3d253116ec4ba0e1f22a01cdf1ff7f120fa4d89a6cd0933d68f12951d19809b4.png" />`,
  iconSize: [24, 24],
  iconAnchor: [12, 24], // Point of the icon which corresponds to marker's location
  popupAnchor: [0, -24], // Point from which popups should open relative to the iconAnchor
});

// LocationMarker component to handle map clicks and marker display
function LocationMarker({ onLocationSelected, selectedLocation }: MapProps) {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelected(lat, lng);
    },
  });

  useEffect(() => {
    if (selectedLocation) {
      map.flyTo(selectedLocation, map.getZoom());
    }
  }, [selectedLocation, map]);

  return selectedLocation ? (
    <Marker
      position={selectedLocation}
      icon={customIcon}
    />
  ) : null;
}

// Main Map component
const Map = ({ onLocationSelected, selectedLocation }: MapProps) => {
  // Default center coordinates (e.g., Luanda, Angola)
  const defaultCenter = { lat: -8.8390, lng: 13.2894 };

  return (
    <MapContainer
      center={selectedLocation || defaultCenter}
      zoom={13}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker
        onLocationSelected={onLocationSelected}
        selectedLocation={selectedLocation}
      />
    </MapContainer>
  );
};

export default Map;