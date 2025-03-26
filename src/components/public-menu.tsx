// "use client";

// import { useState } from "react";
// // import { useUser } from "@/hooks/useUser";
// import { useUser } from "@/hooks/getUser"; // Assuming this is your user hook
// import { useFavorites } from "@/hooks/useFavoritos"; // Assuming this is your favorites hook
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Input } from "@/components/ui/input";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { Search, Heart, User as UserIcon, LogOut, Home } from "lucide-react";
// import Link from "next/link";
// import SignOutButton from "./SignOutButton";
// // Assuming this exists

// export function AirbnbNav() {
//   const { user, loading } = useUser();
//   const { favorites } = useFavorites();
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center p-4">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   const favoritesCount = user?.role === "INQUILINO" && favorites ? favorites.length : 0;

//   return (
//     <nav className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
//       {/* Logo */}
//       <div className="flex items-center">
//         <Link href="/" className="text-2xl font-bold text-primary">
//           ImóveisApp
//         </Link>
//       </div>

//       {/* Search Bar (Airbnb-style) */}
//       <div className="flex-1 max-w-lg mx-4">
//         <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
//           <DialogTrigger asChild>
//             <Button
//               variant="outline"
//               className="w-full flex items-center justify-between text-sm rounded-full py-2 px-4 hover:shadow-md transition-shadow"
//             >
//               <span className="flex items-center">
//                 <Search className="h-4 w-4 mr-2 text-muted-foreground" />
//                 Onde você quer morar?
//               </span>
//               <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center">
//                 <Search className="h-4 w-4" />
//               </span>
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px]">
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold">Pesquisar Imóveis</h3>
//               <Input placeholder="Bairro" className="w-full" />
//               <Input placeholder="Tipologia" className="w-full" />
//               <div className="flex gap-2">
//                 <Input placeholder="Preço mínimo" type="number" className="w-full" />
//                 <Input placeholder="Preço máximo" type="number" className="w-full" />
//               </div>
//               <Button className="w-full" onClick={() => setIsSearchOpen(false)}>
//                 Pesquisar
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* User Menu */}
//       <div className="flex items-center gap-4">
//         {user ? (
//           <>
//             {/* Become a Host (Airbnb-style) */}
//             <Button variant="ghost" asChild>
//               <Link href="/become-a-host">Anunciar Imóvel</Link>
//             </Button>

//             {/* User Dropdown */}
//             <DropdownMenu>
//               <TooltipProvider disableHoverableContent>
//                 <Tooltip delayDuration={100}>
//                   <TooltipTrigger asChild>
//                     <DropdownMenuTrigger asChild>
//                       <Button
//                         variant="outline"
//                         className="relative h-10 w-10 rounded-full border flex items-center justify-center"
//                       >
//                         <Avatar className="h-8 w-8">
//                           <AvatarImage src={user.picture || ""} alt="Avatar" />
//                           <AvatarFallback className="bg-transparent">
//                             {user.nome?.[0] || ""}
//                           </AvatarFallback>
//                         </Avatar>
//                       </Button>
//                     </DropdownMenuTrigger>
//                   </TooltipTrigger>
//                   <TooltipContent side="bottom">Perfil</TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>

//               <DropdownMenuContent className="w-56" align="end" forceMount>
//                 <DropdownMenuLabel className="font-normal">
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium leading-none">{user.nome}</p>
//                     <p className="text-xs leading-none text-muted-foreground">
//                       {user.email}
//                     </p>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem className="hover:cursor-pointer" asChild>
//                   <Link href="/dashboard" className="flex items-center">
//                     <Home className="w-4 h-4 mr-3 text-muted-foreground" />
//                     Dashboard
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem className="hover:cursor-pointer" asChild>
//                   <Link href="/account" className="flex items-center">
//                     <UserIcon className="w-4 h-4 mr-3 text-muted-foreground" />
//                     Conta
//                   </Link>
//                 </DropdownMenuItem>
//                 {user.role === "INQUILINO" && (
//                   <DropdownMenuItem className="hover:cursor-pointer" asChild>
//                     <Link href="/lista-favoritos" className="flex items-center">
//                       <Heart className="w-4 h-4 mr-3 text-muted-foreground" />
//                       Favoritos ({favoritesCount})
//                     </Link>
//                   </DropdownMenuItem>
//                 )}
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem className="hover:cursor-pointer">
//                   <SignOutButton>
//                     <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
//                     Sair
//                   </SignOutButton>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </>
//         ) : (
//           <div className="flex gap-2">
//             <Button variant="outline" asChild>
//               <Link href="/authenticate">Entrar</Link>
//             </Button>
//             <Button asChild>
//               <Link href="/authenticate">Criar Conta</Link>
//             </Button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }



"use client";

import { useState } from "react";
import { useUser } from "@/hooks/getUser";
import { useFavorites } from "@/hooks/useFavoritos";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Search, Heart, User as UserIcon, LogOut, Home, MapPin } from "lucide-react";
import Link from "next/link";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar"; // Shadcn Calendar
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import SignOutButton from "./SignOutButton";
import dynamic from "next/dynamic";

// Dynamic import for the map to avoid SSR issues
const MapComponente = dynamic(() => import("../components/map-component/proximidade-map"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

// Angola provinces (simplified coordinates for demo purposes)
const angolaProvinces = {
  Luanda: { lat: -8.8390, lng: 13.2343 },
  Bengo: { lat: -8.8167, lng: 13.5667 },
  Benguela: { lat: -12.5783, lng: 13.4072 },
  // Add more provinces with approximate lat/lng as needed
};

// Proximity types from your Prisma schema
const proximityTypes = [
  "ESCOLA",
  "HOSPITAL",
  "SUPERMERCADO",
  "FARMACIA",
  "RESTAURANTE",
  "BANCO",
  "PARQUE",
  "SHOPPING",
  "TRANSPORTE_PUBLICO",
];

export function AirbnbNav() {
  const { user, loading } = useUser();
  const { favorites } = useFavorites();
  const [isDatesOpen, setIsDatesOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isProximitiesOpen, setIsProximitiesOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedProximities, setSelectedProximities] = useState<string[]>([]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <p>Loading...</p>
      </div>
    );
  }

  const favoritesCount = user?.role === "INQUILINO" && favorites ? favorites.length : 0;

  const handleSearch = () => {
    const filters: any = {};
    if (checkIn) filters.checkIn = checkIn.toISOString();
    if (checkOut) filters.checkOut = checkOut.toISOString();
    if (selectedProvince) filters.provincia = selectedProvince;
    if (selectedProximities.length > 0) filters.proximidades = selectedProximities.join(",");

    const queryString = new URLSearchParams(filters).toString();
    window.location.href = `/search?${queryString}`;
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          ImóveisApp
        </Link>
      </div>

      {/* Airbnb-style Search Bar */}
      <div className="flex-1 max-w-lg mx-4">
        <div className="flex items-center bg-white border rounded-full shadow-sm hover:shadow-md transition-shadow">
          {/* Dates Section */}
          <Dialog open={isDatesOpen} onOpenChange={setIsDatesOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="flex-1 text-left px-4 py-2 rounded-full hover:bg-gray-100"
              >
                <span className="text-sm font-semibold">Datas</span>
                <span className="text-xs text-muted-foreground block">
                  {checkIn ? checkIn.toLocaleDateString() : "Check-in"} -{" "}
                  {checkOut ? checkOut.toLocaleDateString() : "Check-out"}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <div className="flex gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Check-in</h3>
                  <ShadcnCalendar
  mode="single"
  selected={checkOut ?? undefined} // Garante compatibilidade com Date | undefined
  onSelect={(date) => setCheckIn(date)} // date é Date | undefined
  disabled={(date) => date < (checkIn ?? new Date())} // Usa data atual se checkIn for undefined
  className="rounded-md border"
/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Check-out</h3>
                  <ShadcnCalendar
  mode="single"
  selected={checkOut ?? undefined} // Garante compatibilidade com Date | undefined
  onSelect={(date) => setCheckOut(date)} // date é Date | undefined
  disabled={(date) => date < (checkIn ?? new Date())} // Usa data atual se checkIn for undefined
  className="rounded-md border"
/>
                </div>
              </div>
              <Button onClick={() => setIsDatesOpen(false)} className="mt-4">
                Aplicar
              </Button>
            </DialogContent>
          </Dialog>

          {/* Vertical Divider */}
          <div className="w-px h-8 bg-gray-300"></div>

          {/* Region Section */}
          <Dialog open={isRegionOpen} onOpenChange={setIsRegionOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="flex-1 text-left px-4 py-2 rounded-full hover:bg-gray-100"
              >
                <span className="text-sm font-semibold">Região</span>
                <span className="text-xs text-muted-foreground block">
                  {selectedProvince || "Qualquer província"}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <h3 className="text-lg font-semibold mb-4">Selecione uma Província</h3>
              <MapComponent
                provinces={angolaProvinces}
                onProvinceClick={(province: string) => {
                  setSelectedProvince(province);
                  setIsRegionOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>

          {/* Vertical Divider */}
          <div className="w-px h-8 bg-gray-300"></div>

          {/* Proximities Section */}
          <Dialog open={isProximitiesOpen} onOpenChange={setIsProximitiesOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="flex-1 text-left px-4 py-2 rounded-full hover:bg-gray-100"
              >
                <span className="text-sm font-semibold">Proximidades</span>
                <span className="text-xs text-muted-foreground block">
                  {selectedProximities.length > 0
                    ? `${selectedProximities.length} selecionadas`
                    : "Qualquer"}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <h3 className="text-lg font-semibold mb-4">Escolha Proximidades</h3>
              <div className="grid grid-cols-2 gap-4">
                {proximityTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={selectedProximities.includes(type)}
                      onCheckedChange={(checked) => {
                        setSelectedProximities((prev) =>
                          checked
                            ? [...prev, type]
                            : prev.filter((t) => t !== type)
                        );
                      }}
                    />
                    <Label htmlFor={type}>{type.toLowerCase()}</Label>
                  </div>
                ))}
              </div>
              <Button onClick={() => setIsProximitiesOpen(false)} className="mt-4">
                Aplicar
              </Button>
            </DialogContent>
          </Dialog>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center m-1"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* User Menu */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Button variant="ghost" asChild>
              <Link href="/become-a-host">Anunciar Imóvel</Link>
            </Button>
            <DropdownMenu>
              <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="relative h-10 w-10 rounded-full border flex items-center justify-center"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.picture || ""} alt="Avatar" />
                          <AvatarFallback className="bg-transparent">
                            {user.nome?.[0] || ""}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Perfil</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.nome}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <Home className="w-4 h-4 mr-3 text-muted-foreground" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="flex items-center">
                      <UserIcon className="w-4 h-4 mr-3 text-muted-foreground" />
                      Conta
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "INQUILINO" && (
                    <DropdownMenuItem asChild>
                      <Link href="/lista-favoritos" className="flex items-center">
                        <Heart className="w-4 h-4 mr-3 text-muted-foreground" />
                        Favoritos ({favoritesCount})
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <SignOutButton>
                    <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
                    Sair
                  </SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Criar Conta</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

// Placeholder MapComponent (to be implemented)
interface MapComponentProps {
  provinces: { [key: string]: { lat: number; lng: number } };
  onProvinceClick: (province: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ provinces, onProvinceClick }) => {
  return (
    <div className="h-[400px] bg-gray-200 flex flex-col gap-2 p-4">
      {Object.keys(provinces).map((province) => (
        <Button
          key={province}
          variant="outline"
          onClick={() => onProvinceClick(province)}
          className="text-left"
        >
          {province}
        </Button>
      ))}
    </div>
  );
};

export default AirbnbNav;