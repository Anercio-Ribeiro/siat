'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { ImovelLDto } from '@/app/model/type';
import L from 'leaflet';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DialogContentComponent from './house-components/house-dialog-details-components';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

interface MapViewProps {
  imoveis: ImovelLDto[];
}

const createCustomIcon = () =>
  new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

function ClusterGroup({ imoveis, setSelectedImovel, setIsLoading }: MapViewProps & {
  setSelectedImovel: (imovel: ImovelLDto | null) => void;
  setIsLoading: (loading: boolean) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const clusterGroup = new L.MarkerClusterGroup({
      iconCreateFunction: (cluster: L.MarkerCluster) => {
        return L.divIcon({
          html: `<div style="background-color: #3182ce; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold;">${cluster.getChildCount()}</div>`,
          className: '',
          iconSize: [40, 40],
        });
      },
      maxClusterRadius: 50,
    });

    imoveis.forEach((imovel) => {
      if (imovel.latitude && imovel.longitude) {
        const marker = L.marker([imovel.latitude, imovel.longitude], {
          icon: createCustomIcon(),
        });
        marker.bindTooltip(`
          <div class="p-2">
            <h3 class="font-bold">${imovel.titulo}</h3>
            <p>Preço: ${imovel.preco} AKZ</p>
            <p>Preço Mensal: ${imovel.precoMensal} AKZ</p>
          </div>
        `);
        marker.on('click', () => {
          setSelectedImovel(imovel);
          setIsLoading(true);
          setTimeout(() => setIsLoading(false), 1500);
        });
        clusterGroup.addLayer(marker);
      }
    });

    map.addLayer(clusterGroup);

    return () => {
      map.removeLayer(clusterGroup);
    };
  }, [map, imoveis, setSelectedImovel, setIsLoading]);

  return null;
}

function MapBoundsUpdater() {
  // This component prepares for dynamic bounds-based fetching
  useMapEvents({
    moveend: () => {
      // TODO: Fetch properties within map bounds
      // const bounds = map.getBounds();
      // const minLat = bounds.getSouth();
      // const maxLat = bounds.getNorth();
      // const minLng = bounds.getWest();
      // const maxLng = bounds.getEast();
      // const zoom = map.getZoom();
      // Call API with bounds: fetchImoveis({ ...filters, minLat, maxLat, minLng, maxLng, zoom })
    },
  });
  return null;
}

function MapView({ imoveis }: MapViewProps) {
  const [selectedImovel, setSelectedImovel] = useState<ImovelLDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const center: [number, number] = [-8.8383, 13.2344];

  if (!isClient) {
    return <div className="h-[600px] flex items-center justify-center">Loading map...</div>;
  }

  return (
    <div className="relative w-full h-[600px]">
      <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ClusterGroup
          imoveis={imoveis}
          setSelectedImovel={setSelectedImovel}
          setIsLoading={setIsLoading}
        />
        <MapBoundsUpdater />
      </MapContainer>

      {selectedImovel && (
        <Dialog open={!!selectedImovel} onOpenChange={() => setSelectedImovel(null)}>
          <DialogContent className="max-w-6xl h-[80vh] flex">
            <DialogContentComponent isLoading={isLoading} imovel={selectedImovel} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default MapView;