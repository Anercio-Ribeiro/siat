// "use client";
// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { HouseCard } from "@/components/house-components/house-card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ImovelLDto } from "./model/type";
// import { Info, Filter } from "lucide-react";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Label } from "@/components/ui/label";
// import municipiosData from "@/lib/data/municipiosData.json";
// import provinciasData from "@/lib/data/provincias.json";

// interface FetchImoveisResponse {
//   imoveis: ImovelLDto[];
//   totalImoveis: number;
//   totalPages: number;
//   currentPage: number;
// }

// interface SearchFilters {
//   precoMin?: string;
//   precoMax?: string;
//   bairro?: string;
//   tipologia?: string;
//   provincia?: string;
//   municipio?: string;
//   numeroQuarto?: string;
//   numeroCasaBanho?: string;
//   garagem?: string;
// }

// const emptyFilters: SearchFilters = {};

// async function fetchImoveis(
//   filters: SearchFilters,
//   page: number
// ): Promise<FetchImoveisResponse> {
//   const queryParams = new URLSearchParams();
//   Object.entries(filters).forEach(([key, value]) => {
//     if (value) queryParams.append(key, value);
//   });
//   queryParams.set("page", String(page));

//   const response = await fetch(`/api/imoveis/searchBy?${queryParams.toString()}`);
//   if (!response.ok) {
//     throw new Error("Erro ao buscar imóveis");
//   }
//   return response.json();
// }

// export default function HomePage() {
//   const [filters, setFilters] = useState<SearchFilters>(emptyFilters);
//   const [tempFilters, setTempFilters] = useState<SearchFilters>(emptyFilters);
//   const [page, setPage] = useState<number>(1);
//   const [searchTrigger, setSearchTrigger] = useState<number>(0);
//   const [selectedProvincia, setSelectedProvincia] = useState<string>("");
//   const [activeTab, setActiveTab] = useState("tipologia");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const { data, isLoading, error } = useQuery<FetchImoveisResponse, Error>({
//     queryKey: ["imoveis", page, searchTrigger],
//     queryFn: () => fetchImoveis(filters, page),
//     staleTime: 30000,
//     gcTime: 5 * 60 * 1000,
//   });

//   useEffect(() => {
//     setSearchTrigger((prev) => prev + 1);
//   }, []);

//   const handleSearch = () => {
//     setPage(1);
//     setSearchTrigger((prev) => prev + 1);
//   };

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//     setSearchTrigger((prev) => prev + 1);
//   };

//   const clearFilters = () => {
//     setTempFilters(emptyFilters);
//     setSelectedProvincia("");
//   };

//   const applyFilters = () => {
//     setFilters(tempFilters);
//     setPage(1);
//     setSearchTrigger((prev) => prev + 1);
//     setIsDialogOpen(false);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <nav className="flex justify-between items-center p-4 bg-gray-50 shadow-sm rounded-md">
//         <h1 className="text-2xl font-bold">Imóveis</h1>
//         <div>
//           <Button className="mr-2">Página Inicial</Button>
//           <Button>Sobre</Button>
//         </div>
//       </nav>

//       <div
//         className="relative h-[500px] bg-cover bg-center rounded-lg overflow-hidden mt-8"
//         style={{ backgroundImage: "url('/imoveis/home-background.jpg')" }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="w-10/12 max-w-3xl bg-white p-6 rounded-md shadow-lg">
//             <Tabs
//               defaultValue="tipologia"
//               className="w-full"
//               onValueChange={setActiveTab}
//             >
//               <TabsList className="w-full flex justify-start mb-4">
//                 <TabsTrigger value="tipologia">Tipologia</TabsTrigger>
//                 <TabsTrigger value="bairro">Bairro</TabsTrigger>
//                 <TabsTrigger value="preco">Preço</TabsTrigger>
//               </TabsList>

//               <TabsContent value="tipologia">
//                 <div className="flex gap-2">
//                   <Input
//                     value={filters.tipologia || ""}
//                     onChange={(e) =>
//                       setFilters((prev) => ({ ...prev, tipologia: e.target.value }))
//                     }
//                     placeholder="Digite a tipologia"
//                     className="w-full"
//                   />
//                   <Button onClick={handleSearch}>Pesquisar</Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => setIsDialogOpen(true)}
//                   >
//                     <Filter className="h-4 w-4 mr-2" />
//                     Filtros
//                   </Button>
//                 </div>
//               </TabsContent>

