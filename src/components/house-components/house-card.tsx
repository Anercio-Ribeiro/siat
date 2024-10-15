// "use client"

// import {
//   Card,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import { Separator } from "@/components/ui/separator";
// import { IoLocationOutline, IoHeartOutline, IoHeart } from "react-icons/io5";
// import { useState } from "react";

// export const description = "A collection of health charts.";

// export function HouseCard() {
//   const [isFavorited, setIsFavorited] = useState(false);

//   const toggleFavorite = () => {
//     setIsFavorited(!isFavorited);
//   };

//   return (
//     <div>
//       <Card className="max-w-sm rounded-md mt-6 relative"> {/* Adicionando margin-top e posicionamento relativo para o coração */}
//         <CardContent className="relative w-full h-52 rounded-md">
//           <Image 
//             src="/imoveis/20240723-163550.jpg" 
//             alt={""} 
//             fill 
//             style={{ objectFit: "cover" }} 
//             className="w-full h-full rounded-md"
//           />
//           {/* Coração de favoritos */}
//           <div 
//             onClick={toggleFavorite} 
//             className="absolute top-2 right-2 cursor-pointer text-red-600"
//           >
//             {isFavorited ? (
//               <IoHeart className="w-6 h-6" />
//             ) : (
//               <IoHeartOutline className="w-6 h-6" />
//             )}
//           </div>
//         </CardContent>
//         <div className="p-2">
//           <div className="flex justify-between items-center"> {/* Flex container para alinhar nome e preço */}
//             <div className="text-sm font-bold">Nome do Imóvel</div>
//             <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">
//               R$ 500.000
//             </Badge> {/* Preço dentro do Badge */}
//           </div>
//           <div className="flex items-center text-sm text-muted-foreground mt-1">
//             <IoLocationOutline className="mr-1" /> Localização do Imóvel
//           </div>
//         </div>
//         <CardFooter className="flex flex-row border-t p-4">
//           <div className="flex w-full items-center gap-2">
//             <div className="grid flex-1 auto-rows-min gap-0.5">
//               <div className="text-xs text-muted-foreground">Move</div>
//               <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
//                 562
//                 <span className="text-sm font-normal text-muted-foreground">
//                   kcal
//                 </span>
//               </div>
//             </div>
//             <Separator orientation="vertical" className="mx-2 h-10 w-px" />
//             <div className="grid flex-1 auto-rows-min gap-0.5">
//               <div className="text-xs text-muted-foreground">Exercise</div>
//               <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
//                 73
//                 <span className="text-sm font-normal text-muted-foreground">
//                   min
//                 </span>
//               </div>
//             </div>
//             <Separator orientation="vertical" className="mx-2 h-10 w-px" />
//             <div className="grid flex-1 auto-rows-min gap-0.5">
//               <div className="text-xs text-muted-foreground">Stand</div>
//               <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
//                 14
//                 <span className="text-sm font-normal text-muted-foreground">
//                   hr
//                 </span>
//               </div>
//             </div>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }



// "use client"

// import {
//   Card,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import { Separator } from "@/components/ui/separator";
// import { IoLocationOutline, IoHeartOutline, IoHeart, IoBed, IoShower, IoCarSport } from "react-icons/io5"; // Adicionado ícones
// import { useState } from "react";

// export const description = "A collection of health charts.";

// export function HouseCard() {
//   const [isFavorited, setIsFavorited] = useState(false);

//   const toggleFavorite = () => {
//     setIsFavorited(!isFavorited);
//   };

//   return (
//     <div>
//       <Card className="max-w-sm rounded-md mt-6 relative"> {/* Adicionando margin-top e posicionamento relativo para o coração */}
//         <CardContent className="relative w-full h-52 rounded-md">
//           <Image 
//             src="/imoveis/20240723-163550.jpg" 
//             alt={""} 
//             fill 
//             style={{ objectFit: "cover" }} 
//             className="w-full h-full rounded-md"
//           />
//           {/* Coração de favoritos */}
//           <div 
//             onClick={toggleFavorite} 
//             className="absolute top-2 right-2 cursor-pointer text-red-600"
//           >
//             {isFavorited ? (
//               <IoHeart className="w-6 h-6" />
//             ) : (
//               <IoHeartOutline className="w-6 h-6" />
//             )}
//           </div>
//         </CardContent>
//         <div className="p-2">
//           <div className="flex justify-between items-center"> {/* Flex container para alinhar nome e preço */}
//             <div className="text-sm font-bold">Nome do Imóvel</div>
//             <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">
//               R$ 500.000
//             </Badge> {/* Preço dentro do Badge */}
//           </div>
//           <div className="flex items-center text-sm text-muted-foreground mt-1">
//             <IoLocationOutline className="mr-1" /> Localização do Imóvel
//           </div>
//         </div>
//         <CardFooter className="flex flex-row border-t p-4 bg-blue-100"> {/* Fundo azul claro transparente */}
//           <div className="flex items-center gap-4"> {/* Alinhamento dos ícones */}
//             <div className="flex items-center">
//               <div className="p-2 rounded-full bg-blue-200 mr-1"> {/* Moldura azul mais escura */}
//                 <IoBed className="text-blue-600" />
//               </div>
//               <span className="text-sm text-muted-foreground">3</span> {/* Exemplo de quantidade de quartos */}
//             </div>
//             <div className="flex items-center">
//               <div className="p-2 rounded-full bg-blue-200 mr-1"> {/* Moldura azul mais escura */}
//                 <IoShower className="text-blue-600" />
//               </div>
//               <span className="text-sm text-muted-foreground">2</span> {/* Exemplo de quantidade de casas de banho */}
//             </div>
//             <div className="flex items-center">
//               <div className="p-2 rounded-full bg-blue-200 mr-1"> {/* Moldura azul mais escura */}
//                 <IoCarSport className="text-blue-600" />
//               </div>
//               <span className="text-sm text-muted-foreground">1</span> {/* Exemplo de quantidade de garagens */}
//             </div>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }


// "use client"

// import {
//   Card,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import { IoLocationOutline, IoHeartOutline, IoHeart, IoBed, IoWater, IoCarSport } from "react-icons/io5"; 
// import { useState } from "react";
// import { FaShower } from "react-icons/fa";

// export const description = "A collection of health charts.";

// export function HouseCard() {
//   const [isFavorited, setIsFavorited] = useState(false);

//   const toggleFavorite = () => {
//     setIsFavorited(!isFavorited);
//   };

//   return (
//     <div>
//       <Card className="max-w-sm rounded-md mt-6 relative"> {/* Adicionando margin-top e posicionamento relativo para o coração */}
//         <CardContent className="relative w-full h-52 rounded-md">
//           <Image 
//             src="/imoveis/20240723-163550.jpg" 
//             alt={""} 
//             fill 
//             style={{ objectFit: "cover" }} 
//             className="w-full h-full rounded-md"
//           />
//           {/* Coração de favoritos */}
//           <div 
//             onClick={toggleFavorite} 
//             className="absolute top-2 right-2 cursor-pointer p-1 bg-gray-200 rounded-lg" 
//           >
//             {isFavorited ? (
//               <IoHeart className="w-6 h-6 text-red-600" />
//             ) : (
//               <IoHeartOutline className="w-6 h-6 text-red-600" />
//             )}
//           </div>
//         </CardContent>
//         <div className="p-2">
//           <div className="flex justify-between items-center"> {/* Flex container para alinhar nome e preço */}
//             <div className="text-sm font-bold">Nome do Imóvel</div>
//             <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">
//               R$ 500.000
//             </Badge> {/* Preço dentro do Badge */}
//           </div>
//           <div className="flex items-center text-sm text-muted-foreground mt-1">
//             <IoLocationOutline className="mr-1" /> Localização do Imóvel
//           </div>
//         </div>
//         <CardFooter className="flex flex-row p-2 bg-blue-100 h-12"> {/* Fundo azul claro e altura reduzida */}
//           <div className="flex-1 text-sm text-muted-foreground">Tipologia: Apartamento</div> {/* Texto da tipologia do imóvel à esquerda */}
//           <div className="flex items-center gap-4 justify-end"> {/* Alinhamento dos ícones à direita */}
//             <div className="flex items-center">
//               <div className="p-2 rounded-md bg-customBlue mr-1"> {/* Moldura azul mais escura e quadrada */}
//                 <IoBed className="text-white" />
//               </div>
//               <span className="text-sm text-muted-foreground">3</span> {/* Exemplo de quantidade de quartos */}
//             </div>
//             <div className="flex items-center">
//               <div className="p-2 rounded-md bg-customBlue mr-1"> {/* Moldura azul mais escura e quadrada */}
//                 <FaShower className="text-white" />
//               </div>
//               <span className="text-sm text-muted-foreground">2</span> {/* Exemplo de quantidade de casas de banho */}
//             </div>
//             <div className="flex items-center">
//               <div className="p-2 rounded-md bg-customBlue mr-1"> {/* Moldura azul mais escura e quadrada */}
//                 <IoCarSport className="text-white" />
//               </div>
//               <span className="text-sm text-muted-foreground">1</span> {/* Exemplo de quantidade de garagens */}
//             </div>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }


"use client"

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

export const description = "A collection of health charts.";

export function HouseCard() {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div>
      <Card className="max-w-sm rounded-md mt-6 relative">
        <CardContent className="relative w-full h-52 rounded-md">
          <Image 
            src="/imoveis/20240723-163550.jpg" 
            alt={""} 
            fill 
            style={{ objectFit: "cover" }} 
            className="w-full h-full rounded-md"
          />
          {/* Ícone de favoritos */}
          <div 
            onClick={toggleFavorite} 
            className={`absolute top-2 right-2 cursor-pointer p-1 rounded-md ${!isFavorited ? "" : ""}`}
          >
            {isFavorited ? (
              <IoHeart className="w-6 h-6 text-red-600" />
            ) : (
              <IoHeartOutline className="w-6 h-6 text-red-600" />
            )}
          </div>
        </CardContent>
        <div className="p-2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-bold">Nome do Imóvel</div>
            <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">
              R$ 500.000
            </Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <IoLocationOutline className="mr-1" /> Localização do Imóvel
          </div>
        </div>
        <CardFooter className="flex justify-between items-center bg-blue-50 p-2">
          {/* Texto da tipologia */}
          <div className="text-xs font-bold">Tipologia: T3</div>
          
          <div className="flex space-x-4">
            {/* Quartos */}
            <div className="flex items-center">
              <IoBedOutline className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
              <span className="text-sm font-bold ml-1 -mt-1">3</span> {/* Número bold e elevado */}
            </div>

            {/* Casas de Banho */}
            <div className="flex items-center">
              <FaShower className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
              <span className="text-sm font-bold ml-1 -mt-1">2</span> {/* Número bold e elevado */}
            </div>

            {/* Garagem */}
            <div className="flex items-center">
              <IoCarSportOutline className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
              <span className="text-sm font-bold ml-1 -mt-1">1</span> {/* Número bold e elevado */}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
