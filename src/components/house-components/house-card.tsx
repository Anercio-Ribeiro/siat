// "use client"

// import {
//   Card,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import { IoLocationOutline, IoHeartOutline, IoHeart, IoBedOutline, IoCarSportOutline } from "react-icons/io5";
// import { useState } from "react";
// import { FaShower } from "react-icons/fa";
// import { ImovelLDto } from "@/app/model/type";

// interface HouseCardProps {
//   imovel: ImovelLDto; // Certifique-se de que este tipo está correto
// }

// export function HouseCard({ imovel }: HouseCardProps) {
//   const [isFavorited, setIsFavorited] = useState(false);

//   const toggleFavorite = () => {
//     setIsFavorited(!isFavorited);
//   };

//   const imageUrl = imovel.imagens.length > 0 ? imovel.imagens[0].url : '/default-image.jpg'; // Agora acessa o campo 'url' corretamente

//   return (

//     <div>
//     <Card className="max-w-lg w-full rounded-md mt-6 relative">
//       <CardContent className="relative w-full h-52 rounded-md">
//         <Image
//           src={imageUrl}
//           alt={imovel.titulo}
//           fill
//           style={{ objectFit: "cover" }}
//           className="w-full h-full rounded-md"
//         />
//         <div
//           onClick={toggleFavorite}
//           className={`absolute top-2 right-2 cursor-pointer p-1 rounded-md ${isFavorited ? "bg-white" : ""}`}
//         >
//           {isFavorited ? (
//             <IoHeart className="w-6 h-6 text-red-600" />
//           ) : (
//             <IoHeartOutline className="w-6 h-6 text-red-600" />
//           )}
//         </div>
//       </CardContent>
//       <div className="p-2">
//         <div className="flex justify-between items-center">
//           <div className="text-sm font-bold">{imovel.titulo}</div>
//           <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">
//             R$ {imovel.preco}
//           </Badge>
//         </div>
//         <div className="flex items-center text-sm text-muted-foreground mt-1">
//           <IoLocationOutline className="mr-1" />{imovel.provincia} - {imovel.bairro}
//         </div>
//       </div>
//       <CardFooter className="flex justify-between items-center bg-blue-50 p-2">
//         <div className="text-xs font-bold"> {imovel.tipologia}</div>
//         <div className="flex space-x-4">
//           <div className="flex items-center">
//             <IoBedOutline className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
//             <span className="text-sm font-bold ml-1 -mt-1">{imovel.numeroQuarto}</span>
//           </div>
//           <div className="flex items-center">
//             <FaShower className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
//             <span className="text-sm font-bold ml-1 -mt-1">{imovel.numeroCasaBanho}</span>
//           </div>
//           <div className="flex items-center">
//             <IoCarSportOutline className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
//             <span className="text-sm font-bold ml-1 -mt-1">{imovel.garagem}</span>
//           </div>
//         </div>
//       </CardFooter>
//     </Card>
//   </div>
  

//   );
// }


"use client";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { IoLocationOutline, IoHeartOutline, IoHeart, IoBedOutline, IoCarSportOutline } from "react-icons/io5";
import { useState } from "react";
import { FaShower } from "react-icons/fa";
import { ImovelLDto } from "@/app/model/type";

interface HouseCardProps {
  imovel: ImovelLDto;
}

export function HouseCard({ imovel }: HouseCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Para controlar a imagem atual no slide

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imovel.imagens.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imovel.imagens.length - 1 : prevIndex - 1
    );
  };

  // Pegar a URL da imagem atual do slide ou usar uma imagem padrão
  const currentImageUrl =
    imovel.imagens.length > 0 ? imovel.imagens[currentImageIndex].url : '/default-image.jpg';

  return (
    <div>
      <Card className="max-w-lg w-full rounded-md mt-6 relative">
        <CardContent className="relative w-full h-52 rounded-md">
          <Image
            src={currentImageUrl}
            alt={imovel.titulo}
            fill
            style={{ objectFit: "cover" }}
            className="w-full h-full rounded-md"
          />
          <div
            onClick={toggleFavorite}
            className={`absolute top-2 right-2 cursor-pointer p-1 rounded-md ${
              isFavorited ? "bg-white" : ""
            }`}
          >
            {isFavorited ? (
              <IoHeart className="w-6 h-6 text-red-600" />
            ) : (
              <IoHeartOutline className="w-6 h-6 text-red-600" />
            )}
          </div>

          {/* Controles de navegação do slide */}
          {imovel.imagens.length > 1 && (
            <>
              <button
                onClick={handlePreviousImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
              >
                &lt;
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
              >
                &gt;
              </button>
            </>
          )}
        </CardContent>
        <div className="p-2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-bold">{imovel.titulo}</div>
            <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">
              R$ {imovel.preco}
            </Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <IoLocationOutline className="mr-1" />{imovel.provincia} - {imovel.bairro}
          </div>
        </div>
        <CardFooter className="flex justify-between items-center bg-blue-50 p-2">
          <div className="text-xs font-bold"> {imovel.tipologia}</div>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <IoBedOutline className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
              <span className="text-sm font-bold ml-1 -mt-1">{imovel.numeroQuarto}</span>
            </div>
            <div className="flex items-center">
              <FaShower className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
              <span className="text-sm font-bold ml-1 -mt-1">{imovel.numeroCasaBanho}</span>
            </div>
            <div className="flex items-center">
              <IoCarSportOutline className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
              <span className="text-sm font-bold ml-1 -mt-1">{imovel.garagem}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
