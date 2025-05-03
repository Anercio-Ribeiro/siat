
// "use client";

// import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { MapPin, Bed, Bath, Calendar, User, ParkingCircle } from "lucide-react";
// import Image from "next/image";
// import { useUser } from "@/hooks/getUser";
// import { formatDate } from "@/components/house-components/rental-lists";
// import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import dynamic from "next/dynamic";
// import { toast } from "sonner";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { calcularPeriodo } from "@/app/utils/calcularPeriodo";

// const PropertyLocationMap = dynamic(
//   () => import("@/app/(protected)/detalhes/map-details"),
//   {
//     ssr: false,
//     loading: () => <Skeleton className="w-full h-[300px] rounded-lg" />,
//   }
// );

// interface Proximidade {
//   id: string;
//   nome: string;
//   tipo: string;
//   distancia: number;
//   latitude?: number;
//   longitude?: number;
// }

// interface RentalDetails {
//   id: string;
//   imovelId: string;
//   status: string;
//   checkIn: string;
//   checkOut: string;
//   periodoAluguel: number;
//   valorTotal: number;
//   tipoAluguel: "RESIDENCIAL" | "TURISTICO";
//   imovel: {
//     id: string;
//     titulo: string;
//     endereco: string;
//     preco: number;
//     precoMensal?: number;
//     numeroQuarto: number;
//     numeroCasaBanho: number;
//     garagem: boolean;
//     latitude: number;
//     longitude: number;
//     imagens: { url: string }[];
//     proximidades: { proximidade: Proximidade }[];
//     proprietarioId: string;
//     proprietario: { nome: string; telefone: string };
//   };
//   inquilino: { nome: string };
//   contrato?: { urlDocumento?: string };
// }

// async function fetchRentalDetails(id: string): Promise<RentalDetails> {
//   const response = await fetch(`/api/aluguel/${id}`, { credentials: "include" });
//   if (!response.ok) throw new Error("Erro ao buscar detalhes do aluguel");
//   return response.json();
// }

// async function updateRentalStatus({ id, status }: { id: string; status: string }) {
//   const response = await fetch(`/api/aluguel/${id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ status }),
//     credentials: "include",
//   });
//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`Erro ao atualizar status: ${response.status} - ${errorText}`);
//   }
//   return response.json();
// }

// async function createContract(data: {
//   aluguelId: string;
//   dataInicio: string;
//   dataFim: string;
//   valorTotal: number;
//   termosContrato: string;
// }) {
//   const response = await fetch(`/api/contrato`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//     credentials: "include",
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`Erro ao criar contrato: ${response.status} - ${errorText}`);
//   }

//   const blob = await response.blob();
//   const url = window.URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = `contrato-${data.aluguelId}.pdf`;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   window.URL.revokeObjectURL(url);

//   return { success: true };
// }

// function downloadPdfFromBase64(base64: string, filename: string) {
//   const byteCharacters = atob(base64);
//   const byteNumbers = new Array(byteCharacters.length);
//   for (let i = 0; i < byteCharacters.length; i++) {
//     byteNumbers[i] = byteCharacters.charCodeAt(i);
//   }
//   const byteArray = new Uint8Array(byteNumbers);
//   const blob = new Blob([byteArray], { type: "application/pdf" });
//   const url = window.URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = filename;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   window.URL.revokeObjectURL(url);
// }

// function calculateRentalPeriod(checkIn: string, checkOut: string): string {
//   const start = new Date(checkIn);
//   const end = new Date(checkOut);
//   const diffTime = Math.abs(end.getTime() - start.getTime());
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   return `${diffDays} dias`;
// }

// export default function RentalDetailsPage() {
//   const { id } = useParams();
//   const { user } = useUser();
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const [selectedStatus, setSelectedStatus] = useState<string>("");
//   const [isCarouselOpen, setIsCarouselOpen] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isContractModalOpen, setIsContractModalOpen] = useState(false);
//   const [contractData, setContractData] = useState({
//     dataInicio: "",
//     dataFim: "",
//     valorTotal: 0,
//     termosContrato: "",
//   });

