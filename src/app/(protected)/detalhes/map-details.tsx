// "use client";

// import { useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Corrigir ícones padrão do Leaflet (problema comum em React)
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// interface MapProps {
//   mapId: string;
//   latitude: number;
//   longitude: number;
//   proximidades?: {
//     id: string;
//     nome: string;
//     tipo: string;
//     latitude: number;
//     longitude: number;
//     calculated_distance: number;
//   }[];
// }

// export default function PropertyLocationMap({ mapId, latitude, longitude, proximidades }: MapProps) {
//   const mapRef = useRef<L.Map | null>(null);

//   useEffect(() => {
//     if (mapRef.current) {
//       mapRef.current.setView([latitude, longitude], 13);
//     }
//   }, [latitude, longitude]);

//   return (
//     <MapContainer
//       id={mapId}
//       center={[latitude, longitude]}
//       zoom={13}
//       style={{ height: "300px", width: "100%" }}
//       ref={mapRef}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {/* Marker do imóvel principal */}
//       <Marker position={[latitude, longitude]}>
//         <Popup>Localização do Imóvel</Popup>
//       </Marker>
//       {/* Markers das proximidades */}
//       {proximidades?.map((prox) => (
//         <Marker
//           key={prox.id}
//           position={[prox.latitude, prox.longitude]}
//         >
//           <Popup>
//             {prox.nome} ({prox.calculated_distance.toFixed(1)} km)
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// }








// src/app/(protected)/detalhes/map-details.tsx
"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Corrigir ícone padrão do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface PropertyLocationMapProps {
  mapId: string;
  latitude: number;
  longitude: number;
  proximidades?: {
    id: string;
    nome: string;
    tipo: string;
    latitude: number;
    longitude: number;
    calculated_distance: number;
  }[];
}

export default function PropertyLocationMap({
  mapId,
  latitude,
  longitude,
  proximidades = [],
}: PropertyLocationMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Criar o mapa apenas se ainda não foi inicializado
    mapRef.current = L.map(containerRef.current, {
      center: [latitude, longitude],
      zoom: 13,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    // Adicionar marcador da localização principal
    L.marker([latitude, longitude])
      .addTo(mapRef.current)
      .bindPopup("Localização do Imóvel");

    // Adicionar marcadores de proximidades, se houver
    proximidades.forEach((prox) => {
      if (mapRef.current) {
        L.marker([prox.latitude, prox.longitude])
          .addTo(mapRef.current)
          .bindPopup(`${prox.nome} (${prox.calculated_distance} km)`);
      }
    });

    // Limpar o mapa ao desmontar o componente
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [latitude, longitude, proximidades, mapId]);

  return <div ref={containerRef} id={mapId} style={{ height: "300px", width: "100%" }} />;
}