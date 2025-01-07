

// import { useEffect, useRef } from 'react';
// import 'leaflet/dist/leaflet.css';
// import type { Map, TileLayer } from 'leaflet';

// type Proximidade = {
//   latitude: number;
//   longitude: number;
//   nome: string;
// };

// interface ClientMapProps {
//   proximidades: Proximidade[];
//   zoom?: number;
//   height?: string;
// }

// const ClientMap = ({ proximidades, zoom = 15, height = "300px" }: ClientMapProps) => {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const mapInstanceRef = useRef<Map | null>(null);
//   const tileLayerRef = useRef<TileLayer | null>(null);

//   useEffect(() => {
//     if (!mapRef.current || proximidades.length === 0) return;

//     let isMounted = true;

//     const initMap = async () => {
//       try {
//         const L = (await import('leaflet')).default;

//         // Clean up existing map instance
//         if (mapInstanceRef.current) {
//           mapInstanceRef.current.remove();
//           mapInstanceRef.current = null;
//           tileLayerRef.current = null;
//         }

//         // Only proceed if the component is still mounted
//         if (!isMounted || !mapRef.current) return;

//         // Initialize map with default center point
//         const map = L.map(mapRef.current, {
//           zoomControl: true,
//           scrollWheelZoom: true,
//           dragging: true
//         }).setView(
//           [proximidades[0].latitude, proximidades[0].longitude],
//           zoom
//         );

//         mapInstanceRef.current = map;

//         // Add tile layer
//         tileLayerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//           maxZoom: 19,
//           attribution: '© OpenStreetMap contributors'
//         }).addTo(map);

//         // Add markers for each proximity point
//         const bounds = L.latLngBounds([]);
//         proximidades.forEach((point) => {
//           const marker = L.marker([point.latitude, point.longitude])
//             .bindPopup(point.nome)
//             .addTo(map);
//           bounds.extend([point.latitude, point.longitude]);
//         });

//         // Fit bounds if there are multiple points
//         if (proximidades.length > 1) {
//           map.fitBounds(bounds, { padding: [50, 50] });
//         }

//         // Force a map refresh after a short delay
//         setTimeout(() => {
//           if (mapInstanceRef.current && isMounted) {
//             mapInstanceRef.current.invalidateSize();
//           }
//         }, 250);

//       } catch (error) {
//         console.error('Error initializing map:', error);
//       }
//     };

//     initMap();

//     // Cleanup function
//     return () => {
//       isMounted = false;
//       if (mapInstanceRef.current) {
//         mapInstanceRef.current.remove();
//         mapInstanceRef.current = null;
//         tileLayerRef.current = null;
//       }
//     };
//   }, [proximidades, zoom]); // Dependencies array includes zoom level

//   return (
//     <div 
//       ref={mapRef} 
//       style={{ height }} 
//       className="w-full rounded-md" 
//       data-testid="map-container"
//     />
//   );
// };

// export default ClientMap;



import React from 'react';
import { MapPin } from 'lucide-react';

const PropertyLocationMap = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    position: 'relative' as const,
    borderRadius: '8px',
    overflow: 'hidden'
  };

  const pinStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#2563eb',
    zIndex: 10
  };

  return (
    <div style={mapContainerStyle} className="border">
      <MapPin size={32} style={pinStyle} />
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01},${latitude-0.01},${longitude+0.01},${latitude+0.01}&layer=mapnik&marker=${latitude},${longitude}`}
        allowFullScreen
      />
    </div>
  );
};

export default PropertyLocationMap;