//   const { data: rental, isLoading, error } = useQuery({
//     queryKey: ["rental", id],
//     queryFn: () => fetchRentalDetails(id as string),
//     enabled: !!id,
//   });

//   const statusMutation = useMutation({
//     mutationFn: updateRentalStatus,
//     onSuccess: (data) => {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           queryClient.invalidateQueries({ queryKey: ["rental", id] });
//           queryClient.invalidateQueries({ queryKey: ["rentals"] });
//           toast.success(
//             selectedStatus === "cancelado"
//               ? "Aluguel cancelado e deletado com sucesso"
//               : "Estado do aluguel atualizado com sucesso"
//           );
//           if (selectedStatus === "concluído" && !rental?.contrato) {
//             setContractData({
//               dataInicio: rental?.checkIn || "",
//               dataFim: rental?.checkOut || "",
//               valorTotal: rental?.valorTotal || 0,
//               termosContrato: `Contrato de aluguel ${rental?.tipoAluguel.toLowerCase()} entre ${
//                 rental?.inquilino.nome
//               } e ${rental?.imovel?.proprietario?.nome}.`,
//             });
//             setIsContractModalOpen(true);
//           }
//           if (selectedStatus === "cancelado") {
//             router.push("/dashboard"); // Redirect to dashboard after cancellation
//           }
//           resolve(null);
//         }, 1000);
//       });
//     },
//     onError: (error) => {
//       toast.error(error instanceof Error ? error.message : "Erro ao atualizar status");
//     },
//   });

//   const contractMutation = useMutation({
//     mutationFn: createContract,
//     onSuccess: (data) => {
//       toast.success("Contrato criado com sucesso");
//       setIsContractModalOpen(false);
//       queryClient.invalidateQueries({ queryKey: ["rental", id] });
//     },
//     onError: (error) => {
//       toast.error(error instanceof Error ? error.message : "Erro ao criar contrato");
//     },
//   });

//   const handleStatusChange = () => {
//     if (selectedStatus && rental) {
//       statusMutation.mutate({ id: rental.id, status: selectedStatus });
//     }
//   };

//   const handleContractSubmit = () => {
//     if (rental) {
//       contractMutation.mutate({
//         aluguelId: rental.id,
//         ...contractData,
//       });
//     }
//   };

//   const handleDownloadContract = () => {
//     if (rental?.contrato?.urlDocumento) {
//       downloadPdfFromBase64(rental.contrato.urlDocumento, `contrato-${rental.id}.pdf`);
//     }
//   };

//   const openCarousel = (index: number) => {
//     setCurrentImageIndex(index);
//     setIsCarouselOpen(true);
//   };

//   const nextImage = () => {
//     if (!rental) return;
//     setCurrentImageIndex((prev) =>
//       prev === rental.imovel.imagens.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevImage = () => {
//     if (!rental) return;
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? rental.imovel.imagens.length - 1 : prev - 1
//     );
//   };

//   if (isLoading) {
//     return (
//       <div className="p-6">
//         <Skeleton className="h-96 w-full mb-4" />
//         <Skeleton className="h-10 w-1/2 mb-4" />
//         <Skeleton className="h-20 w-full" />
//       </div>
//     );
//   }

//   if (error || !rental) {
//     return (
//       <Alert variant="destructive">
//         <AlertTitle>Erro</AlertTitle>
//         <AlertDescription>
//           {error instanceof Error ? error.message : "Não foi possível carregar os detalhes do aluguel"}
//         </AlertDescription>
//       </Alert>
//     );
//   }

//   const canEditStatus = rental.status === "pendente";
//   const rentalPeriod = calculateRentalPeriod(rental.checkIn, rental.checkOut);

