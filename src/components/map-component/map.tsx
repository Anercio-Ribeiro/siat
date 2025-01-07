// // app/components/map-component/map.tsx
// import { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Define the props interface
// export interface MapProps {
//   onLocationSelected: (lat: number, lng: number) => void;
//   selectedLocation: { lat: number; lng: number } | null;
// }

// // Create custom icon for the marker
// const customIcon = new L.Icon({
//   iconUrl: '/marker-icon.png',
//   iconRetinaUrl: '/marker-icon-2x.png',
//   shadowUrl: '/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
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




// app/components/map-component/map.tsx
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

// Create custom icon using Lucide's MapPin
const customIcon = L.divIcon({
  className: 'custom-pin-icon',
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>`,
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