// import { useEffect, useRef } from 'react';
// import 'leaflet/dist/leaflet.css';

// type Proximidade = {
//   latitude: number;
//   longitude: number;
//   nome: string;
// };

// interface ClientMapProps {
//   proximidades: Proximidade[];
// }

// const ClientMap = ({ proximidades }: ClientMapProps) => {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const mapInstanceRef = useRef<any>(null);

//   useEffect(() => {
//     if (!mapRef.current) return;

//     const initMap = async () => {
//       try {
//         const L = (await import('leaflet')).default;

//         // Clean up existing map instance
//         if (mapInstanceRef.current) {
//           mapInstanceRef.current.remove();
//         }

//         // Initialize map
//         mapInstanceRef.current = L.map(mapRef.current!).setView(
//           [proximidades[0].latitude, proximidades[0].longitude],
//           15
//         );

//         // Add tile layer
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//           maxZoom: 19,
//           attribution: '© OpenStreetMap contributors'
//         }).addTo(mapInstanceRef.current);

//         // Add markers
//         proximidades.forEach((point) => {
//           L.marker([point.latitude, point.longitude])
//             .bindPopup(point.nome)
//             .addTo(mapInstanceRef.current);
//         });

//         // Force a map refresh
//         setTimeout(() => {
//           if (mapInstanceRef.current) {
//             mapInstanceRef.current.invalidateSize();
//           }
//         }, 100);
//       } catch (error) {
//         console.error('Error initializing map:', error);
//       }
//     };

//     initMap();

//     return () => {
//       if (mapInstanceRef.current) {
//         mapInstanceRef.current.remove();
//         mapInstanceRef.current = null;
//       }
//     };
//   }, [proximidades]);

//   return <div ref={mapRef} className="h-[300px] w-full rounded-md" />;
// };

// export default ClientMap;



import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import type { Map, TileLayer } from 'leaflet';

type Proximidade = {
  latitude: number;
  longitude: number;
  nome: string;
};

interface ClientMapProps {
  proximidades: Proximidade[];
  zoom?: number;
  height?: string;
}

const ClientMap = ({ proximidades, zoom = 15, height = "300px" }: ClientMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const tileLayerRef = useRef<TileLayer | null>(null);

  useEffect(() => {
    if (!mapRef.current || proximidades.length === 0) return;

    let isMounted = true;

    const initMap = async () => {
      try {
        const L = (await import('leaflet')).default;

        // Clean up existing map instance
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
          tileLayerRef.current = null;
        }

        // Only proceed if the component is still mounted
        if (!isMounted || !mapRef.current) return;

        // Initialize map with default center point
        const map = L.map(mapRef.current, {
          zoomControl: true,
          scrollWheelZoom: true,
          dragging: true
        }).setView(
          [proximidades[0].latitude, proximidades[0].longitude],
          zoom
        );

        mapInstanceRef.current = map;

        // Add tile layer
        tileLayerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add markers for each proximity point
        const bounds = L.latLngBounds([]);
        proximidades.forEach((point) => {
          const marker = L.marker([point.latitude, point.longitude])
            .bindPopup(point.nome)
            .addTo(map);
          bounds.extend([point.latitude, point.longitude]);
        });

        // Fit bounds if there are multiple points
        if (proximidades.length > 1) {
          map.fitBounds(bounds, { padding: [50, 50] });
        }

        // Force a map refresh after a short delay
        setTimeout(() => {
          if (mapInstanceRef.current && isMounted) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 250);

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();

    // Cleanup function
    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        tileLayerRef.current = null;
      }
    };
  }, [proximidades, zoom]); // Dependencies array includes zoom level

  return (
    <div 
      ref={mapRef} 
      style={{ height }} 
      className="w-full rounded-md" 
      data-testid="map-container"
    />
  );
};

export default ClientMap;