//   return (
//     <>
//       <PageWithBreadcrumb
//         title="Dashboard"
//         breadcrumbItems={[
//           { label: "Início", href: "/" },
//           { label: "Dashboard" },
//         ]}
//       >
//         <div className="max-w-7xl mx-auto p-6 space-y-8">
//           {/* Grid de Imagens */}
//           {rental.imovel.imagens.length > 0 && (
//             <div className="grid grid-cols-2 gap-4">
//               <div className="relative w-full" style={{ height: "auto" }}>
//                 <Image
//                   src={rental.imovel.imagens[0].url}
//                   alt={`${rental.imovel.titulo} - Imagem 1`}
//                   width={0}
//                   height={0}
//                   sizes="100vw"
//                   className="w-full h-auto object-cover rounded-lg cursor-pointer"
//                   onClick={() => openCarousel(0)}
//                 />
//               </div>
//               <div
//                 className="grid grid-cols-2 gap-4"
//                 style={{ height: rental.imovel.imagens[0] ? "auto" : "18rem" }}
//               >
//                 {rental.imovel.imagens.slice(1, 5).map((img, index) => (
//                   <div
//                     key={index}
//                     className="relative w-full h-full cursor-pointer"
//                   >
//                     <Image
//                       src={img.url}
//                       alt={`${rental.imovel.titulo} - Imagem ${index + 2}`}
//                       width={0}
//                       height={0}
//                       sizes="100vw"
//                       className="w-full h-full object-cover rounded-lg"
//                       onClick={() => openCarousel(index + 1)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Carrossel de Imagens */}
//           <Dialog open={isCarouselOpen} onOpenChange={setIsCarouselOpen}>
//             <DialogContent className="max-w-4xl">
//               <DialogHeader>
//                 <DialogTitle>{rental.imovel.titulo}</DialogTitle>
//               </DialogHeader>
//               <div className="relative">
//                 <Image
//                   src={rental.imovel.imagens[currentImageIndex].url}
//                   alt={`${rental.imovel.titulo} - Imagem ${currentImageIndex + 1}`}
//                   width={800}
//                   height={600}
//                   className="object-contain rounded-lg"
//                 />
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="absolute left-2 top-1/2 transform -translate-y-1/2"
//                   onClick={prevImage}
//                 >
//                   <ChevronLeft className="h-6 w-6" />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="absolute right-2 top-1/2 transform -translate-y-1/2"
//                   onClick={nextImage}
//                 >
//                   <ChevronRight className="h-6 w-6" />
//                 </Button>
//               </div>
//             </DialogContent>
//           </Dialog>

//           {/* Cards lado a lado */}
//           <div className="grid grid-cols-4 gap-6">
//             <Card className={user?.role === "INQUILINO" || user?.role === "ADMIN" ? "col-span-4" : "col-span-3"}>
//               <CardHeader className="py-4 pl-7">
//                 <CardTitle>Detalhes do Aluguel</CardTitle>
//               </CardHeader>
//               <hr className="pt-2" />
//               <CardContent className="space-y-4">
//                 <div className="flex items-center">
//                   <p className="">{rental.imovel.titulo}</p>
//                 </div>
//                 <div className="flex items-center">
//                   <User className="w-5 h-5 mr-2" />
//                   <span>Inquilino: {rental.inquilino.nome}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Calendar className="w-5 h-5 mr-2" />
//                   <span>
//                     Check-In: {formatDate(rental.checkIn)} | Check-Out: {formatDate(rental.checkOut)}
//                   </span>
//                 </div>
//                 <div className="flex items-center">
//                   <Calendar className="w-5 h-5 mr-2" />
//                   <span>Período de Aluguel: {calcularPeriodo(rental.periodoAluguel)}</span>
//                 </div>
//                 <div className="flex items-center">
//                   Estado: <Badge
//                     style={{
//                       backgroundColor:
//                         rental.status === "pendente"
//                           ? "yellow"
//                           : rental.status === "em aluguel"
//                           ? "blue"
//                           : rental.status === "concluído"
//                           ? "green"
//                           : "red",
//                       color: rental.status === "pendente" ? "black" : "white",
//                     }}
//                     className="ml-2"
//                   >
//                     {rental.status}
//                   </Badge>
//                 </div>
//                 <div>
//                   <p className="flex items-center">
//                     Preço: {rental.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })}
//                   </p>
//                   <p className="flex items-center">
//                     <Bed className="w-5 h-5 mr-2" />
//                     Quartos: {rental.imovel.numeroQuarto}
//                   </p>
//                   <p className="flex items-center">
//                     <Bath className="w-5 h-5 mr-2" />
//                     Casas de banho: {rental.imovel.numeroCasaBanho}
//                   </p>
//                   <p className="flex items-center">
//                     <ParkingCircle className="w-5 h-5 mr-2" />
//                     Garagem: {rental.imovel.garagem ? "Sim" : "Não"}
//                   </p>
//                 </div>
//                 {rental.contrato?.urlDocumento && (
//                   <Button variant="outline" onClick={handleDownloadContract}>
//                     Ver Contrato
//                   </Button>
//                 )}
//               </CardContent>
//             </Card>

//             {user?.role !== "INQUILINO" && canEditStatus && (
//               <Card className="col-span-1 flex flex-col">
//                 <CardHeader className="py-4 pl-6">
//                   <CardTitle>Atualizar Estado do Aluguel</CardTitle>
//                 </CardHeader>
//                 <hr className="pt-2" />
//                 <CardContent className="space-y-4 flex flex-col flex-grow">
//                   <Select onValueChange={setSelectedStatus} value={selectedStatus}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Selecione um status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="em aluguel">Em Aluguel</SelectItem>
//                       <SelectItem value="cancelado">Cancelado</SelectItem>
//                       <SelectItem value="concluído">Concluído</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <Button
//                     onClick={handleStatusChange}
//                     disabled={!selectedStatus || statusMutation.isPending}
//                     className="mt-auto"
//                   >
//                     {statusMutation.isPending ? (
//                       <>
//                         <svg
//                           className="animate-spin h-5 w-5 mr-2"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                           <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                         </svg>
//                         Atualizando...
//                       </>
//                     ) : (
//                       "Atualizar Status"
//                     )}
//                   </Button>
//                   {statusMutation.error && (
//                     <Alert variant="destructive">
//                       <AlertDescription>
//                         {statusMutation.error instanceof Error ? statusMutation.error.message : "Erro ao atualizar"}
//                       </AlertDescription>
//                     </Alert>
//                   )}
//                 </CardContent>
//               </Card>
//             )}
//           </div>

//           {/* Mapas lado a lado */}
//           <div className="grid grid-cols-2 gap-6">
//             <Card>
//               <CardHeader className="py-4 pl-6">
//                 <CardTitle>Localização do Imóvel</CardTitle>
//               </CardHeader>
//               <hr className="pt-2" />
//               <CardContent>
//                 <PropertyLocationMap
//                   mapId="location-map"
//                   latitude={rental.imovel.latitude}
//                   longitude={rental.imovel.longitude}
//                 />
//                 <div className="mt-2 text-gray-600 flex items-center">
//                   <MapPin className="w-4 h-4 mr-1" />
//                   {rental.imovel.endereco}
//                 </div>
//               </CardContent>
//             </Card>

//             {rental.imovel.proximidades.length > 0 && (
//               <Card>
//                 <CardHeader className="py-4 pl-6">
//                   <CardTitle>Proximidades</CardTitle>
//                 </CardHeader>
//                 <hr className="pt-2" />
//                 <CardContent>
//                   <PropertyLocationMap
//                     mapId="proximities-map"
//                     latitude={rental.imovel.latitude}
//                     longitude={rental.imovel.longitude}
//                     proximidades={rental.imovel.proximidades.map((prox) => ({
//                       id: prox.proximidade.id,
//                       nome: prox.proximidade.nome,
//                       tipo: prox.proximidade.tipo,
//                       latitude: prox.proximidade.latitude ?? rental.imovel.latitude,
//                       longitude: prox.proximidade.longitude ?? rental.imovel.longitude,
//                       calculated_distance: prox.proximidade.distancia,
//                     }))}
//                   />
//                   <ul className="mt-4 grid grid-cols-1 gap-2">
//                     {rental.imovel.proximidades.map((prox) => (
//                       <li key={prox.proximidade.id} className="flex items-center">
//                         <span className="mr-2">{prox.proximidade.nome}</span>
//                         <Badge variant="secondary">{prox.proximidade.distancia.toFixed(1)} km</Badge>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>
//             )}
//           </div>

//           {/* Modal de Confirmação do Contrato */}
//           <Dialog open={isContractModalOpen} onOpenChange={setIsContractModalOpen}>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Criar Contrato de Aluguel</DialogTitle>
//               </DialogHeader>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium">Data de Início</label>
//                   <Input
//                     type="date"
//                     value={contractData.dataInicio.split("T")[0]}
//                     onChange={(e) =>
//                       setContractData({ ...contractData, dataInicio: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium">Data de Fim</label>
//                   <Input
//                     type="date"
//                     value={contractData.dataFim.split("T")[0]}
//                     onChange={(e) =>
//                       setContractData({ ...contractData, dataFim: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium">Valor Total (AOA)</label>
//                   <Input
//                     type="number"
//                     value={contractData.valorTotal}
//                     onChange={(e) =>
//                       setContractData({ ...contractData, valorTotal: parseFloat(e.target.value) })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium">Termos do Contrato</label>
//                   <Textarea
//                     value={contractData.termosContrato}
//                     onChange={(e) =>
//                       setContractData({ ...contractData, termosContrato: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button variant="outline" onClick={() => setIsContractModalOpen(false)}>
//                   Cancelar
//                 </Button>
//                 <Button
//                   onClick={handleContractSubmit}
//                   disabled={contractMutation.isPending}
//                 >
//                   {contractMutation.isPending ? "Criando..." : "Criar Contrato"}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </PageWithBreadcrumb>
//     </>
//   );
// }











"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapPin, Bed, Bath, Calendar, User, ParkingCircle } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/hooks/getUser";
import { formatDate } from "@/components/house-components/rental-lists";
import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { calcularPeriodo } from "@/app/utils/calcularPeriodo";

const PropertyLocationMap = dynamic(
  () => import("@/app/(protected)/detalhes/map-details"),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[300px] rounded-lg" />,
  }
);

interface Proximidade {
  id: string;
  nome: string;
  tipo: string;
  distancia: number;
  latitude?: number;
  longitude?: number;
}

interface RentalDetails {
  id: string;
  imovelId: string;
  status: string;
  checkIn: string;
  checkOut: string;
  periodoAluguel: number;
  valorTotal: number;
  tipoAluguel: "RESIDENCIAL" | "TURISTICO";
  imovel: {
    id: string;
    titulo: string;
    endereco: string;
    preco: number;
    precoMensal?: number;
    numeroQuarto: number;
    numeroCasaBanho: number;
    garagem: boolean;
    latitude: number;
    longitude: number;
    imagens: { url: string }[];
    proximidades: { proximidade: Proximidade }[];
    proprietarioId: string;
    proprietario: { nome: string; telefone: string };
  };
  inquilino: { nome: string };
  contrato?: { urlDocumento?: string };
}

async function fetchRentalDetails(id: string): Promise<RentalDetails> {
  const response = await fetch(`/api/aluguel/${id}`, { credentials: "include" });
  if (!response.ok) throw new Error("Erro ao buscar detalhes do aluguel");
  return response.json();
}