//               <TabsContent value="bairro">
//                 <div className="flex gap-2">
//                   <Input
//                     value={filters.bairro || ""}
//                     onChange={(e) =>
//                       setFilters((prev) => ({ ...prev, bairro: e.target.value }))
//                     }
//                     placeholder="Digite o bairro"
//                     className="w-full"
//                   />
//                   <Button onClick={handleSearch}>Pesquisar</Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => setIsDialogOpen(true)}
//                   >
//                     <Filter className="h-4 w-4 mr-2" />
//                     Filtros
//                   </Button>
//                 </div>
//               </TabsContent>

//               <TabsContent value="preco">
//                 <div className="flex gap-2">
//                   <Input
//                     value={filters.precoMin || ""}
//                     onChange={(e) =>
//                       setFilters((prev) => ({ ...prev, precoMin: e.target.value }))
//                     }
//                     placeholder="Preço mínimo"
//                     type="number"
//                     className="w-full"
//                   />
//                   <Input
//                     value={filters.precoMax || ""}
//                     onChange={(e) =>
//                       setFilters((prev) => ({ ...prev, precoMax: e.target.value }))
//                     }
//                     placeholder="Preço máximo"
//                     type="number"
//                     className="w-full"
//                   />
//                   <Button onClick={handleSearch}>Pesquisar</Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => setIsDialogOpen(true)}
//                   >
//                     <Filter className="h-4 w-4 mr-2" />
//                     Filtros
//                   </Button>
//                 </div>
//               </TabsContent>
//             </Tabs>

//             {/* Dialog de Filtros Avançados */}
//             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//               <DialogContent className="max-w-2xl">
//                 <DialogHeader>
//                   <DialogTitle>Filtros Avançados</DialogTitle>
//                 </DialogHeader>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label>Província</Label>
//                     <Select
//                       value={selectedProvincia}
//                       onValueChange={(value) => {
//                         setSelectedProvincia(value);
//                         setTempFilters((prev) => ({
//                           ...prev,
//                           provincia: value,
//                           municipio: "",
//                         }));
//                       }}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Selecione a província" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {Object.keys(municipiosData).map((provincia) => (
//                           <SelectItem key={provincia} value={provincia}>
//                             {provincia}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Município</Label>
//                     <Select
//                       value={tempFilters.municipio}
//                       onValueChange={(value) =>
//                         setTempFilters((prev) => ({ ...prev, municipio: value }))
//                       }
//                       disabled={!selectedProvincia}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Selecione o município" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {selectedProvincia &&
//                           municipiosData[
//                             selectedProvincia as keyof typeof municipiosData
//                           ].map((municipio) => (
//                             <SelectItem key={municipio} value={municipio}>
//                               {municipio}
//                             </SelectItem>
//                           ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Número de Quartos</Label>
//                     <Select
//                       value={tempFilters.numeroQuarto}
//                       onValueChange={(value) =>
//                         setTempFilters((prev) => ({ ...prev, numeroQuarto: value }))
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Selecione o número de quartos" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {[1, 2, 3, 4, 5].map((num) => (
//                           <SelectItem key={num} value={String(num)}>
//                             {num} {num === 1 ? "quarto" : "quartos"}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Casas de Banho</Label>
//                     <Select
//                       value={tempFilters.numeroCasaBanho}
//                       onValueChange={(value) =>
//                         setTempFilters((prev) => ({ ...prev, numeroCasaBanho: value }))
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Selecione o número de casas de banho" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {[1, 2, 3, 4].map((num) => (
//                           <SelectItem key={num} value={String(num)}>
//                             {num} {num === 1 ? "casa de banho" : "casas de banho"}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Garagem</Label>
//                     <Select
//                       value={tempFilters.garagem}
//                       onValueChange={(value) =>
//                         setTempFilters((prev) => ({ ...prev, garagem: value }))
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Selecione o número de garagens" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {[0, 1, 2, 3].map((num) => (
//                           <SelectItem key={num} value={String(num)}>
//                             {num} {num === 1 ? "garagem" : "garagens"}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 <div className="flex justify-end gap-2 mt-4">
//                   <Button variant="outline" onClick={clearFilters}>
//                     Limpar Filtros
//                   </Button>
//                   <Button onClick={applyFilters}>Aplicar Filtros</Button>
//                 </div>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>
//       </div>

