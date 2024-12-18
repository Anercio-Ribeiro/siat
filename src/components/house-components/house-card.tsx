// "use client";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import { IoLocationOutline, IoHeartOutline, IoHeart, IoBedOutline, IoCarSportOutline } from "react-icons/io5";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// import { useState } from "react";
// import { FaShower } from "react-icons/fa";
// import { ImovelLDto } from "@/app/model/type";
// import { Button } from "../ui/button";

// interface HouseCardProps {
//   imovel: ImovelLDto;
// }

// export function HouseCard({ imovel }: HouseCardProps) {
//   const [isFavorited, setIsFavorited] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const toggleFavorite = () => {
//     setIsFavorited(!isFavorited);
//   };

//   const handleNextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === imovel.imagens.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handlePreviousImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? imovel.imagens.length - 1 : prevIndex - 1
//     );
//   };

//   const handleImageChange = (index: number) => {
//     setCurrentImageIndex(index);
//   };

//   const currentImageUrl =
//     imovel.imagens.length > 0 ? imovel.imagens[currentImageIndex].url : "/default-image.jpg";

//   return (
//     <div>
//       <Card className="max-w-lg w-full rounded-md mt-6 relative">
//         <CardContent className="relative w-full h-52 rounded-md overflow-hidden group">
//           {/* Current image with transition animation */}
//           <Image
//             src={currentImageUrl}
//             alt={imovel.titulo}
//             fill
//             style={{ objectFit: "cover" }}
//             className="w-full h-full rounded-md transition-transform duration-700 ease-in-out transform-gpu"
//           />
//           {/* Favorite toggle */}
//           <div
//             onClick={toggleFavorite}
//             className={`absolute top-2 right-2 cursor-pointer p-1 rounded-md ${isFavorited ? "bg-white" : ""}`}
//           >
//             {isFavorited ? (
//               <IoHeart className="w-6 h-6 text-red-600" />
//             ) : (
//               <IoHeartOutline className="w-6 h-6 text-red-600" />
//             )}
//           </div>
//           {/* Navigation arrows */}
//           {imovel.imagens.length > 1 && (
 
//           <>
//           <Button
//             onClick={handlePreviousImage}
//             className="w-7 h-7 flex justify-center items-center absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full hover:bg-white p-0"
//           >
//             <IoIosArrowBack className="w-3 h-3" /> {/* Diminua o tamanho do ícone */}
//           </Button>
//           <Button
//             onClick={handleNextImage}
//             className="w-7 h-7 flex justify-center items-center absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full hover:bg-white p-0"
//           >
//             <IoIosArrowForward className="w-3 h-3" /> {/* Diminua o tamanho do ícone */}
//           </Button>
//         </>
//           )}
//           {/* Dot indicators */}
//           {imovel.imagens.length > 1 && (
//             <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
//               {imovel.imagens.map((_, index) => (
//                 <div
//                   key={index}
//                   onClick={() => handleImageChange(index)}
//                   className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${index === currentImageIndex ? "bg-white" : "bg-gray-400"}`}
//                 />
//               ))}
//             </div>
//           )}
//         </CardContent>
//         {/* Card content */}
//         <div className="p-2">
//           <div className="flex justify-between items-center">
//             <div className="text-sm font-bold">{imovel.titulo}</div>
//             <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold pointer-events-none">
//                {imovel.preco} AKZ
//             </Badge>
//           </div>
//           <div className="flex items-center text-sm text-muted-foreground mt-1">
//             <IoLocationOutline className="mr-1" />{imovel.provincia} - {imovel.bairro}
//           </div>
//         </div>
//         {/* Card footer */}
//         <CardFooter className="flex justify-between items-center bg-blue-50 p-2">
//           <div className="text-xs font-bold">{imovel.tipologia}</div>
//           <div className="flex space-x-4">
//             <div className="flex items-center">
//               <IoBedOutline className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
//               <span className="text-sm font-bold ml-1 -mt-1">{imovel.numeroQuarto}</span>
//             </div>
//             <div className="flex items-center">
//               <FaShower className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
//               <span className="text-sm font-bold ml-1 -mt-1">{imovel.numeroCasaBanho}</span>
//             </div>
//             <div className="flex items-center">
//               <IoCarSportOutline className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
//               <span className="text-sm font-bold ml-1 -mt-1">{imovel.garagem}</span>
//             </div>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }




// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import { IoLocationOutline, IoHeartOutline, IoHeart, IoBedOutline, IoCarSportOutline } from "react-icons/io5";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// import { useState } from "react";
// import { FaShower } from "react-icons/fa";
// import { ImovelLDto } from "@/app/model/type";
// import { Button } from "../ui/button";

// interface HouseCardProps {
//   imovel: ImovelLDto;
// }

// export function HouseCard({ imovel }: HouseCardProps) {
//   const [isFavorited, setIsFavorited] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const toggleFavorite = () => {
//     setIsFavorited(!isFavorited);
//   };

//   const handleNextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === imovel.imagens.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handlePreviousImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? imovel.imagens.length - 1 : prevIndex - 1
//     );
//   };

//   const handleImageChange = (index: number) => {
//     setCurrentImageIndex(index);
//   };

//   // const currentImageUrl =
//   //   imovel.imagens.length > 0 ? imovel.imagens[currentImageIndex].url : "/default-image.jpg";

//   const currentImageUrl =
//   Array.isArray(imovel.imagens) && imovel.imagens.length > 0
//     ? imovel.imagens[currentImageIndex].url
//     : "/default-image.jpg";


//   return (
//     <div>
//       <Card className="max-w-lg w-full rounded-md mt-6 relative">
//         <CardContent className="relative w-full h-52 rounded-md overflow-hidden group">
//           {/* Current image with transition animation */}
//           <Image
//             src={currentImageUrl}
//             alt={imovel.titulo}
//             fill
//             style={{ objectFit: "cover" }}
//             className="w-full h-full rounded-md transition-transform duration-700 ease-in-out transform-gpu"
//           />
//           {/* Favorite toggle */}
//           <div
//             onClick={toggleFavorite}
//             className={`absolute top-2 right-2 cursor-pointer p-1 rounded-md ${isFavorited ? "bg-white" : ""}`}
//           >
//             {isFavorited ? (
//               <IoHeart className="w-6 h-6 text-red-600" />
//             ) : (
//               <IoHeartOutline className="w-6 h-6 text-red-600" />
//             )}
//           </div>
//           {/* Navigation arrows */}
//           {imovel.imagens.length > 1 && (
//             <>
//               <Button
//                 onClick={handlePreviousImage}
//                 className="w-7 h-7 flex justify-center items-center absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-0 opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity"
//               >
//                 <IoIosArrowBack className="w-3 h-3" />
//               </Button>
//               <Button
//                 onClick={handleNextImage}
//                 className="w-7 h-7 flex justify-center items-center absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-0 opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity"
//               >
//                 <IoIosArrowForward className="w-3 h-3" />
//               </Button>
//             </>
//           )}
//           {/* Dot indicators */}
//           {imovel.imagens.length > 1 && (
//             <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
//               {imovel.imagens.map((_, index) => (
//                 <div
//                   key={index}
//                   onClick={() => handleImageChange(index)}
//                   className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${index === currentImageIndex ? "bg-white" : "bg-gray-400"}`}
//                 />
//               ))}
//             </div>
//           )}
//         </CardContent>
//         {/* Card content */}
//         <div className="p-2">
//           <div className="flex justify-between items-center">
//             <div className="text-sm font-bold">{imovel.titulo}</div>
//             <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold pointer-events-none">
//               {imovel.preco} AKZ
//             </Badge>
//           </div>
//           <div className="flex items-center text-sm text-muted-foreground mt-1">
//             <IoLocationOutline className="mr-1" />{imovel.provincia} - {imovel.bairro}
//           </div>
//         </div>
//         {/* Card footer */}
//         <CardFooter className="flex justify-between items-center bg-blue-50 p-2">
//           <div className="text-xs font-bold">{imovel.tipologia}</div>
//           <div className="flex space-x-4">
//             <div className="flex items-center">
//               <IoBedOutline className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
//               <span className="text-sm font-bold ml-1 -mt-1">{imovel.numeroQuarto}</span>
//             </div>
//             <div className="flex items-center">
//               <FaShower className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
//               <span className="text-sm font-bold ml-1 -mt-1">{imovel.numeroCasaBanho}</span>
//             </div>
//             <div className="flex items-center">
//               <IoCarSportOutline className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
//               <span className="text-sm font-bold ml-1 -mt-1">{imovel.garagem}</span>
//             </div>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }




import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { IoLocationOutline, IoHeartOutline, IoHeart, IoBedOutline, IoCarSportOutline } from "react-icons/io5";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { FaShower } from "react-icons/fa";
import { ImovelLDto } from "@/app/model/type";
import { Button } from "../ui/button";

interface HouseCardProps {
  imovel: ImovelLDto;
}

export function HouseCard({ imovel }: HouseCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === (imovel.imagens?.length || 0) - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (imovel.imagens?.length || 0) - 1 : prevIndex - 1
    );
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Ensure imovel.imagens is an array and has images, otherwise fallback to a default image
  const currentImageUrl =
    Array.isArray(imovel.imagens) && imovel.imagens.length > 0
      ? imovel.imagens[currentImageIndex].url
      : "/default-image.jpg";

  return (
    <div>
      <Card className="max-w-lg w-full rounded-md mt-6 relative">
        <CardContent className="relative w-full h-52 rounded-md overflow-hidden group">
          {/* Current image with transition animation */}
          <Image
            src={currentImageUrl}
            alt={imovel.titulo}
            fill
            style={{ objectFit: "cover" }}
            className="w-full h-full rounded-md transition-transform duration-700 ease-in-out transform-gpu"
          />
          {/* Favorite toggle */}
          <div
            onClick={toggleFavorite}
            className={`absolute top-2 right-2 cursor-pointer p-1 rounded-md ${isFavorited ? "bg-white" : ""}`}
          >
            {isFavorited ? (
              <IoHeart className="w-6 h-6 text-red-600" />
            ) : (
              <IoHeartOutline className="w-6 h-6 text-red-600" />
            )}
          </div>
          {/* Navigation arrows */}
          {Array.isArray(imovel.imagens) && imovel.imagens.length > 1 && (
            <>
              <Button
                onClick={handlePreviousImage}
                className="w-7 h-7 flex justify-center items-center absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-0 opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity"
              >
                <IoIosArrowBack className="w-3 h-3" />
              </Button>
              <Button
                onClick={handleNextImage}
                className="w-7 h-7 flex justify-center items-center absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-0 opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity"
              >
                <IoIosArrowForward className="w-3 h-3" />
              </Button>
            </>
          )}
          {/* Dot indicators */}
          {Array.isArray(imovel.imagens) && imovel.imagens.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {imovel.imagens.map((_, index) => (
                <div
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${index === currentImageIndex ? "bg-white" : "bg-gray-400"}`}
                />
              ))}
            </div>
          )}
        </CardContent>
        {/* Card content */}
        <div className="p-2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-bold">{imovel.titulo}</div>
            <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold pointer-events-none">
              {imovel.preco} AKZ
            </Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <IoLocationOutline className="mr-1" />{imovel.provincia} - {imovel.bairro}
          </div>
        </div>
        {/* Card footer */}
        <CardFooter className="flex justify-between items-center bg-blue-50 p-2">
          <div className="text-xs font-bold">{imovel.tipologia}</div>
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