async function updateRentalStatus({ id, status }: { id: string; status: string }) {
  const response = await fetch(`/api/aluguel/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
    credentials: "include",
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ao atualizar status: ${response.status} - ${errorText}`);
  }
  return response.json();
}

async function createContract(data: {
  aluguelId: string;
  dataInicio: string;
  dataFim: string;
  valorTotal: number;
  termosContrato: string;
}) {
  const response = await fetch(`/api/contratos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ao criar contrato: ${response.status} - ${errorText}`);
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `contrato-${data.aluguelId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);

  return { success: true };
}

function downloadPdfFromBase64(base64: string, filename: string) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

function calculateRentalPeriod(checkIn: string, checkOut: string): string {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} dias`;
}

export default function RentalDetailsPage() {
  const { id } = useParams();
  const { user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [contractData, setContractData] = useState({
    dataInicio: "",
    dataFim: "",
    valorTotal: 0,
    termosContrato: "",
  });

  const { data: rental, isLoading, error } = useQuery({
    queryKey: ["rental", id],
    queryFn: () => fetchRentalDetails(id as string),
    enabled: !!id,
  });

  const statusMutation = useMutation({
    mutationFn: updateRentalStatus,
    onSuccess: (data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ["rental", id] });
          queryClient.invalidateQueries({ queryKey: ["rentals"] });
          toast.success(
            selectedStatus === "cancelado"
              ? "Aluguel cancelado e deletado com sucesso"
              : "Estado do aluguel atualizado com sucesso"
          );
          if (selectedStatus === "concluído" && !rental?.contrato) {
            setContractData({
              dataInicio: rental?.checkIn || "",
              dataFim: rental?.checkOut || "",
              valorTotal: rental?.valorTotal || 0,
              termosContrato: `Contrato de aluguel ${rental?.tipoAluguel.toLowerCase()} entre ${
                rental?.inquilino.nome
              } e ${rental?.imovel?.proprietario?.nome}.`,
            });
            setIsContractModalOpen(true);
          }
          if (selectedStatus === "cancelado") {
            router.push("/dashboard");
          }
          resolve(null);
        }, 1000);
      });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Erro ao atualizar status");
    },
  });

  const contractMutation = useMutation({
    mutationFn: createContract,
    onSuccess: (data) => {
      toast.success("Contrato criado com sucesso");
      setIsContractModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["rental", id] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Erro ao criar contrato");
    },
  });

  const handleStatusChange = () => {
    if (selectedStatus && rental) {
      statusMutation.mutate({ id: rental.id, status: selectedStatus });
    }
  };

  const handleContractSubmit = () => {
    if (rental) {
      contractMutation.mutate({
        aluguelId: rental.id,
        ...contractData,
      });
    }
  };

  const handleDownloadContract = () => {
    if (rental?.contrato?.urlDocumento) {
      downloadPdfFromBase64(rental.contrato.urlDocumento, `contrato-${rental.id}.pdf`);
    }
  };

  const openCarousel = (index: number) => {
    setCurrentImageIndex(index);
    setIsCarouselOpen(true);
  };

  const nextImage = () => {
    if (!rental) return;
    setCurrentImageIndex((prev) =>
      prev === rental.imovel.imagens.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!rental) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? rental.imovel.imagens.length - 1 : prev - 1
    );
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-96 w-full mb-4" />
        <Skeleton className="h-10 w-1/2 mb-4" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (error || !rental) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : "Não foi possível carregar os detalhes do aluguel"}
        </AlertDescription>
      </Alert>
    );
  }

  const canEditStatus = rental.status === "pendente";
  const rentalPeriod = calculateRentalPeriod(rental.checkIn, rental.checkOut);

  return (
    <>
      <PageWithBreadcrumb
        title="Dashboard"
        breadcrumbItems={[
          { label: "Início", href: "/" },
          { label: "Dashboard" },
        ]}
      >
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Grid de Imagens */}
          {rental.imovel.imagens.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="relative w-full" style={{ height: "auto" }}>
                <Image
                  src={rental.imovel.imagens[0].url}
                  alt={`${rental.imovel.titulo} - Imagem 1`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto object-cover rounded-lg cursor-pointer"
                  onClick={() => openCarousel(0)}
                />
              </div>
              <div
                className="grid grid-cols-2 gap-4"
                style={{ height: rental.imovel.imagens[0] ? "auto" : "18rem" }}
              >
                {rental.imovel.imagens.slice(1, 5).map((img, index) => (
                  <div
                    key={index}
                    className="relative w-full h-full cursor-pointer"
                  >
                    <Image
                      src={img.url}
                      alt={`${rental.imovel.titulo} - Imagem ${index + 2}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-full object-cover rounded-lg"
                      onClick={() => openCarousel(index + 1)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Carrossel de Imagens */}
          <Dialog open={isCarouselOpen} onOpenChange={setIsCarouselOpen}>
            <DialogContent className="max-w-4xl dialog-content">
              <DialogHeader>
                <DialogTitle>{rental.imovel.titulo}</DialogTitle>
              </DialogHeader>
              <div className="relative">
                <Image
                  src={rental.imovel.imagens[currentImageIndex].url}
                  alt={`${rental.imovel.titulo} - Imagem ${currentImageIndex + 1}`}
                  width={800}
                  height={600}
                  className="object-contain rounded-lg"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Cards lado a lado */}
          <div className="grid grid-cols-4 gap-6">
            <Card className={user?.role === "INQUILINO" || user?.role === "ADMIN" ? "col-span-4" : "col-span-3"}>
              <CardHeader className="py-4 pl-7">
                <CardTitle>Detalhes do Aluguel</CardTitle>
              </CardHeader>
              <hr className="pt-2" />
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <p className="">{rental.imovel.titulo}</p>
                </div>
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  <span>Inquilino: {rental.inquilino.nome}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>
                    Check-In: {formatDate(rental.checkIn)} | Check-Out: {formatDate(rental.checkOut)}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>Período de Aluguel: {calcularPeriodo(rental.periodoAluguel)}</span>
                </div>
                <div className="flex items-center">
                  Estado: <Badge
                    style={{
                      backgroundColor:
                        rental.status === "pendente"
                          ? "yellow"
                          : rental.status === "em aluguel"
                          ? "blue"
                          : rental.status === "concluído"
                          ? "green"
                          : "red",
                      color: rental.status === "pendente" ? "black" : "white",
                    }}
                    className="ml-2"
                  >
                    {rental.status}
                  </Badge>
                </div>
                <div>
                  <p className="flex items-center">
                    Preço: {rental.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })}
                  </p>
                  <p className="flex items-center">
                    <Bed className="w-5 h-5 mr-2" />
                    Quartos: {rental.imovel.numeroQuarto}
                  </p>
                  <p className="flex items-center">
                    <Bath className="w-5 h-5 mr-2" />
                    Casas de banho: {rental.imovel.numeroCasaBanho}
                  </p>
                  <p className="flex items-center">
                    <ParkingCircle className="w-5 h-5 mr-2" />
                    Garagem: {rental.imovel.garagem ? "Sim" : "Não"}
                  </p>
                </div>
                {rental.contrato?.urlDocumento && (
                  <Button variant="outline" onClick={handleDownloadContract}>
                    Ver Contrato
                  </Button>
                )}
              </CardContent>
            </Card>

            {user?.role !== "INQUILINO" && canEditStatus && (
              <Card className="col-span-1 flex flex-col">
                <CardHeader className="py-4 pl-6">
                  <CardTitle>Atualizar Estado do Aluguel</CardTitle>
                </CardHeader>
                <hr className="pt-2" />
                <CardContent className="space-y-4 flex flex-col flex-grow">
                  <Select onValueChange={setSelectedStatus} value={selectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="em aluguel">Em Aluguel</SelectItem>
                      <SelectItem value="cancelado">Cancelado</SelectItem>
                      <SelectItem value="concluído">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleStatusChange}
                    disabled={!selectedStatus || statusMutation.isPending}
                    className="mt-auto"
                  >
                    {statusMutation.isPending ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-2"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Atualizando...
                      </>
                    ) : (
                      "Atualizar Status"
                    )}
                  </Button>
                  {statusMutation.error && (
                    <Alert variant="destructive">
                      <AlertDescription>
                        {statusMutation.error instanceof Error ? statusMutation.error.message : "Erro ao atualizar"}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Mapas lado a lado */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader className="py-4 pl-6">
                <CardTitle>Localização do Imóvel</CardTitle>
              </CardHeader>
              <hr className="pt-2" />
              <CardContent>
                <PropertyLocationMap
                  mapId="location-map"
                  latitude={rental.imovel.latitude}
                  longitude={rental.imovel.longitude}
                  titulo={rental.imovel.titulo}
                  preco={rental.imovel.preco}
                  precoMensal={rental.imovel.precoMensal}
                  endereco={rental.imovel.endereco}
                />
                <div className="mt-2 text-gray-600 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {rental.imovel.endereco}
                </div>
              </CardContent>
            </Card>

            {rental.imovel.proximidades.length > 0 && (
              <Card>
                <CardHeader className="py-4 pl-6">
                  <CardTitle>Proximidades</CardTitle>
                </CardHeader>
                <hr className="pt-2" />
                <CardContent>
                  <PropertyLocationMap
                    mapId="proximities-map"
                    latitude={rental.imovel.latitude}
                    longitude={rental.imovel.longitude}
                    titulo={rental.imovel.titulo}
                    preco={rental.imovel.preco}
                    precoMensal={rental.imovel.precoMensal}
                    endereco={rental.imovel.endereco}
                    proximidades={rental.imovel.proximidades.map((prox) => ({
                      id: prox.proximidade.id,
                      nome: prox.proximidade.nome,
                      tipo: prox.proximidade.tipo,
                      latitude: prox.proximidade.latitude ?? rental.imovel.latitude,
                      longitude: prox.proximidade.longitude ?? rental.imovel.longitude,
                      calculated_distance: prox.proximidade.distancia,
                    }))}
                  />
                  <ul className="mt-4 grid grid-cols-1 gap-2">
                    {rental.imovel.proximidades.map((prox) => (
                      <li key={prox.proximidade.id} className="flex items-center">
                        <span className="mr-2">{prox.proximidade.nome}</span>
                        <Badge variant="secondary">{prox.proximidade.distancia.toFixed(1)} km</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Modal de Confirmação do Contrato */}
          <Dialog open={isContractModalOpen} onOpenChange={setIsContractModalOpen}>
            <DialogContent className="dialog-content">
              <DialogHeader>
                <DialogTitle>Criar Contrato de Aluguel</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Data de Início</label>
                  <Input
                    type="date"
                    value={contractData.dataInicio.split("T")[0]}
                    onChange={(e) =>
                      setContractData({ ...contractData, dataInicio: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Data de Fim</label>
                  <Input
                    type="date"
                    value={contractData.dataFim.split("T")[0]}
                    onChange={(e) =>
                      setContractData({ ...contractData, dataFim: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Valor Total (AOA)</label>
                  <Input
                    type="number"
                    value={contractData.valorTotal}
                    onChange={(e) =>
                      setContractData({ ...contractData, valorTotal: parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Termos do Contrato</label>
                  <Textarea
                    value={contractData.termosContrato}
                    onChange={(e) =>
                      setContractData({ ...contractData, termosContrato: e.target.value })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsContractModalOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleContractSubmit}
                  disabled={contractMutation.isPending}
                >
                  {contractMutation.isPending ? "Criando..." : "Criar Contrato"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </PageWithBreadcrumb>
    </>
  );
}