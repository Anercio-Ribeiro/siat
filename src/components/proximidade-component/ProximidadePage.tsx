import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import ProximidadeDialog from './proximidade-component';

interface Proximidade {
  id: string;
  nome: string;
  tipo: string;
  latitude: number;
  longitude: number;
  distancia: number;
}

interface MapMarker {
  lat: number;
  lng: number;
  popup?: string;
}

const MapWithNoSSR = dynamic(() => import('../map-component/proximidade-map'), {
  ssr: false,
});

const ProximidadePage = () => {
  const [proximidades, setProximidades] = useState<Proximidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchProximidades = async () => {
    try {
      const response = await fetch('/api/proximidades/getAll');
      if (!response.ok) throw new Error('Failed to fetch proximidades');
      const data = await response.json(); // Assumindo que o backend retorna um array diretamente
      console.log('Dados recebidos:', data); // Debug para verificar o retorno
      setProximidades(data);
    } catch (error) {
      console.error('Error fetching proximidades:', error);
      setProximidades([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/proximidades/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete proximidade');
      await fetchProximidades();
    } catch (error) {
      console.error('Error deleting proximidade:', error);
    }
  };

  useEffect(() => {
    fetchProximidades();
  }, []);

  const mapMarkers: MapMarker[] = proximidades.map((p) => ({
    lat: p.latitude,
    lng: p.longitude,
    popup: `${p.nome} (${p.tipo})`,
  }));

  return (
    <div className="container mx-auto p-6 relative">

      <div className="relative z-50">
        <ProximidadeDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSave={() => {
            setIsDialogOpen(false);
            fetchProximidades();
          }}
        />
      </div>

      <Card className="mb-6 relative z-0">
        <CardHeader>
          <CardTitle>Mapa de Proximidades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <MapWithNoSSR
              markers={mapMarkers}
              onLocationSelected={(lat, lng) => {}}
              selectedLocation={null}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div>Carregando...</div>
        ) : proximidades.length === 0 ? (
          <div>Nenhuma proximidade encontrada</div>
        ) : (
          proximidades.map((proximidade) => (
            <Card key={proximidade.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{proximidade.nome}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(proximidade.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {proximidade.tipo}
                  </div>
                  <div className="text-sm text-gray-500">Distância: {proximidade.distancia} km</div>
                  <div className="text-xs text-gray-400">
                    Lat: {proximidade.latitude.toFixed(6)}, Long:{' '}
                    {proximidade.longitude.toFixed(6)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ProximidadePage;
