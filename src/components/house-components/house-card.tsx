import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bath, Bed, Heart, ChevronLeft, ChevronRight, Car, DollarSign, Flag, Home, MapPin, ParkingCircle, Map, Pin } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from "react";
import Image from 'next/image';
import { ImovelLDto } from '@/app/model/type';
import DialogContentComponent from './house-dialog-details-components';


interface HouseCardProps {
  imovel: ImovelLDto;
  onClick?: (imovelId: string) => void;
}

export function HouseCard({ imovel, onClick }: HouseCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isModalOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500); // 1.5 seconds delay

      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === (imovel.imagens?.length || 0) - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (imovel.imagens?.length || 0) - 1 : prevIndex - 1
    );
  };

  const handleImageChange = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const currentImageUrl =
    Array.isArray(imovel.imagens) && imovel.imagens.length > 0
      ? imovel.imagens[currentImageIndex].url
      : "/imoveis/img/11.jpg";

  // const DialogContentComponent = () => {
  //   if (isLoading) {
  //     return (
  //       <div className="w-full h-full flex">
  //         {/* Left column skeleton */}
  //         <div className="w-1/2 pr-4 space-y-4">
  //           <Skeleton className="w-full h-48" />
  //           <div className="grid grid-cols-2 gap-4">
  //             <Skeleton className="w-full h-32" />
  //             <Skeleton className="w-full h-32" />
  //             <Skeleton className="w-full h-32" />
  //             <Skeleton className="w-full h-32" />
  //           </div>
  //         </div>

  //         {/* Right column skeleton */}
  //         <div className="w-1/2 pl-4 space-y-4">
  //           <div className="flex space-x-2 mb-4">
  //             <Skeleton className="h-10 w-24" />
  //             <Skeleton className="h-10 w-24" />
  //           </div>
  //           <Skeleton className="w-full h-24" />
  //           <div className="space-y-2">
  //             <Skeleton className="w-full h-12" />
  //             <div className="grid grid-cols-2 gap-4">
  //               {[...Array(8)].map((_, i) => (
  //                 <Skeleton key={i} className="h-8 w-full" />
  //               ))}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }

  //   return (
  //     <>
  //       {/* Left Column: Images */}
  //       <div className="w-1/2 pr-4">
  //         <ScrollArea className="h-full">
  //           <div className="space-y-4">
  //             {imovel?.imagens?.[0] && (
  //               <div className="w-full h-48 bg-gray-200">
  //                 <Image
  //                   src={imovel.imagens[0].url}
  //                   alt="Imagem principal"
  //                   className="w-full h-full object-cover"
  //                  width={300}
  //                  height={200}
  //                 />
  //               </div>
  //             )}
  //             <div className="grid grid-cols-2 gap-4">
  //               {imovel?.imagens?.slice(1).map((imagem, index) => (
  //                 <div
  //                   key={index}
  //                   className="w-full h-32 bg-gray-200 overflow-hidden"
  //                 >
  //                   <Image
  //                     src={imagem.url}
  //                     alt={`Imagem ${index + 2}`}
  //                     className="w-full h-full object-cover"
  //                     width={300}
  //                     height={200}
  //                   />
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         </ScrollArea>
  //       </div>

  //       {/* Right Column: Tabs */}
  //       <div className="w-1/2 pl-4">
  //         <ScrollArea className="h-full">
  //           <Tabs defaultValue="descricao">
  //             <TabsList className="mb-4">
  //               <TabsTrigger value="descricao">Descrição</TabsTrigger>
  //               <TabsTrigger value="proximidades">Proximidades</TabsTrigger>
  //             </TabsList>

  //             <TabsContent value="descricao">
  //               <div className="grid grid-cols-1 gap-8">
  //                 <div>
  //                   <p className="text-lg font-semibold">Descrição</p>
  //                   <p className="mt-2 text-sm text-muted-foreground">{imovel.descricao}</p>
  //                 </div>
  //                 <hr/>
  //                 <div>
  //                   <p className="text-lg font-semibold">Detalhes</p>
  //                 </div>
  //                 <div className="grid grid-cols-2 gap-6 -mt-4">
  //                   <div className="flex items-center space-x-2">
  //                     <DollarSign className="h-5 w-5 text-primary text-blue-600" />
  //                     <p><strong>Preço:</strong> <span className="text-sm">{imovel.preco} AKZ</span></p>
  //                   </div>
  //                   <div className="flex items-center space-x-2">
  //                     <Home className="h-5 w-5 text-primary text-blue-600" />
  //                     <p><strong>Tipologia:</strong> <span className="text-sm">{imovel.tipologia}</span></p>
  //                   </div>
  //                   <div className="flex items-center space-x-2">
  //                     <Bed className="h-5 w-5 text-primary text-blue-600" />
  //                     <p><strong>Quartos:</strong> <span className="text-sm">{imovel.numeroQuarto}</span></p>
  //                   </div>
  //                   <div className="flex items-center space-x-2">
  //                     <Bath className="h-5 w-5 text-primary text-blue-600" />
  //                     <p><strong>Banheiros:</strong> <span className="text-sm">{imovel.numeroCasaBanho}</span></p>
  //                   </div>
  //                   <div className="flex items-center space-x-2">
  //                     <ParkingCircle className="h-5 w-5 text-primary text-blue-600" />
  //                     <p><strong>Garagem:</strong> <span className="text-sm">{imovel.garagem ? "Sim" : "Não"}</span></p>
  //                   </div>
  //                   <div className="flex items-center space-x-2">
  //                     <Map className="h-5 w-5 text-primary text-blue-600" />
  //                     <p><strong>Bairro:</strong> <span className="text-sm">{imovel.bairro}</span></p>
  //                   </div>
  //                   <div className="flex items-center space-x-2">
  //                     <Flag className="h-5 w-5 text-primary text-blue-600" />
  //                     <p><strong>Município:</strong> <span className="text-sm">{imovel.municipio}</span></p>
  //                   </div>
  //                 </div>
  //               </div>
  //             </TabsContent>

  //             <TabsContent value="proximidades">
  //               <div className="grid grid-cols-3 gap-4">
  //                 {imovel.proximidades.length > 0 ? (
  //                   imovel.proximidades.map((local, index) => (
  //                     <p key={index} className="text-sm text-muted-foreground">
  //                       {local.nome}
  //                     </p>
  //                   ))
  //                 ) : (
  //                   <p className="text-sm text-muted-foreground col-span-3">
  //                     Nenhuma proximidade informada.
  //                   </p>
  //                 )}
  //               </div>
  //             </TabsContent>
  //           </Tabs>
  //         </ScrollArea>
  //       </div>
  //     </>
  //   );
  // };

  return (
    <>
      <div onClick={handleCardClick} className="cursor-pointer">
        <Card className="max-w-lg w-full rounded-md mt-6 relative">
          <CardContent className="relative w-full h-52 rounded-md overflow-hidden group">
            <Image
              src={currentImageUrl}
              alt={imovel.titulo}
              className="w-full h-full object-cover rounded-md transition-transform duration-700 ease-in-out transform-gpu"
              fill
              style={{ objectFit: "cover" }}
              
            />



            <div
              onClick={toggleFavorite}
              className={`absolute top-2 right-2 cursor-pointer p-1 rounded-md ${isFavorited ? "bg-white" : ""}`}
            >
              <Heart className={`w-6 h-6 ${isFavorited ? "fill-red-600 text-red-600" : "text-red-600"}`} />
            </div>
            {Array.isArray(imovel.imagens) && imovel.imagens.length > 1 && (
              <>
                <Button
                  onClick={handlePreviousImage}
                  className="w-7 h-7 flex justify-center items-center absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-0 opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity"
                >
                  <ChevronLeft className="w-3 h-3" />
                </Button>
                <Button
                  onClick={handleNextImage}
                  className="w-7 h-7 flex justify-center items-center absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-0 opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity"
                >
                  <ChevronRight className="w-3 h-3" />
                </Button>
              </>
            )}
            {Array.isArray(imovel.imagens) && imovel.imagens.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {imovel.imagens.map((_, index) => (
                  <div
                    key={index}
                    onClick={(e) => handleImageChange(index, e)}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                      index === currentImageIndex ? "bg-white" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </CardContent>
          <div className="p-2">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold">{imovel.titulo}</div>
              <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold pointer-events-none">
                {imovel.preco} AKZ
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Pin className="w-4 h-4 mr-1" />
              {imovel.provincia} - {imovel.bairro}
            </div>
          </div>
          <CardFooter className="flex justify-between items-center bg-blue-50 p-2">
            <div className="text-xs font-bold">{imovel.tipologia}</div>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <Bed className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
                <span className="text-sm font-bold ml-1 -mt-1">{imovel.numeroQuarto}</span>
              </div>
              <div className="flex items-center">
                <Bath className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
                <span className="text-sm font-bold ml-1 -mt-1">{imovel.numeroCasaBanho}</span>
              </div>
              <div className="flex items-center">
                <Car className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
                <span className="text-sm font-bold ml-1 -mt-1">{imovel.garagem ? "1" : "0"}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
          <DialogContent className="max-w-6xl h-[80vh] flex">
            <DialogContentComponent isLoading={isLoading} imovel={imovel} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}