
// "use client";

// import { useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
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
//   titulo: string;
//   preco: number;
//   precoMensal?: number;
//   endereco: string;
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
//   titulo,
//   preco,
//   precoMensal,
//   endereco,
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
//       attribution: "© OpenStreetMap contributors",
//     }).addTo(mapRef.current);

//     // Adicionar marcador da localização principal com tooltip
//     const mainMarker = L.marker([latitude, longitude]).addTo(mapRef.current);

//     // Adicionar popup
//     mainMarker.bindPopup("Localização do Imóvel");

//     // Adicionar tooltip com informações do imóvel
//     mainMarker.bindTooltip(`
//       <div>
//         <strong>${titulo}</strong><br />
//         Endereço: ${endereco}<br />
//         Preço: ${preco.toLocaleString("pt-BR", { style: "currency", currency: "AOA" })}<br />
//         ${precoMensal ? `Preço Mensal: ${precoMensal.toLocaleString("pt-BR", { style: "currency", currency: "AOA" })}` : ""}
//       </div>
//     `, {
//       permanent: false,
//       direction: "top",
//       className: "property-tooltip",
//     });

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
//   }, [latitude, longitude, titulo, preco, precoMensal, endereco, proximidades, mapId]);

//   return <div ref={containerRef} id={mapId} style={{ height: "300px", width: "100%" }} />;
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
  mapId: string;
  latitude: number;
  longitude: number;
  titulo: string;
  preco: number;
  precoMensal?: number;
  endereco: string;
  proximidades?: Proximidade[];
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
      id={mapId}
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
            <p>Endereço: {endereco}</p>
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
                  <p>Categoria: {formatTipo(prox.tipo)}</p>
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