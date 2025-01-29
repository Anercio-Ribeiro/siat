import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from 'next/dynamic';
// import ProximidadeDialog from './proximidade-component';
import ProximidadeDialog from './proximidade-component';

interface Proximidade {
  id: string;
  nome: string;
  tipo: string;
  latitude: number;
  longitude: number;
  distancia: number;
}

interface PaginationData {
  total: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

interface MapMarker {
  lat: number;
  lng: number;
  popup?: string;
}

const MapWithNoSSR = dynamic(() => import('../map-component/proximidade-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-lg">
      <div className="w-full h-full flex items-center justify-center">
        <MapPin className="h-8 w-8 text-gray-400 animate-bounce" />
      </div>
    </div>
  ),
});

const ProximidadeCardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-col space-y-2 pb-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <div className="h-px w-full bg-gray-200" />
    </CardHeader>
    <CardContent>
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </CardContent>
  </Card>
);

const ProximidadePage = () => {
  const [proximidades, setProximidades] = useState<Proximidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData | null>(null);

  const fetchProximidades = async (page: number) => {
    try {
      setPageLoading(true);
      const response = await fetch(`/api/proximidades/getAll?page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch proximidades');
      const { data, pagination: paginationData } = await response.json();
      setProximidades(data);
      setPagination(paginationData);
    } catch (error) {
      console.error('Error fetching proximidades:', error);
      setProximidades([]);
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/proximidades/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete proximidade');
      await fetchProximidades(currentPage);
    } catch (error) {
      console.error('Error deleting proximidade:', error);
    }
  };

  useEffect(() => {
    fetchProximidades(currentPage);
  }, [currentPage]);

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
            fetchProximidades(currentPage);
          }}
        />
      </div>

      <Card className="mb-6 relative z-0">
        <CardHeader>
          <CardTitle>Mapa de Proximidades</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: '400px', width: '100%' }}>
            <MapWithNoSSR
              key={proximidades.length}
              markers={mapMarkers}
              onLocationSelected={(lat, lng) => {}}
              selectedLocation={undefined}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <>
            <ProximidadeCardSkeleton />
            <ProximidadeCardSkeleton />
            <ProximidadeCardSkeleton />
          </>
        ) : proximidades.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Nenhuma proximidade encontrada
          </div>
        ) : (
          <>
            {pageLoading ? (
              <>
                <ProximidadeCardSkeleton />
                <ProximidadeCardSkeleton />
                <ProximidadeCardSkeleton />
              </>
            ) : (
              proximidades.map((proximidade) => (
                <Card key={proximidade.id} className="transition-all duration-200 hover:shadow-lg">
                  <CardHeader className="flex flex-col space-y-2 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium pl-6">{proximidade.nome}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(proximidade.id)}
                        className="hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="h-px w-full bg-gray-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="font-medium mr-2">Tipo:</span> {proximidade.tipo}
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium mr-2">Distância:</span> {proximidade.distancia} km
                      </div>
                      <div className="text-xs text-gray-400">
                        Lat: {proximidade.latitude.toFixed(6)}, Long:{' '}
                        {proximidade.longitude.toFixed(6)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </>
        )}
      </div>

      {!loading && pagination && proximidades.length > 0 && (
        <div className="mt-6 flex justify-center items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || pageLoading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600">
            Página {pagination.currentPage} de {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
            disabled={currentPage === pagination.totalPages || pageLoading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProximidadePage;


// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// interface ProximidadeDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSave: () => void;
// }

// const ProximidadeDialog = ({ open, onOpenChange, onSave }: ProximidadeDialogProps) => {
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Adicionar Nova Proximidade</DialogTitle>
//         </DialogHeader>
//         {/* Conteúdo do diálogo */}
//         <Button onClick={onSave}>Salvar</Button>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ProximidadeDialog;