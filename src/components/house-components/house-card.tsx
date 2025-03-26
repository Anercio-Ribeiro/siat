import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
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
import { useFavorites } from '@/hooks/useFavoritos';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useUser } from '../../hooks/getUser';

interface HouseCardProps {
  imovel: ImovelLDto;
  onClick?: (imovelId: string) => void;
}

export function HouseCard({ imovel, onClick }: HouseCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const { user } = useUser();
  const [isFavorited, setIsFavorited] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isModalOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`/api/favorites?userId=${user.id}&imovelId=${imovel.id}`);
          const data = await response.json();
          setIsFavorited(data.isFavorite);
        } catch (error) {
          console.error('Erro ao verificar status do favorito:', error);
        }
      }
    };
    checkFavoriteStatus();
  }, [user?.id, imovel.id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      setIsAuthDialogOpen(true);
      return;
    }

    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          imovelId: imovel.id,
        }),
      });

      const data = await response.json();
      setIsFavorited(data.isFavorite);
      data.isFavorite ? toast.success('Adicionado aos favoritos') : toast.error('Removido dos favoritos');
    } catch (error) {
      console.error('Erro ao toggle favorito:', error);
    }
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
              className={`absolute top-2 right-2 cursor-pointer p-1 rounded-md ${
                isFavorited ? "bg-white" : ""
              }`}
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorited ? "fill-red-600 text-red-600" : "text-red-600"
                }`}
              />
            </div>
            {/* Rest of the CardContent remains the same */}
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
          {/* Rest of the Card remains the same */}
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

      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Autenticação Necessária</DialogTitle>
            <DialogDescription>
              Apenas usuários autenticados podem adicionar imóveis à lista de favoritos. 
              Por favor, faça login ou crie uma conta para usar esta funcionalidade.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={() => {
                setIsAuthDialogOpen(false);
                router.push('/authenticate');
              }}
            >
              Ir para Autenticação
            </Button>
            <Button 
              variant="outline"
              onClick={() => setIsAuthDialogOpen(false)}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}