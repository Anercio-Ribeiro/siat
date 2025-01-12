
// // app/components/map-component/map.tsx
// import { useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import { MapPin } from 'lucide-react';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Define the props interface
// export interface MapProps {
//   onLocationSelected: (lat: number, lng: number) => void;
//   selectedLocation: { lat: number; lng: number } | null;
// }

// // Create custom icon using Lucide's MapPin
// const customIcon = L.divIcon({
//   className: 'custom-pin-icon',
//   html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
//     <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
//     <circle cx="12" cy="10" r="3"></circle>
//   </svg>`,
//   iconSize: [24, 24],
//   iconAnchor: [12, 24], // Point of the icon which corresponds to marker's location
//   popupAnchor: [0, -24], // Point from which popups should open relative to the iconAnchor
// });

// // LocationMarker component to handle map clicks and marker display
// function LocationMarker({ onLocationSelected, selectedLocation }: MapProps) {
//   const map = useMapEvents({
//     click(e) {
//       const { lat, lng } = e.latlng;
//       onLocationSelected(lat, lng);
//     },
//   });

//   useEffect(() => {
//     if (selectedLocation) {
//       map.flyTo(selectedLocation, map.getZoom());
//     }
//   }, [selectedLocation, map]);

//   return selectedLocation ? (
//     <Marker
//       position={selectedLocation}
//       icon={customIcon}
//     />
//   ) : null;
// }

// // Main Map component
// const Map = ({ onLocationSelected, selectedLocation }: MapProps) => {
//   // Default center coordinates (e.g., Luanda, Angola)
//   const defaultCenter = { lat: -8.8390, lng: 13.2894 };

//   return (
//     <MapContainer
//       center={selectedLocation || defaultCenter}
//       zoom={13}
//       style={{ width: '100%', height: '100%' }}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <LocationMarker 
//         onLocationSelected={onLocationSelected}
//         selectedLocation={selectedLocation}
//       />
//     </MapContainer>
//   );
// };

// export default Map;


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
    html: `<img src="https://www.openstreetmap.org/assets/leaflet/dist/images/marker-icon-3d253116ec4ba0e1f22a01cdf1ff7f120fa4d89a6cd0933d68f12951d19809b4.png" />`,
    iconSize: [12, 12],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
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