//            {/* Resto do código... */}
//            <div className="mt-8">
//         {isLoading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {Array.from({ length: 6 }).map((_, index) => (
//               <div key={index} className="min-w-[300px] w-full">
//                 <Skeleton className="h-52 w-full mb-2" />
//                 <Skeleton className="h-6 w-3/4 mb-2" />
//                 <Skeleton className="h-6 w-1/2" />
//               </div>
//             ))}
//           </div>
//         ) : error ? (
//           <div className="text-red-500">Erro ao carregar imóveis: {error.message}</div>
//         ) : data?.imoveis.length === 0 ? (
//           <div className="flex items-center justify-center min-h-[50vh]">
//             <Alert className="w-full max-w-md border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
//               <div className="flex items-center justify-center mb-2">
//                 <Info className="h-6 w-6 text-blue-600" />
//               </div>
//               <AlertTitle className="font-bold text-lg text-gray-800">
//                 Nenhum imóvel encontrado
//               </AlertTitle>
//               <AlertDescription className="text-gray-600">
//                 Não encontramos imóveis com os critérios selecionados. Tente ajustar seus filtros de busca.
//               </AlertDescription>
//             </Alert>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {data?.imoveis.map((imovel) => (
//               <HouseCard key={imovel.id} imovel={imovel} />
//             ))}
//           </div>
//         )}
//       </div>

//       {data && data.imoveis && data.imoveis.length > 0 && (
//         <div className="mt-4 flex justify-between items-center">
//           <Button 
//             onClick={() => handlePageChange(page - 1)} 
//             disabled={page === 1}
//             variant="outline"
//           >
//             Anterior
//           </Button>
//           <span className="text-sm text-gray-600">
//             Página {page} de {data.totalPages}
//           </span>
//           <Button 
//             onClick={() => handlePageChange(page + 1)} 
//             disabled={page === data.totalPages}
//             variant="outline"
//           >
//             Próxima
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }




"use client";

import { useState, useEffect } from "react";
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
import { Calendar, Search, Heart, User as UserIcon, LogOut, Home, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { addMonths, subMonths, isWithinInterval, format, isAfter, addYears } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Skeleton } from "@/components/ui/skeleton";
import { HouseCard } from "@/components/house-components/house-card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import municipiosData from "@/lib/data/municipiosData.json";
import SignOutButton from "@/components/SignOutButton";
import { ImovelLDto } from "./model/type";

// Proximity types from Prisma schema
const proximityTypes = [
  "ESCOLA", "HOSPITAL", "SUPERMERCADO", "FARMACIA",
  "RESTAURANTE", "BANCO", "PARQUE", "SHOPPING", "TRANSPORTE_PUBLICO",
];

interface FetchImoveisResponse {
  imoveis: ImovelLDto[];
  totalImoveis: number;
  totalPages: number;
  currentPage: number;
}


interface SearchFilters {
  checkIn?: string;
  checkOut?: string;
  precoMin?: string;
  precoMax?: string;
  bairro?: string;
  tipologia?: string;
  provincia?: string;
  municipio?: string;
  numeroQuarto?: string;
  numeroCasaBanho?: string;
  garagem?: string;
  proximidades?: string;
}

const emptyFilters: SearchFilters = {};

