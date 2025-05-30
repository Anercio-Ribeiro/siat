
// 'use client';
// import { useEffect, useRef } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Configurar ícone personalizado
// const customIcon = new L.Icon({
//   iconUrl: '/leaflet/marker-icon.png',
//   iconRetinaUrl: '/map-icons/marker-icon-2x.png',
//   shadowUrl: '/map-icons/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
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

//   // Garantir valores válidos para latitude e longitude
//   const validLatitude = isNaN(latitude) ? 0 : latitude;
//   const validLongitude = isNaN(longitude) ? 0 : longitude;

//   return (
//     <MapContainer
//       center={[validLatitude, validLongitude]}
//       zoom={15}
//       style={{ height: '300px', width: '100%' }}
//       ref={mapRef}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={[validLatitude, validLongitude]} icon={customIcon} />
//       {proximidades.map((prox) => (
//         <Marker
//           key={prox.id}
//           position={[prox.latitude, prox.longitude]}
//           icon={customIcon}
//         />
//       ))}
//       {onMapClick && <MapEvents />}
//     </MapContainer>
//   );
// }









'use client';
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents } from 'react-leaflet';
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
  titulo: string; // Título do imóvel
  preco: number; // Preço por dia
  precoMensal: number; // Preço por mês
  proximidades?: { id: string; nome: string; latitude: number; longitude: number }[];
  onMapClick?: (lat: number, lng: number) => void;
}

export default function PropertyLocationMap({
  latitude,
  longitude,
  titulo,
  preco,
  precoMensal,
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
      <Marker position={[validLatitude, validLongitude]} icon={customIcon}>
        <Tooltip>
          <div>
            <strong>{titulo}</strong>
            {/* <p>Preço por dia: {preco.toFixed(2)} AOA</p>
            <p>Preço por mês: {precoMensal.toFixed(2)} AOA</p> */}
            <p>Preço por dia: {preco != null ? preco.toFixed(2) : 'N/A'} AOA</p>
            <p>Preço por mês: {precoMensal != null ? precoMensal.toFixed(2) : 'N/A'} AOA</p>
          </div>
        </Tooltip>
      </Marker>
      {proximidades.map((prox) => (
        <Marker
          key={prox.id}
          position={[prox.latitude, prox.longitude]}
          icon={customIcon}
        >
          <Tooltip>
            <div>
              <strong>{prox.nome}</strong>
            </div>
          </Tooltip>
        </Marker>
      ))}
      {onMapClick && <MapEvents />}
    </MapContainer>
  );
}












// "use client";

// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix for default marker icon in Leaflet
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
// });

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
//   titulo?: string;
//   preco?: number;
//   precoMensal?: number;
// }

// const PropertyLocationMap = ({
//   latitude,
//   longitude,
//   proximidades = [],
//   titulo,
//   preco,
//   precoMensal,
// }: PropertyLocationMapProps) => {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) {
//     return null;
//   }

//   const position: [number, number] = [latitude, longitude];

//   return (
//     <MapContainer
//       center={position}
//       zoom={15}
//       style={{ height: "300px", width: "100%", borderRadius: "8px" }}
//       className="z-0"
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={position}>
//         {titulo && (
//           <Tooltip offset={[0, -40]} direction="top">
//             <div className="bg-white p-2 rounded-lg shadow-md border border-gray-200 text-sm">
//               <p className="font-semibold">{titulo}</p>
//               <p>Diária: {preco?.toLocaleString("pt-BR", { style: "currency", currency: "AOA" })}</p>
//               <p>Mensal: {precoMensal?.toLocaleString("pt-BR", { style: "currency", currency: "AOA" })}</p>
//             </div>
//           </Tooltip>
//         )}
//       </Marker>
//       {proximidades.map((prox) => (
//         <Marker
//           key={prox.id}
//           position={[prox.latitude, prox.longitude]}
//           icon={L.icon({
//             iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
//             iconSize: [25, 41],
//             iconAnchor: [12, 41],
//           })}
//         >
//           <Popup>
//             <div>
//               <p className="font-semibold">{prox.nome}</p>
//               <p>{prox.tipo}</p>
//               <p>{prox.calculated_distance.toFixed(2)} km</p>
//             </div>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default PropertyLocationMap;