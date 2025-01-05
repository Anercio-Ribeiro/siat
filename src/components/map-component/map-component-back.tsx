
// // import { useEffect, useRef } from "react";
// // import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// // import L from "leaflet";
// // import "leaflet/dist/leaflet.css";

// // type Proximidade = {
// //   latitude: number;
// //   longitude: number;
// //   nome: string;
// // };

// // type HouseMapProps = {
// //   proximidades: Proximidade[];
// //   className?: string;
// // };



// // const MapComponent = ({ proximidades, className = "h-[300px] w-full rounded-md" }: HouseMapProps) => {
// //   const mapRef = useRef<L.Map>(null);

// //   useEffect(() => {
// //     // Center map on first location when proximidades change
// //     if (proximidades.length > 0 && mapRef.current) {
// //       const { latitude, longitude } = proximidades[0];
// //       mapRef.current.setView([latitude, longitude], 15);
// //     }
// //   }, [proximidades]);

// //   // Don't render map if no locations
// //   if (!proximidades || proximidades.length === 0) {
// //     return (
// //       <div className={`${className} flex items-center justify-center bg-gray-100`}>
// //         <p className="text-sm text-muted-foreground">Nenhuma localização disponível</p>
// //       </div>
// //     );
// //   }

// //   // Get center coordinates from first location
// //   const centerLat = proximidades[0].latitude;
// //   const centerLng = proximidades[0].longitude;

// //   return (
// //     <MapContainer
// //       center={[centerLat, centerLng]}
// //       zoom={15}
// //       className={className}
// //       ref={mapRef}
// //     >
// //       <TileLayer
// //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //       />
      
// //       {proximidades.map((point, index) => (
// //         <Marker
// //           key={index}
// //           position={[point.latitude, point.longitude]}
// //           icon={L.divIcon({
// //             className: 'bg-primary text-white rounded-full p-2 flex items-center justify-center',
// //             html: `<div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">${index + 1}</div>`,
// //             iconSize: [32, 32]
// //           })}
// //         >
// //           <Popup>
// //             <div className="p-2">
// //               <p className="font-semibold">{point.nome}</p>
// //             </div>
// //           </Popup>
// //         </Marker>
// //       ))}
// //     </MapContainer>
// //   );
// // };

// // export default MapComponent;



import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

type Proximidade = {
  latitude: number;
  longitude: number;
  nome: string;
};

interface ClientMapProps {
  proximidades: Proximidade[];
}

const ClientMap = ({ proximidades }: ClientMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = async () => {
      try {
        const L = (await import('leaflet')).default;

        // Clean up existing map instance
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }

        // Initialize map
        mapInstanceRef.current = L.map(mapRef.current!).setView(
          [proximidades[0].latitude, proximidades[0].longitude],
          15
        );

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstanceRef.current);

        // Add markers
        proximidades.forEach((point) => {
          L.marker([point.latitude, point.longitude])
            .bindPopup(point.nome)
            .addTo(mapInstanceRef.current);
        });

        // Force a map refresh
        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 100);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [proximidades]);

  return <div ref={mapRef} className="h-[300px] w-full rounded-md" />;
};

export default ClientMap;




// import { useEffect, useRef } from 'react';

// interface Proximidade {
//   latitude: number;
//   longitude: number;
//   nome: string;
// }

// const MapComponentBack = ({ proximidades }: { proximidades: Proximidade[] }) => {
//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const mapInstanceRef = useRef<any>(null);

//   useEffect(() => {
//     if (typeof window === 'undefined') return; // Ensure this code runs only on the client side

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
//         proximidades.forEach((proximidade) => {
//           L.marker([proximidade.latitude, proximidade.longitude])
//             .addTo(mapInstanceRef.current)
//             .bindPopup(proximidade.nome);
//         });
//       } catch (error) {
//         console.error('Failed to initialize map:', error);
//       }
//     };

//     initMap();
//   }, [proximidades]);

//   return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
// };

// export default MapComponentBack;