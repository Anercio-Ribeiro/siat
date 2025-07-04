// 'use client';
// import { useEffect, useRef } from 'react';
// import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents, Polyline } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Configurar ícone personalizado
// const customIcon = new L.Icon({
//   iconUrl: '/map-icons/marker-icon.png',
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
//   titulo: string;
//   preco: number;
//   precoMensal: number;
//   proximidades?: { id: string; nome: string; latitude: number; longitude: number }[];
//   onMapClick?: (lat: number, lng: number) => void;
// }

// export default function PropertyLocationMap({
//   latitude,
//   longitude,
//   titulo,
//   preco,
//   precoMensal,
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

//   // Função para formatar a distância
//   const formatDistance = (distanceMeters: number): string => {
//     if (distanceMeters >= 1000) {
//       return `${(distanceMeters / 1000).toFixed(2)} km`;
//     }
//     return `${Math.round(distanceMeters)} m`;
//   };

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
//       <Marker position={[validLatitude, validLongitude]} icon={customIcon}>
//         <Tooltip>
//           <div>
//             <strong>{titulo}</strong>
//             <p>Preço por dia: {preco != null ? preco.toFixed(2) : 'N/A'} AOA</p>
//             <p>Preço por mês: {precoMensal != null ? precoMensal.toFixed(2) : 'N/A'} AOA</p>
//           </div>
//         </Tooltip>
//       </Marker>
//       {proximidades.map((prox) => {
//         // Calcular distância em metros
//         const distanceMeters = L.latLng(validLatitude, validLongitude).distanceTo([
//           prox.latitude,
//           prox.longitude,
//         ]);
//         return (
//           <div key={prox.id}>
//             <Marker position={[prox.latitude, prox.longitude]} icon={customIcon}>
//               <Tooltip>
//                 <div>
//                   <strong>{prox.nome}</strong>
//                   <p>Distância: {formatDistance(distanceMeters)}</p>
//                 </div>
//               </Tooltip>
//             </Marker>
//             <Polyline
//               positions={[[validLatitude, validLongitude], [prox.latitude, prox.longitude]]}
//               color="green"
//               weight={3}
//               opacity={0.7}
//             />
//           </div>
//         );
//       })}
//       {onMapClick && <MapEvents />}
//     </MapContainer>
//   );
// }








'use client';
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configurar ícone personalizado
const customIcon = new L.Icon({
  iconUrl: '/map-icons/marker-icon.png',
  iconRetinaUrl: '/map-icons/marker-icon-2x.png',
  shadowUrl: '/map-icons/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Proximidade {
  id: string;
  nome: string;
  tipo: string;
  latitude: number;
  longitude: number;
  calculated_distance: number;
}

interface PropertyLocationMapProps {
  latitude: number;
  longitude: number;
  titulo: string;
  preco: number;
  precoMensal: number;
  proximidades?: Proximidade[];
}

export default function PropertyLocationMap({
  latitude,
  longitude,
  titulo,
  preco,
  precoMensal,
  proximidades = [],
}: PropertyLocationMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  // Garantir valores válidos para latitude e longitude
  const validLatitude = isNaN(latitude) ? 0 : latitude;
  const validLongitude = isNaN(longitude) ? 0 : longitude;

  // Função para formatar a distância
  const formatDistance = (distanceMeters: number): string => {
    if (distanceMeters >= 1000) {
      return `${(distanceMeters / 1000).toFixed(2)} km`;
    }
    return `${Math.round(distanceMeters)} m`;
  };

  // Função para formatar o tipo (substituir underscores por espaços e capitalizar)
  const formatTipo = (tipo: string): string => {
    if (!tipo) return '';
    const formatted = tipo.replaceAll('_', ' ');
    return formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();
  };

  // Função para obter cor da polyline com base no tipo
  const getColorByType = (tipo: string): string => {
    return {
      ESCOLA: 'purple',
      HOSPITAL: 'red',
      POSTO_DE_COMBUSTIVEL: 'orange',
      PARQUE: 'green',
      default: 'green',
    }[tipo] || 'green';
  };

  // Ordenar proximidades por distância
  const sortedProximidades = [...proximidades].sort((a, b) => {
    const distA = L.latLng(validLatitude, validLongitude).distanceTo([a.latitude, a.longitude]);
    const distB = L.latLng(validLatitude, validLongitude).distanceTo([b.latitude, b.longitude]);
    return distA - distB;
  });

  // Ajustar limites do mapa para incluir todos os marcadores
  useEffect(() => {
    if (mapRef.current) {
      if (proximidades.length > 0) {
        const bounds = L.latLngBounds([
          [validLatitude, validLongitude],
          ...proximidades.map((prox) => [prox.latitude, prox.longitude] as [number, number]),
        ]);
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      } else {
        mapRef.current.setView([validLatitude, validLongitude], 15);
      }
    }
  }, [validLatitude, validLongitude, proximidades]);

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
            <p>Preço por dia: {preco != null ? preco.toFixed(2) : 'N/A'} AOA</p>
            <p>Preço por mês: {precoMensal != null ? precoMensal.toFixed(2) : 'N/A'} AOA</p>
          </div>
        </Tooltip>
      </Marker>
      {sortedProximidades.map((prox) => {
        // Calcular distância em metros
        const distanceMeters = L.latLng(validLatitude, validLongitude).distanceTo([
          prox.latitude,
          prox.longitude,
        ]);
        return (
          <div key={prox.id}>
            <Marker position={[prox.latitude, prox.longitude]} icon={customIcon}>
              <Tooltip>
                <div>
                  <strong>{prox.nome}</strong>
                  <p>Tipo: {formatTipo(prox.tipo)}</p>
                  <p>Distância: {formatDistance(distanceMeters)}</p>
                </div>
              </Tooltip>
            </Marker>
            <Polyline
              positions={[[validLatitude, validLongitude], [prox.latitude, prox.longitude]]}
              color={getColorByType(prox.tipo)}
              weight={3}
              opacity={0.7}
            />
          </div>
        );
      })}
    </MapContainer>
  );
}