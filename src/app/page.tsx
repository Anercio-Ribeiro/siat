"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { HouseCard } from "@/components/house-components/house-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImovelLDto } from "./model/type";
import { Info, Filter } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import municipiosData from "@/lib/data/municipiosData.json";
import provinciasData from "@/lib/data/provincias.json";

interface FetchImoveisResponse {
  imoveis: ImovelLDto[];
  totalImoveis: number;
  totalPages: number;
  currentPage: number;
}

interface SearchFilters {
  precoMin?: string;
  precoMax?: string;
  bairro?: string;
  tipologia?: string;
  provincia?: string;
  municipio?: string;
  numeroQuarto?: string;
  numeroCasaBanho?: string;
  garagem?: string;
}

const emptyFilters: SearchFilters = {};

async function fetchImoveis(
  filters: SearchFilters,
  page: number
): Promise<FetchImoveisResponse> {
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

export default function HomePage() {
  const [filters, setFilters] = useState<SearchFilters>(emptyFilters);
  const [tempFilters, setTempFilters] = useState<SearchFilters>(emptyFilters);
  const [page, setPage] = useState<number>(1);
  const [searchTrigger, setSearchTrigger] = useState<number>(0);
  const [selectedProvincia, setSelectedProvincia] = useState<string>("");
  const [activeTab, setActiveTab] = useState("tipologia");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, error } = useQuery<FetchImoveisResponse, Error>({
    queryKey: ["imoveis", page, searchTrigger],
    queryFn: () => fetchImoveis(filters, page),
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    setSearchTrigger((prev) => prev + 1);
  }, []);

  const handleSearch = () => {
    setPage(1);
    setSearchTrigger((prev) => prev + 1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchTrigger((prev) => prev + 1);
  };

  const clearFilters = () => {
    setTempFilters(emptyFilters);
    setSelectedProvincia("");
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setPage(1);
    setSearchTrigger((prev) => prev + 1);
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="flex justify-between items-center p-4 bg-gray-50 shadow-sm rounded-md">
        <h1 className="text-2xl font-bold">Imóveis</h1>
        <div>
          <Button className="mr-2">Página Inicial</Button>
          <Button>Sobre</Button>
        </div>
      </nav>

      <div
        className="relative h-[500px] bg-cover bg-center rounded-lg overflow-hidden mt-8"
        style={{ backgroundImage: "url('/imoveis/home-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="w-10/12 max-w-3xl bg-white p-6 rounded-md shadow-lg">
            <Tabs
              defaultValue="tipologia"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="w-full flex justify-start mb-4">
                <TabsTrigger value="tipologia">Tipologia</TabsTrigger>
                <TabsTrigger value="bairro">Bairro</TabsTrigger>
                <TabsTrigger value="preco">Preço</TabsTrigger>
              </TabsList>

              <TabsContent value="tipologia">
                <div className="flex gap-2">
                  <Input
                    value={filters.tipologia || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, tipologia: e.target.value }))
                    }
                    placeholder="Digite a tipologia"
                    className="w-full"
                  />
                  <Button onClick={handleSearch}>Pesquisar</Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="bairro">
                <div className="flex gap-2">
                  <Input
                    value={filters.bairro || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, bairro: e.target.value }))
                    }
                    placeholder="Digite o bairro"
                    className="w-full"
                  />
                  <Button onClick={handleSearch}>Pesquisar</Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="preco">
                <div className="flex gap-2">
                  <Input
                    value={filters.precoMin || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, precoMin: e.target.value }))
                    }
                    placeholder="Preço mínimo"
                    type="number"
                    className="w-full"
                  />
                  <Input
                    value={filters.precoMax || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, precoMax: e.target.value }))
                    }
                    placeholder="Preço máximo"
                    type="number"
                    className="w-full"
                  />
                  <Button onClick={handleSearch}>Pesquisar</Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Dialog de Filtros Avançados */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Filtros Avançados</DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Província</Label>
                    <Select
                      value={selectedProvincia}
                      onValueChange={(value) => {
                        setSelectedProvincia(value);
                        setTempFilters((prev) => ({
                          ...prev,
                          provincia: value,
                          municipio: "",
                        }));
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

                  <div className="space-y-2">
                    <Label>Município</Label>
                    <Select
                      value={tempFilters.municipio}
                      onValueChange={(value) =>
                        setTempFilters((prev) => ({ ...prev, municipio: value }))
                      }
                      disabled={!selectedProvincia}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o município" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedProvincia &&
                          municipiosData[
                            selectedProvincia as keyof typeof municipiosData
                          ].map((municipio) => (
                            <SelectItem key={municipio} value={municipio}>
                              {municipio}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Número de Quartos</Label>
                    <Select
                      value={tempFilters.numeroQuarto}
                      onValueChange={(value) =>
                        setTempFilters((prev) => ({ ...prev, numeroQuarto: value }))
                      }
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

                  <div className="space-y-2">
                    <Label>Casas de Banho</Label>
                    <Select
                      value={tempFilters.numeroCasaBanho}
                      onValueChange={(value) =>
                        setTempFilters((prev) => ({ ...prev, numeroCasaBanho: value }))
                      }
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

                  <div className="space-y-2">
                    <Label>Garagem</Label>
                    <Select
                      value={tempFilters.garagem}
                      onValueChange={(value) =>
                        setTempFilters((prev) => ({ ...prev, garagem: value }))
                      }
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

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={clearFilters}>
                    Limpar Filtros
                  </Button>
                  <Button onClick={applyFilters}>Aplicar Filtros</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

           {/* Resto do código... */}
           <div className="mt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="min-w-[300px] w-full">
                <Skeleton className="h-52 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500">Erro ao carregar imóveis: {error.message}</div>
        ) : data?.imoveis.length === 0 ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Alert className="w-full max-w-md border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
              <div className="flex items-center justify-center mb-2">
                <Info className="h-6 w-6 text-blue-600" />
              </div>
              <AlertTitle className="font-bold text-lg text-gray-800">
                Nenhum imóvel encontrado
              </AlertTitle>
              <AlertDescription className="text-gray-600">
                Não encontramos imóveis com os critérios selecionados. Tente ajustar seus filtros de busca.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {data?.imoveis.map((imovel) => (
              <HouseCard key={imovel.id} imovel={imovel} />
            ))}
          </div>
        )}
      </div>

      {data && data.imoveis && data.imoveis.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <Button 
            onClick={() => handlePageChange(page - 1)} 
            disabled={page === 1}
            variant="outline"
          >
            Anterior
          </Button>
          <span className="text-sm text-gray-600">
            Página {page} de {data.totalPages}
          </span>
          <Button 
            onClick={() => handlePageChange(page + 1)} 
            disabled={page === data.totalPages}
            variant="outline"
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  );
}
