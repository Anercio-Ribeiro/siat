import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

type MapProps = {
  onLocationSelected: (lat: number, lng: number) => void;
  markers: Array<{
    latitude: number;
    longitude: number;
    nome: string;
    tipo: string;
  }>;
};

function MapEvents({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const MapComponent = ({ onLocationSelected, markers = [] }: MapProps) => {
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    // Centralizar no primeiro marcador se existir
    if (markers.length > 0 && mapRef.current) {
      const { latitude, longitude } = markers[0];
      mapRef.current.setView([latitude, longitude], 13);
    }
  }, [markers]);

  return (
    <MapContainer
      center={[-8.838333, 13.234444]} // Coordenadas de Luanda
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      <MapEvents onClick={onLocationSelected} />

      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.latitude, marker.longitude]}
          icon={L.divIcon({
            className: 'custom-marker',
            html: `<div class="p-2 bg-primary text-white rounded-full">${marker.tipo}</div>`
          })}
        >
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;