// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { icon } from 'leaflet';
// import { useMemo } from 'react';

// interface Proximidade {
//   id: string;
//   nome: string;
//   tipo: string;
//   latitude: number;
//   longitude: number;
//   calculated_distance: number;
// }

// interface PropertyLocationMapProps {
//   latitude: number;
//   longitude: number;
//   proximidades?: Proximidade[];
// }

// const CUSTOM_ICON = icon({
//   iconUrl: '/map-icons/icons8-home-address-48.png',
//   iconSize: [40, 40],
//     iconAnchor: [12, 24],
//     popupAnchor: [0, -24],
// });

// const PROXIMIDADE_ICON = icon({
//   iconUrl: 'https://www.openstreetmap.org/assets/leaflet/dist/images/marker-icon-3d253116ec4ba0e1f22a01cdf1ff7f120fa4d89a6cd0933d68f12951d19809b4.png',
//   iconSize: [24, 24], // Aumentado o tamanho do ícone
//   iconAnchor: [12, 24], // Ajuste para o novo tamanho
//   popupAnchor: [0, -24],
  
// });

// const PropertyLocationMap = ({ 
//   latitude, 
//   longitude, 
//   proximidades 
// }: PropertyLocationMapProps) => {
//   const center = useMemo(() => ({ lat: latitude, lng: longitude }), [latitude, longitude]);

//   return (
//     <MapContainer
//       center={center}
//       zoom={15}
//       style={{ height: '300px', width: '100%', borderRadius: '0.5rem' }}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
      
//       {/* Property Marker */}
//       <Marker position={center} icon={CUSTOM_ICON}>
//         <Popup>
//           Localização do Imóvel
//         </Popup>
//       </Marker>

//       {/* Proximidades Markers */}
//       {proximidades?.map((proximidade) => (
//         <Marker
//           key={proximidade.id}
//           position={[proximidade.latitude, proximidade.longitude]}
//           icon={PROXIMIDADE_ICON}
//         >
//           <Popup>
//             <div className="text-sm">
//               <p className="font-medium">{proximidade.nome}</p>
//               <p className="text-gray-600">{proximidade.tipo}</p>
//               <p className="text-gray-500 text-xs mt-1">
//                 {proximidade.calculated_distance.toFixed(2)} km de distância
//               </p>
//             </div>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default PropertyLocationMap;













// 'use client';
// import { useEffect, useRef } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Corrige o ícone padrão do Leaflet
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: '/leaflet/marker-icon-2x.png',
//   iconUrl: '/leaflet/marker-icon.png',
//   shadowUrl: '/leaflet/marker-shadow.png',
// });

// interface PropertyLocationMapProps {
//   latitude: number;
//   longitude: number;
//   proximidades?: { id: string; nome: string; latitude: number; longitude: number }[];
//   onMapClick?: (lat: number, lng: number) => void;
// }

// export default function PropertyLocationMap({
//   latitude,
//   longitude,
//   proximidades = [],
//   onMapClick,
// }: PropertyLocationMapProps) {
//   const mapRef = useRef<L.Map | null>(null);

//   const MapEvents = () => {
//     useMapEvents({
//       click(e) {
//         if (onMapClick) {
//           onMapClick(e.latlng.lat, e.latlng.lng);
//         }
//       },
//     });
//     return null;
//   };

//   useEffect(() => {
//     if (mapRef.current) {
//       mapRef.current.setView([latitude, longitude], 15);
//     }
//   }, [latitude, longitude]);

//   return (
//     <MapContainer
//       center={[latitude, longitude]}
//       zoom={15}
//       style={{ height: '300px', width: '100%' }}
//       ref={mapRef}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={[latitude, longitude]} />
//       {proximidades.map((prox) => (
//         <Marker key={prox.id} position={[prox.latitude, prox.longitude]} />
//       ))}
//       {onMapClick && <MapEvents />}
//     </MapContainer>
//   );
// }



















'use client';
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configurar ícone personalizado
const customIcon = new L.Icon({
  iconUrl: '/leaflet/marker-icon.png',
  iconRetinaUrl: '/map-icons/marker-icon-2x.png',
  shadowUrl: '/map-icons/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface PropertyLocationMapProps {
  latitude: number;
  longitude: number;
  proximidades?: { id: string; nome: string; latitude: number; longitude: number }[];
  onMapClick?: (lat: number, lng: number) => void;
}

export default function PropertyLocationMap({
  latitude,
  longitude,
  proximidades = [],
  onMapClick,
}: PropertyLocationMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        if (onMapClick) {
          onMapClick(e.latlng.lat, e.latlng.lng);
        }
      },
    });
    return null;
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([latitude, longitude], 15);
    }
  }, [latitude, longitude]);

  // Garantir valores válidos para latitude e longitude
  const validLatitude = isNaN(latitude) ? 0 : latitude;
  const validLongitude = isNaN(longitude) ? 0 : longitude;

  return (
    <MapContainer
      center={[validLatitude, validLongitude]}
      zoom={15}
      style={{ height: '300px', width: '100%' }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[validLatitude, validLongitude]} icon={customIcon} />
      {proximidades.map((prox) => (
        <Marker
          key={prox.id}
          position={[prox.latitude, prox.longitude]}
          icon={customIcon}
        />
      ))}
      {onMapClick && <MapEvents />}
    </MapContainer>
  );
}