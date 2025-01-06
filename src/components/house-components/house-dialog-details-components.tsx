import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bath, Bed, DollarSign, Flag, Home, Map, ParkingCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ImovelLDto } from '@/app/model/type';
import DynamicMap from '../map-component/map-component-back';

const DialogContentComponent = ({ isLoading, imovel }: { 
  isLoading: boolean;
  imovel: ImovelLDto; 
}) => {
  const [mapKey, setMapKey] = useState(0); // Force map re-render when dialog opens

  useEffect(() => {
    if (!isLoading) {
      setMapKey(prev => prev + 1);  // Trigger map re-render when loading completes
    }
  }, [isLoading]);

  if (isLoading) {
    // Return skeleton loading state
    return (

        <div className="w-full h-full flex">
        {/* Left column skeleton */}
        <div className="w-1/2 pr-4 space-y-4">
          <Skeleton className="w-full h-48" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-32" />
          </div>
        </div>

        {/* Right column skeleton */}
        <div className="w-1/2 pl-4 space-y-4">
          <div className="flex space-x-2 mb-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Skeleton className="w-full h-24" />
          <div className="space-y-2">
            <Skeleton className="w-full h-12" />
            <div className="grid grid-cols-2 gap-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <Tabs defaultValue="descricao">
            <TabsList className="mb-4">
              <TabsTrigger value="descricao">Descrição</TabsTrigger>
              <TabsTrigger value="proximidades">Proximidades</TabsTrigger>
            </TabsList>

            <TabsContent value="descricao">
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
            </TabsContent>

            <TabsContent value="proximidades">
              <div className="space-y-4">
                {/* Show map at the top of proximities tab */}
                {imovel.proximidades && imovel.proximidades.length > 0 && (
                  <div className="rounded-lg overflow-hidden border">
                    {/* <MapComponent key={mapKey} /> */}
                    {/* <DynamicMap proximidades={[]}  /> */}
                    <DynamicMap proximidades={imovel.proximidades} />
                  </div>
                )}
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {imovel.proximidades.length > 0 ? (
                    imovel.proximidades.map((local, index) => (
                      <p key={index} className="text-sm text-muted-foreground">
                        {local.nome}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground col-span-3">
                      Nenhuma proximidade informada.
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
    </>
  );
};

export default DialogContentComponent;