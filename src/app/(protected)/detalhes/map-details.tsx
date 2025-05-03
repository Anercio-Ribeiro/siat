// "use client";

// import { useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Corrigir ícone padrão do Leaflet
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// interface PropertyLocationMapProps {
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

// export default function PropertyLocationMap({
//   mapId,
//   latitude,
//   longitude,
//   proximidades = [],
// }: PropertyLocationMapProps) {
//   const mapRef = useRef<L.Map | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!containerRef.current || mapRef.current) return;

//     // Criar o mapa apenas se ainda não foi inicializado
//     mapRef.current = L.map(containerRef.current, {
//       center: [latitude, longitude],
//       zoom: 13,
//     });

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "&copy; OpenStreetMap contributors",
//     }).addTo(mapRef.current);

//     // Adicionar marcador da localização principal
//     L.marker([latitude, longitude])
//       .addTo(mapRef.current)
//       .bindPopup("Localização do Imóvel");

//     // Adicionar marcadores de proximidades, se houver
//     proximidades.forEach((prox) => {
//       if (mapRef.current) {
//         L.marker([prox.latitude, prox.longitude])
//           .addTo(mapRef.current)
//           .bindPopup(`${prox.nome} (${prox.calculated_distance} km)`);
//       }
//     });

//     // Limpar o mapa ao desmontar o componente
//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, [latitude, longitude, proximidades, mapId]);

//   return <div ref={containerRef} id={mapId} style={{ height: "300px", width: "100%" }} />;
// }




"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
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
  titulo: string;
  preco: number;
  precoMensal?: number;
  endereco: string;
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
  titulo,
  preco,
  precoMensal,
  endereco,
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
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapRef.current);

    // Adicionar marcador da localização principal com tooltip
    const mainMarker = L.marker([latitude, longitude]).addTo(mapRef.current);

    // Adicionar popup
    mainMarker.bindPopup("Localização do Imóvel");

    // Adicionar tooltip com informações do imóvel
    mainMarker.bindTooltip(`
      <div>
        <strong>${titulo}</strong><br />
        Endereço: ${endereco}<br />
        Preço: ${preco.toLocaleString("pt-BR", { style: "currency", currency: "AOA" })}<br />
        ${precoMensal ? `Preço Mensal: ${precoMensal.toLocaleString("pt-BR", { style: "currency", currency: "AOA" })}` : ""}
      </div>
    `, {
      permanent: false,
      direction: "top",
      className: "property-tooltip",
    });

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
  }, [latitude, longitude, titulo, preco, precoMensal, endereco, proximidades, mapId]);

  return <div ref={containerRef} id={mapId} style={{ height: "300px", width: "100%" }} />;
}