async function fetchImoveis(filters: SearchFilters, page: number): Promise<FetchImoveisResponse> {
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });
  queryParams.set("page", String(page));

  const response = await fetch(`/api/imoveis/searchBy?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar imóveis");
  }
  return response.json();
}

export function AirbnbNav() {
  const { user, loading: userLoading } = useUser();
  const { favorites } = useFavorites();
  const [isDatesOpen, setIsDatesOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [filters, setFilters] = useState<SearchFilters>(emptyFilters);
  const [tempFilters, setTempFilters] = useState<SearchFilters>(emptyFilters);
  const [selectedProvincia, setSelectedProvincia] = useState<string>("");
  const [leftMonth, setLeftMonth] = useState(new Date());
  const [rightMonth, setRightMonth] = useState(addMonths(new Date(), 1));
  const [searchResults, setSearchResults] = useState<FetchImoveisResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const TODAY = new Date();

  const handleSearch = async () => {
    setIsSearching(true);
    setSearchError(null);
    setPage(1);

    const searchFilters: SearchFilters = {
      ...filters,
      checkIn: checkIn ? checkIn.toISOString() : undefined,
      checkOut: checkOut ? checkOut.toISOString() : undefined,
      proximidades: tempFilters.proximidades || filters.proximidades,
    };

    try {
      const results = await fetchImoveis(searchFilters, 1);
      setSearchResults(results);
    } catch (err) {
      setSearchError((err as Error).message);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    handleSearch(); // Load all imóveis on mount with no filters
  }, []);

  if (userLoading) {
    return <div className="flex items-center justify-center p-4">Loading...</div>;
  }

  const favoritesCount = user?.role === "INQUILINO" && favorites ? favorites.length : 0;

  const handleMonthChange = (increment: boolean) => {
    if (increment) {
      setLeftMonth(addMonths(leftMonth, 1));
      setRightMonth(addMonths(rightMonth, 1));
    } else {
      setLeftMonth(subMonths(leftMonth, 1));
      setRightMonth(subMonths(rightMonth, 1));
    }
  };

  const handlePageChange = async (newPage: number) => {
    setIsSearching(true);
    setPage(newPage);

    const searchFilters: SearchFilters = {
      ...filters,
      checkIn: checkIn ? checkIn.toISOString() : undefined,
      checkOut: checkOut ? checkOut.toISOString() : undefined,
      proximidades: tempFilters.proximidades || filters.proximidades,
    };

    try {
      const results = await fetchImoveis(searchFilters, newPage);
      setSearchResults(results);
    } catch (err) {
      setSearchError((err as Error).message);
    } finally {
      setIsSearching(false);
    }
  };

  const clearAllFilters = () => {
    setCheckIn(null);
    setCheckOut(null);
    setFilters(emptyFilters);
    setTempFilters(emptyFilters);
    setSelectedProvincia("");
    handleSearch(); // Fetch all imóveis
  };

  const clearTempFilters = () => {
    setTempFilters(emptyFilters);
    setSelectedProvincia("");
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setIsFiltersOpen(false);
    handleSearch();
  };

  const CalendarContent = () => (
    <div className="flex gap-4">
      <div className="w-1/2">
        <div className="text-sm font-semibold mb-2">
          Check-in: {checkIn ? format(checkIn, "dd/MM/yyyy") : "Selecionar"}
        </div>
        <ShadcnCalendar
          mode="single"
          selected={checkIn || undefined}
          onSelect={(date) => {
            if (date && !isAfter(date, checkOut || addYears(TODAY, 1))) {
              setCheckIn(date);
              if (!checkOut) setIsDatesOpen(true); // Keep open for check-out
            }
          }}
          month={leftMonth}
          onMonthChange={(newMonth) => setLeftMonth(newMonth)}
          locale={ptBR}
          disabled={(date) => date < TODAY || date > addYears(TODAY, 1)}
          className="custom-airbnb-calendar"
          modifiers={{
            inRange: checkIn && checkOut ? (date) => isWithinInterval(date, { start: checkIn, end: checkOut }) : [],
          }}
          modifiersStyles={{
            inRange: { backgroundColor: "#000", color: "#fff" },
            selected: { backgroundColor: "#000", color: "#fff" },
          }}
        />
      </div>
      <div className="w-1/2">
        <div className="text-sm font-semibold mb-2">
          Check-out: {checkOut ? format(checkOut, "dd/MM/yyyy") : "Selecionar"}
        </div>
        <ShadcnCalendar
          mode="single"
          selected={checkOut || undefined}
          onSelect={(date) => {
            if (date && isAfter(date, checkIn || TODAY)) {
              setCheckOut(date);
              setIsDatesOpen(false); // Auto-close after selecting check-out
            }
          }}
          month={rightMonth}
          onMonthChange={(newMonth) => setRightMonth(newMonth)}
          locale={ptBR}
          disabled={(date) => date < (checkIn || TODAY) || date > addYears(TODAY, 1)}
          className="custom-airbnb-calendar"
          modifiers={{
            inRange: checkIn && checkOut ? (date) => isWithinInterval(date, { start: checkIn, end: checkOut }) : [],
          }}
          modifiersStyles={{
            inRange: { backgroundColor: "#000", color: "#fff" },
            selected: { backgroundColor: "#000", color: "#fff" },
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
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
                    {checkIn ? format(checkIn, "dd/MM/yyyy") : "Check-in"} -{" "}
                    {checkOut ? format(checkOut, "dd/MM/yyyy") : "Check-out"}
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="p-4 max-w-3xl min-h-[600px]">
                <div className="flex justify-between mb-4">
                  <Button
                    onClick={() => handleMonthChange(false)}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-black hover:text-white rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleMonthChange(true)}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-black hover:text-white rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <CalendarContent />
                <div className="flex justify-between gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => { setCheckIn(null); setCheckOut(null); }}>
                    Limpar Datas
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearAllFilters}>
                    Limpar Tudo
                  </Button>
                  <Button size="sm" onClick={() => setIsDatesOpen(false)}>
                    Fechar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="w-px h-8 bg-gray-300"></div>

            {/* Filters Section (Proximities + Additional Filters) */}
            <Dialog open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex-1 text-left px-4 py-2 rounded-full hover:bg-gray-100"
                >
                  <span className="text-sm font-semibold">Filtros</span>
                  <span className="text-xs text-muted-foreground block">
                    {filters.proximidades || filters.provincia || filters.numeroQuarto
                      ? "Filtros aplicados"
                      : "Adicionar filtros"}
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <h3 className="text-lg font-semibold mb-4">Filtros Avançados</h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Província */}
                  <div className="space-y-2">
                    <Label>Província</Label>
                    <Select
                      value={selectedProvincia}
                      onValueChange={(value) => {
                        setSelectedProvincia(value);
                        setTempFilters((prev) => ({ ...prev, provincia: value, municipio: "" }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a província" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(municipiosData).map((provincia) => (
                          <SelectItem key={provincia} value={provincia}>
                            {provincia}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Município */}
                  <div className="space-y-2">
                    <Label>Município</Label>
                    <Select
                      value={tempFilters.municipio}
                      onValueChange={(value) => setTempFilters((prev) => ({ ...prev, municipio: value }))}
                      disabled={!selectedProvincia}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o município" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedProvincia &&
                          municipiosData[selectedProvincia as keyof typeof municipiosData].map((municipio) => (
                            <SelectItem key={municipio} value={municipio}>
                              {municipio}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Preço Mínimo */}
                  <div className="space-y-2">
                    <Label>Preço Mínimo</Label>
                    <Input
                      value={tempFilters.precoMin || ""}
                      onChange={(e) => setTempFilters((prev) => ({ ...prev, precoMin: e.target.value }))}
                      placeholder="Preço mínimo"
                      type="number"
                    />
                  </div>

                  {/* Preço Máximo */}
                  <div className="space-y-2">
                    <Label>Preço Máximo</Label>
                    <Input
                      value={tempFilters.precoMax || ""}
                      onChange={(e) => setTempFilters((prev) => ({ ...prev, precoMax: e.target.value }))}
                      placeholder="Preço máximo"
                      type="number"
                    />
                  </div>

                  {/* Bairro */}
                  <div className="space-y-2">
                    <Label>Bairro</Label>
                    <Input
                      value={tempFilters.bairro || ""}
                      onChange={(e) => setTempFilters((prev) => ({ ...prev, bairro: e.target.value }))}
                      placeholder="Digite o bairro"
                    />
                  </div>

                  {/* Tipologia */}
                  <div className="space-y-2">
                    <Label>Tipologia</Label>
                    <Input
                      value={tempFilters.tipologia || ""}
                      onChange={(e) => setTempFilters((prev) => ({ ...prev, tipologia: e.target.value }))}
                      placeholder="Digite a tipologia"
                    />
                  </div>

                  {/* Número de Quartos */}
                  <div className="space-y-2">
                    <Label>Número de Quartos</Label>
                    <Select
                      value={tempFilters.numeroQuarto}
                      onValueChange={(value) => setTempFilters((prev) => ({ ...prev, numeroQuarto: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o número de quartos" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={String(num)}>
                            {num} {num === 1 ? "quarto" : "quartos"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Casas de Banho */}
                  <div className="space-y-2">
                    <Label>Casas de Banho</Label>
                    <Select
                      value={tempFilters.numeroCasaBanho}
                      onValueChange={(value) => setTempFilters((prev) => ({ ...prev, numeroCasaBanho: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o número de casas de banho" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4].map((num) => (
                          <SelectItem key={num} value={String(num)}>
                            {num} {num === 1 ? "casa de banho" : "casas de banho"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Garagem */}
                  <div className="space-y-2">
                    <Label>Garagem</Label>
                    <Select
                      value={tempFilters.garagem}
                      onValueChange={(value) => setTempFilters((prev) => ({ ...prev, garagem: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o número de garagens" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3].map((num) => (
                          <SelectItem key={num} value={String(num)}>
                            {num} {num === 1 ? "garagem" : "garagens"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Proximities */}
                <div className="mt-4">
                  <h4 className="text-md font-semibold mb-2">Proximidades</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {proximityTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={(tempFilters.proximidades?.split(",") || []).includes(type)}
                          onCheckedChange={(checked) => {
                            setTempFilters((prev) => {
                              const currentProximities = prev.proximidades ? prev.proximidades.split(",") : [];
                              return {
                                ...prev,
                                proximidades: checked
                                  ? [...currentProximities, type].join(",")
                                  : currentProximities.filter((t) => t !== type).join(","),
                              };
                            });
                          }}
                        />
                        <Label htmlFor={type}>{type.toLowerCase()}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <Button variant="outline" size="sm" onClick={clearTempFilters}>
                    Limpar Filtros
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearAllFilters}>
                    Limpar Tudo
                  </Button>
                  <Button size="sm" onClick={applyFilters}>
                    Aplicar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

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
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
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

      {/* Banner */}
      <div
        className="relative h-[500px] bg-cover bg-center rounded-lg overflow-hidden mt-8"
        style={{ backgroundImage: "url('/imoveis/home-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-white text-4xl font-bold">Encontre o imóvel perfeito</div>
        </div>
      </div>

      {/* Search Results */}
      <div className="mt-8">
        {isSearching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="min-w-[300px] w-full">
                <Skeleton className="h-52 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            ))}
          </div>
        ) : searchError ? (
          <div className="text-red-500">Erro ao carregar imóveis: {searchError}</div>
        ) : searchResults?.imoveis.length === 0 ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Alert className="w-full max-w-md border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <AlertTitle className="font-bold text-lg text-gray-800">
                Nenhum imóvel encontrado
              </AlertTitle>
              <AlertDescription className="text-gray-600">
                Não encontramos imóveis com os critérios selecionados. Tente ajustar seus filtros de busca.
              </AlertDescription>
            </Alert>
          </div>
        ) : searchResults ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {searchResults.imoveis.map((imovel) => (
              <HouseCard key={imovel.id} imovel={imovel} />
            ))}
          </div>
        ) : null}
      </div>

      {/* Pagination */}
      {searchResults && searchResults.imoveis.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <Button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            variant="outline"
          >
            Anterior
          </Button>
          <span className="text-sm text-gray-600">
            Página {page} de {searchResults.totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === searchResults.totalPages}
            variant="outline"
          >
            Próxima
          </Button>
        </div>
      )}
      <style jsx global>{`
        .custom-airbnb-calendar {
          width: 100%;
          border: none;
          background: white;
          min-height: 380px;
        }
        .custom-airbnb-calendar .react-datepicker__day {
          margin: 2px;
          width: 40px;
          height: 40px;
          line-height: 40px;
          border-radius: 0;
          color: #484848;
          cursor: pointer;
          position: relative;
        }
        .custom-airbnb-calendar .react-datepicker__day:hover:not([disabled]) {
          background-color: #222222;
          color: white;
          border-radius: 0;
        }
        .custom-airbnb-calendar .react-datepicker__day--disabled {
          cursor: not-allowed;
          opacity: 0.5;
          background-color: #f0f0f0;
          text-decoration: line-through;
        }
      `}</style>
    </div>
  );
}

export default AirbnbNav;