import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bath, Bed, DollarSign, Flag, Home, Map, ParkingCircle, Mail, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ImovelLDto } from '@/app/model/type';
import DialogContentSkeleton from './house-skeleton/DialogContentSkeleton';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import RentalCard from './house-card-rental';

// Dynamic imports
const PropertyLocationMap = dynamic(
  () => import('../map-component/map-component-back'),
  { 
    ssr: false,
    loading: () => <Skeleton className="w-full h-[300px] rounded-lg" />
  }
);

const DynamicDatePicker = dynamic<import('react-datepicker').DatePickerProps>(
  () => import('react-datepicker').then(mod => mod.default) as Promise<React.ComponentType<import('react-datepicker').DatePickerProps>>,
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[300px] rounded-lg" />
  }
);

interface Proximidade {
  id: string;
  nome: string;
  tipo: string;
  latitude: number;
  longitude: number;
  calculated_distance: number;
}

enum TipoAluguel {
  TURISTICO = 'turistico',
  RESIDENCIAL = 'residencial',
  AMBOS = 'ambos'
}

const DialogContentComponent = ({ isLoading, imovel }: { 
  isLoading: boolean;
  imovel: ImovelLDto; 
}) => {
  const [activeTab, setActiveTab] = useState('descricao');
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { data: proximidades = [], isLoading: loadingProximidades } = useQuery({
    queryKey: ['proximidades', imovel?.id],
    queryFn: async () => {
      if (!imovel?.id) return [];
      const response = await fetch(`/api/imoveis/get/${imovel.id}`);
      if (!response.ok) throw new Error('Failed to fetch proximidades');
      return response.json();
    },
    enabled: activeTab === 'proximidades' && !!imovel?.id,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const calculateTotalDays = (start: Date, end: Date): number => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  console.log(imovel.id);

  useEffect(() => {
    if (startDate && endDate && imovel?.preco) {
      const days = calculateTotalDays(startDate, endDate);
      setTotalPrice(days * imovel.preco);
    }
  }, [startDate, endDate, imovel?.preco]);

  const handleTabChange = (value: string) => {
    setIsTabLoading(true);
    setActiveTab(value);
    setTimeout(() => setIsTabLoading(false), 500);
  };

  const ReservaSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/2 mx-auto" />
      <Skeleton className="w-full h-[300px]" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );

  

  if (isLoading) {
    return <DialogContentSkeleton />;
  }

  const DescricaoSkeleton = () => (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-6 w-32 mb-4" />
        <Skeleton className="h-20 w-full" />
      </div>
      <Skeleton className="h-px w-full" />
      <div>
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="grid grid-cols-2 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );


  return (
    <>
    <div className="w-1/2 pr-4">
    <ScrollArea className="h-full">
      <div className="space-y-4">
        {imovel?.imagens?.[0] && (
          <div className="w-full h-48 bg-gray-200">
            <Image
              src={imovel.imagens[0].url}
              alt="Imagem principal"
              className="w-full h-full object-cover"
              width={300}
              height={200}
            />
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          {imovel?.imagens?.slice(1).map((imagem, index) => (
            <div
              key={index}
              className="w-full h-32 bg-gray-200 overflow-hidden"
            >
              <Image
                src={imagem.url}
                alt={`Imagem ${index + 2}`}
                className="w-full h-full object-cover"
                width={300}
                height={200}
              />
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  </div>

      <div className="w-1/2 pl-4">
        <ScrollArea className="h-full">
          <Tabs defaultValue="descricao" onValueChange={handleTabChange}>
            <TabsList className="mb-4">
              <TabsTrigger value="descricao">Descrição</TabsTrigger>
              <TabsTrigger value="localizacao">Localização</TabsTrigger>
              <TabsTrigger value="proximidades">Proximidades</TabsTrigger>
              <TabsTrigger value="reserva">Reserva</TabsTrigger>
            </TabsList>

            <TabsContent value="descricao">
              {isTabLoading && activeTab === 'descricao' ? (
                <DescricaoSkeleton />
              ) : (
                <div className="grid grid-cols-1 gap-8">
                  <div>
                    <p className="text-lg font-semibold">Descrição</p>
                    <p className="mt-2 text-sm text-muted-foreground">{imovel.descricao}</p>
                  </div>
                  <hr/>
                  <div>
                    <p className="text-lg font-semibold">Detalhes</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 -mt-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-primary text-blue-600" />
                      <p><strong>Preço:</strong> <span className="text-sm">{imovel.preco} AKZ</span></p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Home className="h-5 w-5 text-primary text-blue-600" />
                      <p><strong>Tipologia:</strong> <span className="text-sm">{imovel.tipologia}</span></p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bed className="h-5 w-5 text-primary text-blue-600" />
                      <p><strong>Quartos:</strong> <span className="text-sm">{imovel.numeroQuarto}</span></p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bath className="h-5 w-5 text-primary text-blue-600" />
                      <p><strong>Banheiros:</strong> <span className="text-sm">{imovel.numeroCasaBanho}</span></p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ParkingCircle className="h-5 w-5 text-primary text-blue-600" />
                      <p><strong>Garagem:</strong> <span className="text-sm">{imovel.garagem ? "Sim" : "Não"}</span></p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Map className="h-5 w-5 text-primary text-blue-600" />
                      <p><strong>Bairro:</strong> <span className="text-sm">{imovel.bairro}</span></p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Flag className="h-5 w-5 text-primary text-blue-600" />
                      <p><strong>Município:</strong> <span className="text-sm">{imovel.municipio}</span></p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="localizacao">
              {isTabLoading && activeTab === 'localizacao' ? (
                <div className="space-y-4">
                  <Skeleton className="w-full h-[300px] rounded-lg" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <PropertyLocationMap 
                    latitude={imovel.latitude} 
                    longitude={imovel.longitude}
                  />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <Map className="h-5 w-5 text-primary text-blue-600" />
                      <p><strong>Latitude:</strong> <span className="text-sm">{imovel.latitude.toFixed(6)}</span></p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Map className="h-5 w-5 text-primary text-blue-600" />
                      <p><strong>Longitude:</strong> <span className="text-sm">{imovel.longitude.toFixed(6)}</span></p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Novo Tab de Reserva */}
            <TabsContent value="reserva">
              {isTabLoading ? (
                <ReservaSkeleton />
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">Reserva do Imóvel</h3>
                    <p className="text-muted-foreground">Selecione as datas de locação</p>
                  </div>

{/* <RentalCard pricePerNight={imovel.preco} imovelId={imovel.id} /> */}




<RentalCard 
  imovel={{
    id: imovel.id,
    titulo: imovel.titulo,
    preco: imovel.preco,
    precoMensal: imovel.precoMensal,
    tipoAluguel: imovel.tipoAluguel as TipoAluguel || 'defaultTipoAluguel'
  }} 
/>
                  <Button 
                    className="w-full" 
                    disabled={!startDate || !endDate}
                    onClick={() => window.location.href = `mailto:${imovel.proprietario.email}?subject=Reserva do imóvel ${imovel.id}`}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Contactar Proprietário
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="proximidades">
              {(isTabLoading || loadingProximidades) && activeTab === 'proximidades' ? (
                <div className="space-y-4">
                  <Skeleton className="w-full h-[300px] rounded-lg" />
                  <div className="grid grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-6 w-full" />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <PropertyLocationMap 
                    latitude={imovel.latitude} 
                    longitude={imovel.longitude}
                    proximidades={proximidades}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {proximidades?.map((proximidade: Proximidade) => (
                      <div 
                        key={proximidade.id} 
                        className="p-3 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <p className="font-medium text-sm">{proximidade.nome}</p>
                        <p className="text-sm text-gray-600">{proximidade.tipo}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {proximidade.calculated_distance.toFixed(2)} km de distância
                        </p>
                      </div>
                    ))}
                    {(!proximidades || proximidades.length === 0) && (
                      <div className="col-span-full text-center py-4 text-gray-500">
                        Nenhuma proximidade encontrada em um raio de 5km
                      </div>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>
            
          </Tabs>
        </ScrollArea>
      </div>
    </>
  );
};

export default DialogContentComponent;