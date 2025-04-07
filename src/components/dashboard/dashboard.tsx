// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   BarElement,
//   CategoryScale,
//   LinearScale,
// } from "chart.js";
// import { Loader2, Maximize2, Minimize2 } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { useUser } from "@/hooks/getUser";

// ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// type DashboardData = {
//   precoZona: any[];
//   proximidades: any[];
//   precoPorMes: any[];
//   precoMensalZona: any[];
// };

// export default function EstatisticasDashboard() {
//   const user = useUser(); // Hook para obter o usuário logado

//   const [residencialData, setResidencialData] = useState<DashboardData>({
//     precoZona: [],
//     proximidades: [],
//     precoPorMes: [],
//     precoMensalZona: [],
//   });
//   const [turisticoData, setTuristicoData] = useState<DashboardData>({
//     precoZona: [],
//     proximidades: [],
//     precoPorMes: [],
//     precoMensalZona: [],
//   });
  
//   const [loading, setLoading] = useState({ residencial: true, turistico: true });
//   const [loadingPrecoMensalZona, setLoadingPrecoMensalZona] = useState({ residencial: true, turistico: true });
//   const [expandedChart, setExpandedChart] = useState<string | null>(null);
//   const [residencialYear, setResidencialYear] = useState<string>("2025");
//   const [turisticoYear, setTuristicoYear] = useState<string>("2025");
//   const [selectedProvincia, setSelectedProvincia] = useState<string>("all");
//   const [selectedBairro, setSelectedBairro] = useState<string>("all");
//   const [hiddenProximidadesRes, setHiddenProximidadesRes] = useState<Set<string>>(new Set());
//   const [hiddenProximidadesTur, setHiddenProximidadesTur] = useState<Set<string>>(new Set());

 

//   // Fetch para os dados gerais (exceto Preço Mensal por Zona)
 
//   useEffect(() => {
//     const fetchResidencialData = async () => {
//       setLoading((prev) => ({ ...prev, residencial: true }));
//       try {
//         const [precoZonaRes, proxRes, precoMesRes] = await Promise.all([
//           fetch(`/api/dashboard?tipo=preco-por-zona&year=${residencialYear}&tipoAluguel=RESIDENCIAL`).then((res) => res.json()),
//           fetch(`/api/dashboard?tipo=proximidades&year=${residencialYear}&tipoAluguel=RESIDENCIAL`).then((res) => res.json()),
//           fetch(`/api/dashboard?tipo=preco-por-mes&year=${residencialYear}&tipoAluguel=RESIDENCIAL`).then((res) => res.json()),
//         ]);
//         setResidencialData((prev) => ({
//           ...prev,
//           precoZona: precoZonaRes,
//           proximidades: proxRes,
//           precoPorMes: precoMesRes,
//         }));
//       } catch (error) {
//         console.error("Erro ao buscar dados residenciais:", error);
//       } finally {
//         setLoading((prev) => ({ ...prev, residencial: false }));
//       }
//     };

//     const fetchTuristicoData = async () => {
//       setLoading((prev) => ({ ...prev, turistico: true }));
//       try {
//         const [precoZonaRes, proxRes, precoMesRes] = await Promise.all([
//           fetch(`/api/dashboard?tipo=preco-por-zona&year=${turisticoYear}&tipoAluguel=TURISTICO`).then((res) => res.json()),
//           fetch(`/api/dashboard?tipo=proximidades&year=${turisticoYear}&tipoAluguel=TURISTICO`).then((res) => res.json()),
//           fetch(`/api/dashboard?tipo=preco-por-mes&year=${turisticoYear}&tipoAluguel=TURISTICO`).then((res) => res.json()),
//         ]);
//         setTuristicoData((prev) => ({
//           ...prev,
//           precoZona: precoZonaRes,
//           proximidades: proxRes,
//           precoPorMes: precoMesRes,
//         }));
//       } catch (error) {
//         console.error("Erro ao buscar dados turísticos:", error);
//       } finally {
//         setLoading((prev) => ({ ...prev, turistico: false }));
//       }
//     };

//     fetchResidencialData();
//     fetchTuristicoData();
//   }, [residencialYear, turisticoYear]); // Apenas depende do ano

//   // Fetch específico para Preço Mensal por Zona
//   useEffect(() => {
//     const fetchPrecoMensalZonaResidencial = async () => {
//       setLoadingPrecoMensalZona((prev) => ({ ...prev, residencial: true }));
//       try {
//         const precoMensalZonaRes = await fetch(
//           `/api/dashboard?tipo=preco-mensal-zona&year=${residencialYear}&tipoAluguel=RESIDENCIAL&provincia=${selectedProvincia}&bairro=${selectedBairro}`
//         ).then((res) => res.json());
//         setResidencialData((prev) => ({
//           ...prev,
//           precoMensalZona: precoMensalZonaRes,
//         }));
//       } catch (error) {
//         console.error("Erro ao buscar preço mensal por zona residencial:", error);
//       } finally {
//         setLoadingPrecoMensalZona((prev) => ({ ...prev, residencial: false }));
//       }
//     };

//     const fetchPrecoMensalZonaTuristico = async () => {
//       setLoadingPrecoMensalZona((prev) => ({ ...prev, turistico: true }));
//       try {
//         const precoMensalZonaRes = await fetch(
//           `/api/dashboard?tipo=preco-mensal-zona&year=${turisticoYear}&tipoAluguel=TURISTICO&provincia=${selectedProvincia}&bairro=${selectedBairro}`
//         ).then((res) => res.json());
//         setTuristicoData((prev) => ({
//           ...prev,
//           precoMensalZona: precoMensalZonaRes,
//         }));
//       } catch (error) {
//         console.error("Erro ao buscar preço mensal por zona turístico:", error);
//       } finally {
//         setLoadingPrecoMensalZona((prev) => ({ ...prev, turistico: false }));
//       }
//     };

//     fetchPrecoMensalZonaResidencial();
//     fetchPrecoMensalZonaTuristico();
//   }, [residencialYear, turisticoYear, selectedProvincia, selectedBairro]); // Depende do ano e dos filtros

//   const colors = [
//     "#FF6384",
//     "#36A2EB",
//     "#FFCE56",
//     "#4BC0C0",
//     "#9966FF",
//     "#FF9F40",
//     "#C9CBCF",
//     "#FF5733",
//     "#33FF57",
//     "#3357FF",
//     "#FF33A1",
//     "#A133FF",
//   ];

//   const chartOptions = {
//     maintainAspectRatio: false,
//     plugins: { legend: { position: "top" as const } },
//   };

//   const pieOptions = (data: any[], hiddenSet: Set<string>, setHidden: (set: Set<string>) => void) => ({
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "bottom" as const,
//         labels: {
//           boxWidth: 20,
//           padding: 10,
//           generateLabels: (chart: any) => {
//             const total = data.reduce((sum, p) => sum + p.count, 0);
//             return data.map((p, index) => {
//               const value = p.count;
//               const percentage = ((value / total) * 100).toFixed(1);
//               return {
//                 text: `${p.tipo}: ${percentage}%`,
//                 fillStyle: colors[index % colors.length],
//                 hidden: hiddenSet.has(p.tipo),
//                 index,
//               };
//             });
//           },
//         },
//         onClick: (e: any, legendItem: any) => {
//           const label = data[legendItem.index].tipo;
//           const newSet = new Set(hiddenSet);
//           if (newSet.has(label)) {
//             newSet.delete(label);
//           } else {
//             newSet.add(label);
//           }
//           setHidden(newSet);
//         },
//       },
//     },
//   });

//   const years = Array.from({ length: 10 }, (_, i) => (2025 - i).toString());
//   const provincias = [
//     "all",
//     ...Array.from(new Set([...residencialData.precoZona, ...turisticoData.precoZona].map((p) => p.provincia))),
//   ];
//   const bairros = [
//     "all",
//     ...Array.from(
//       new Set(
//         [...residencialData.precoZona, ...turisticoData.precoZona]
//           .filter((p) => p.provincia === selectedProvincia || selectedProvincia === "all")
//           .map((p) => p.bairro)
//       )
//     ),
//   ];

//   const renderDashboard = (
//     data: DashboardData,
//     tipo: "Residencial" | "Turístico",
//     year: string,
//     setYear: (year: string) => void
//   ) => {
//     const prefix = tipo === "Residencial" ? "res" : "tur";
//     const hiddenSet = tipo === "Residencial" ? hiddenProximidadesRes : hiddenProximidadesTur;
//     const setHidden = tipo === "Residencial" ? setHiddenProximidadesRes : setHiddenProximidadesTur;

//     // Filtra os dados de precoMensalZona com base na província e/ou bairro selecionados
//     const filteredPrecoMensalZona = data.precoMensalZona.filter((item) => {
//       const matchProvincia = selectedProvincia === "all" || item.provincia === selectedProvincia;
//       const matchBairro = selectedBairro === "all" || item.bairro === selectedBairro;
//       return matchProvincia && matchBairro;
//     });

//     if(user?.user?.role !== "ADMIN") {
//       return false;
//     }

//     return (
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-2xl font-bold">{tipo}</h2>
//           <Select value={year} onValueChange={setYear}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Selecione o ano" />
//             </SelectTrigger>
//             <SelectContent>
//               {years.map((year) => (
//                 <SelectItem key={year} value={year}>
//                   {year}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {/* Preço Médio por Zona */}
//           <Card className={`w-full ${expandedChart === `${prefix}-precoZona` ? "lg:col-span-3" : ""}`}>
//             <CardHeader className="flex flex-row justify-between items-center px-4 pt-4">
//               <CardTitle className="text-lg">Preço Médio por Zona</CardTitle>
//               <Button
//                 onClick={() => setExpandedChart(expandedChart === `${prefix}-precoZona` ? null : `${prefix}-precoZona`)}
//               >
//                 {expandedChart === `${prefix}-precoZona` ? (
//                   <Minimize2 className="w-5 h-5 text-blue-500" />
//                 ) : (
//                   <Maximize2 className="w-5 h-5 text-blue-500" />
//                 )}
//               </Button>
//             </CardHeader>
//             <CardContent className="h-[400px]">
//               {loading[tipo.toLowerCase() as "residencial" | "turistico"] ? (
//                 <div className="flex flex-col items-center justify-center h-full">
//                   <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
//                   <Skeleton className="w-full h-[300px] mt-4" />
//                 </div>
//               ) : data.precoZona.length > 0 ? (
//                 <Bar
//                   data={{
//                     labels: data.precoZona.map((p) => p.zona),
//                     datasets: [
//                       {
//                         label: `Preço Médio (${tipo === "Residencial" ? "Mensal" : "Diário"})`,
//                         data: data.precoZona.map((p) => p.precoMedio),
//                         backgroundColor: colors.slice(0, data.precoZona.length),
//                       },
//                     ],
//                   }}
//                   options={chartOptions}
//                 />
//               ) : (
//                 <p>Sem dados</p>
//               )}
//             </CardContent>
//           </Card>

//           {/* Proximidades Mais Procuradas */}
//           <Card className={`w-full ${expandedChart === `${prefix}-proximidades` ? "lg:col-span-3" : ""}`}>
//             <CardHeader className="flex flex-row justify-between items-center px-4 pt-4">
//               <CardTitle className="text-lg">Proximidades Mais Procuradas</CardTitle>
//               <Button
//                 onClick={() =>
//                   setExpandedChart(expandedChart === `${prefix}-proximidades` ? null : `${prefix}-proximidades`)
//                 }
//               >
//                 {expandedChart === `${prefix}-proximidades` ? (
//                   <Minimize2 className="w-5 h-5 text-blue-500" />
//                 ) : (
//                   <Maximize2 className="w-5 h-5 text-blue-500" />
//                 )}
//               </Button>
//             </CardHeader>
//             <CardContent className="h-[400px]">
//               {loading[tipo.toLowerCase() as "residencial" | "turistico"] ? (
//                 <div className="flex flex-col items-center justify-center h-full">
//                   <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
//                   <Skeleton className="w-full h-[300px] mt-4" />
//                 </div>
//               ) : data.proximidades.length > 0 ? (
//                 <Pie
//                   data={{
//                     labels: data.proximidades.map((p) => p.tipo),
//                     datasets: [
//                       {
//                         data: data.proximidades.map((p) => (hiddenSet.has(p.tipo) ? 0 : p.count)),
//                         backgroundColor: colors.slice(0, data.proximidades.length),
//                       },
//                     ],
//                   }}
//                   options={pieOptions(data.proximidades, hiddenSet, setHidden)}
//                 />
//               ) : (
//                 <p>Sem dados</p>
//               )}
//             </CardContent>
//           </Card>

//           {/* Variação de Preço por Mês */}
//           <Card className={`w-full ${expandedChart === `${prefix}-precoPorMes` ? "lg:col-span-3" : ""}`}>
//             <CardHeader className="flex flex-row justify-between items-center px-4 pt-4">
//               <CardTitle className="text-lg">Variação de Preço por Mês</CardTitle>
//               <Button
//                 onClick={() => setExpandedChart(expandedChart === `${prefix}-precoPorMes` ? null : `${prefix}-precoPorMes`)}
//               >
//                 {expandedChart === `${prefix}-precoPorMes` ? (
//                   <Minimize2 className="w-5 h-5 text-blue-500" />
//                 ) : (
//                   <Maximize2 className="w-5 h-5 text-blue-500" />
//                 )}
//               </Button>
//             </CardHeader>
//             <CardContent className="h-[400px]">
//               {loading[tipo.toLowerCase() as "residencial" | "turistico"] ? (
//                 <div className="flex flex-col items-center justify-center h-full">
//                   <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
//                   <Skeleton className="w-full h-[300px] mt-4" />
//                 </div>
//               ) : data.precoPorMes.length > 0 ? (
//                 <Bar
//                   data={{
//                     labels: data.precoPorMes.map((p) => p.mes),
//                     datasets: [
//                       {
//                         label: `Preço Médio por Mês (${tipo === "Residencial" ? "Mensal" : "Diário"})`,
//                         data: data.precoPorMes.map((p) => p.precoMedio),
//                         backgroundColor: colors.slice(0, data.precoPorMes.length),
//                       },
//                     ],
//                   }}
//                   options={chartOptions}
//                 />
//               ) : (
//                 <p>Sem dados</p>
//               )}
//             </CardContent>
//           </Card>

//           {/* Preço Mensal por Zona - Sempre em tela cheia */}
//           <Card className="w-full lg:col-span-3">
//             <CardHeader className="flex flex-row justify-between items-center px-4 pt-4">
//               <CardTitle className="text-lg">Preço Mensal por Zona</CardTitle>
//               <Button
//                 onClick={() =>
//                   setExpandedChart(expandedChart === `${prefix}-precoMensalZona` ? null : `${prefix}-precoMensalZona`)
//                 }
//               >
//                 {expandedChart === `${prefix}-precoMensalZona` ? (
//                   <Minimize2 className="w-5 h-5 text-blue-500" />
//                 ) : (
//                   <Maximize2 className="w-5 h-5 text-blue-500" />
//                 )}
//               </Button>
//             </CardHeader>
//             <div className="px-6 pb-4 flex space-x-4">
//               <Select value={selectedProvincia} onValueChange={setSelectedProvincia}>
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Província" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {provincias.map((provincia) => (
//                     <SelectItem key={provincia} value={provincia}>
//                       {provincia === "all" ? "Todas" : provincia}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <Select value={selectedBairro} onValueChange={setSelectedBairro}>
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Bairro" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {bairros.map((bairro) => (
//                     <SelectItem key={bairro} value={bairro}>
//                       {bairro === "all" ? "Todos" : bairro}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <CardContent className="h-[400px]">
//               {loadingPrecoMensalZona[tipo.toLowerCase() as "residencial" | "turistico"] ? (
//                 <div className="flex flex-col items-center justify-center h-full">
//                   <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
//                   <Skeleton className="w-full h-[300px] mt-4" />
//                 </div>
//               ) : filteredPrecoMensalZona.length > 0 ? (
//                 <Bar
//                   data={{
//                     labels: filteredPrecoMensalZona.map((item) => item.mes),
//                     datasets: [
//                       {
//                         label: `Preço ${tipo === "Residencial" ? "Mensal" : "Diário"} (${
//                           selectedBairro !== "all" ? selectedBairro : selectedProvincia !== "all" ? selectedProvincia : "Todas as Zonas"
//                         })`,
//                         data: filteredPrecoMensalZona.map((item) => item.preco),
//                         backgroundColor: colors.slice(0, filteredPrecoMensalZona.length),
//                       },
//                     ],
//                   }}
//                   options={chartOptions}
//                 />
//               ) : (
//                 <p>Sem dados para a seleção atual</p>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-12">
//       {renderDashboard(residencialData, "Residencial", residencialYear, setResidencialYear)}
//       {renderDashboard(turisticoData, "Turístico", turisticoYear, setTuristicoYear)}
//     </div>
//   );
// }












"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Loader2, Maximize2, Minimize2, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/getUser";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

type DashboardData = {
  precoZona: { zona: string; precoMedio: number; provincia: string; bairro: string }[];
  proximidades: { tipo: string; count: number }[];
  precoPorMes: { mes: string; precoMedio: number }[];
  precoMensalZona: { zona: string; mes: string; preco: number; provincia: string; bairro: string }[];
  totalImoveis: number;
  totalAlugados: number;
  zonasMaisAlugadas: { provincia: string; bairro: string; count: number; mes: string }[];
};

export default function EstatisticasDashboard() {
  const { user } = useUser();
  const [activeDashboard, setActiveDashboard] = useState<"Residencial" | "Turístico">("Residencial");
  const [residencialData, setResidencialData] = useState<DashboardData>({
    precoZona: [],
    proximidades: [],
    precoPorMes: [],
    precoMensalZona: [],
    totalImoveis: 0,
    totalAlugados: 0,
    zonasMaisAlugadas: [],
  });
  const [turisticoData, setTuristicoData] = useState<DashboardData>({
    precoZona: [],
    proximidades: [],
    precoPorMes: [],
    precoMensalZona: [],
    totalImoveis: 0,
    totalAlugados: 0,
    zonasMaisAlugadas: [],
  });
  const [loading, setLoading] = useState({ residencial: true, turistico: true });
  const [expandedChart, setExpandedChart] = useState<string | null>(null);
  const [residencialYear, setResidencialYear] = useState<string>("2025");
  const [turisticoYear, setTuristicoYear] = useState<string>("2025");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedProvincia, setSelectedProvincia] = useState<string>("all");
  const [selectedBairro, setSelectedBairro] = useState<string>("all");
  const [hiddenProximidadesRes, setHiddenProximidadesRes] = useState<Set<string>>(new Set());
  const [hiddenProximidadesTur, setHiddenProximidadesTur] = useState<Set<string>>(new Set());
  const [zonasPage, setZonasPage] = useState<number>(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async (tipoAluguel: "RESIDENCIAL" | "TURISTICO", setData: (data: DashboardData) => void, year: string) => {
      setLoading((prev) => ({ ...prev, [tipoAluguel.toLowerCase()]: true }));
      try {
        const [precoZona, proximidades, precoPorMes, precoMensalZona, totalImoveis, totalAlugados, zonasMaisAlugadas] = await Promise.all([
          fetch(`/api/dashboard?tipo=preco-por-zona&year=${year}&tipoAluguel=${tipoAluguel}&month=${selectedMonth}`).then((res) => res.json()),
          fetch(`/api/dashboard?tipo=proximidades&year=${year}&tipoAluguel=${tipoAluguel}&month=${selectedMonth}`).then((res) => res.json()),
          fetch(`/api/dashboard?tipo=preco-por-mes&year=${year}&tipoAluguel=${tipoAluguel}&month=${selectedMonth}`).then((res) => res.json()),
          fetch(`/api/dashboard?tipo=preco-mensal-zona&year=${year}&tipoAluguel=${tipoAluguel}&provincia=${selectedProvincia}&bairro=${selectedBairro}&month=${selectedMonth}`).then((res) => res.json()),
          fetch(`/api/dashboard?tipo=total-imoveis&year=${year}&tipoAluguel=${tipoAluguel}&month=${selectedMonth}`).then((res) => res.json()),
          fetch(`/api/dashboard?tipo=total-alugados&year=${year}&tipoAluguel=${tipoAluguel}&month=${selectedMonth}`).then((res) => res.json()),
          fetch(`/api/dashboard?tipo=zonas-mais-alugadas&year=${year}&tipoAluguel=${tipoAluguel}&month=${selectedMonth}`).then((res) => res.json()),
        ]);
        setData({
          precoZona,
          proximidades,
          precoPorMes,
          precoMensalZona,
          totalImoveis: totalImoveis.total,
          totalAlugados: totalAlugados.total,
          zonasMaisAlugadas,
        });
      } catch (error) {
        console.error(`Erro ao buscar dados ${tipoAluguel.toLowerCase()}:`, error);
      } finally {
        setLoading((prev) => ({ ...prev, [tipoAluguel.toLowerCase()]: false }));
      }
    };

    fetchData("RESIDENCIAL", setResidencialData, residencialYear);
    fetchData("TURISTICO", setTuristicoData, turisticoYear);
  }, [residencialYear, turisticoYear, selectedMonth, selectedProvincia, selectedBairro]);

  const colors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
    "#C9CBCF", "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
  ];

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" as const } },
  };

  const pieOptions = (data: any[], hiddenSet: Set<string>, setHidden: (set: Set<string>) => void) => ({
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 20,
          padding: 10,
          generateLabels: (chart: any) => {
            const total = data.reduce((sum: number, p: { count: number }) => sum + p.count, 0);
            return data.map((p: { tipo: string; count: number }, index: number) => {
              const value = p.count;
              const percentage = ((value / total) * 100).toFixed(1);
              return {
                text: `${p.tipo}: ${percentage}%`,
                fillStyle: colors[index % colors.length],
                hidden: hiddenSet.has(p.tipo),
                index,
              };
            });
          },
        },
        onClick: (e: any, legendItem: any) => {
          const label = data[legendItem.index].tipo;
          const newSet = new Set(hiddenSet);
          if (newSet.has(label)) newSet.delete(label);
          else newSet.add(label);
          setHidden(newSet);
        },
      },
    },
  });

  const years = Array.from({ length: 10 }, (_, i) => (2025 - i).toString());
  const months = ["all", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const provincias = [
    "all",
    ...Array.from(new Set([...residencialData.precoZona, ...turisticoData.precoZona].map((p) => p.provincia))),
  ];
  const bairros = [
    "all",
    ...Array.from(
      new Set(
        [...residencialData.precoZona, ...turisticoData.precoZona]
          .filter((p) => p.provincia === selectedProvincia || selectedProvincia === "all")
          .map((p) => p.bairro)
      )
    ),
  ];

  const renderDashboard = (data: DashboardData, tipo: "Residencial" | "Turístico", year: string, setYear: (year: string) => void) => {
    const prefix = tipo === "Residencial" ? "res" : "tur";
    const hiddenSet = tipo === "Residencial" ? hiddenProximidadesRes : hiddenProximidadesTur;
    const setHidden = tipo === "Residencial" ? setHiddenProximidadesRes : setHiddenProximidadesTur;

    const filteredPrecoMensalZona = data.precoMensalZona.filter((item) => {
      const matchProvincia = selectedProvincia === "all" || item.provincia === selectedProvincia;
      const matchBairro = selectedBairro === "all" || item.bairro === selectedBairro;
      return matchProvincia && matchBairro;
    });

    if (user?.role !== "ADMIN") return false;

    const paginatedZonas = data.zonasMaisAlugadas.slice(zonasPage * itemsPerPage, (zonasPage + 1) * itemsPerPage);
    const totalPages = Math.ceil(data.zonasMaisAlugadas.length / itemsPerPage);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Button
              onClick={() => setActiveDashboard("Residencial")}
              variant={activeDashboard === "Residencial" ? "default" : "outline"}
            >
              Residencial
            </Button>
            <Button
              onClick={() => setActiveDashboard("Turístico")}
              variant={activeDashboard === "Turístico" ? "default" : "outline"}
            >
              Turístico
            </Button>
          </div>
          <div className="flex space-x-4">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o ano" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o mês" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month === "all" ? "Todos" : month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-4">
          {/* Total de Imóveis Cadastrados - 25% width, smaller height */}
          <Card className="col-span-1 h-[120px]">
            <CardHeader className="px-4 pt-4 pb-2">
              <CardTitle className="text-sm">Total de Imóveis Cadastrados</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pt-0">
              {loading[tipo.toLowerCase() as "residencial" | "turistico"] ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                <p className="text-xl font-bold">{data.totalImoveis}</p>
              )}
            </CardContent>
          </Card>

          {/* Total de Alugados (Em Aluguel) - 25% width, smaller height */}
          <Card className="col-span-1 h-[120px]">
            <CardHeader className="px-4 pt-4 pb-2">
              <CardTitle className="text-sm">Total de Alugados (Em Aluguel)</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pt-0">
              {loading[tipo.toLowerCase() as "residencial" | "turistico"] ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                <p className="text-xl font-bold">{data.totalAlugados}</p>
              )}
            </CardContent>
          </Card>

          {/* Preço Médio por Zona - 50% width */}
          <Card className={`col-span-2 ${expandedChart === `${prefix}-precoZona` ? "col-span-4" : ""}`}>
            <CardHeader className="flex flex-row justify-between items-center px-4 pt-4">
              <CardTitle className="text-lg">Preço Médio por Zona</CardTitle>
              <Button onClick={() => setExpandedChart(expandedChart === `${prefix}-precoZona` ? null : `${prefix}-precoZona`)}>
                {expandedChart === `${prefix}-precoZona` ? <Minimize2 className="w-5 h-5 text-blue-500" /> : <Maximize2 className="w-5 h-5 text-blue-500" />}
              </Button>
            </CardHeader>
            <CardContent className="h-[400px]">
              {loading[tipo.toLowerCase() as "residencial" | "turistico"] ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  <Skeleton className="w-full h-[300px] mt-4" />
                </div>
              ) : data.precoZona.length > 0 ? (
                <Bar
                  data={{
                    labels: data.precoZona.map((p) => p.zona),
                    datasets: [{ label: `Preço Médio (${tipo === "Residencial" ? "Mensal" : "Diário"})`, data: data.precoZona.map((p) => p.precoMedio), backgroundColor: colors.slice(0, data.precoZona.length) }],
                  }}
                  options={chartOptions}
                />
              ) : (
                <p>Sem dados</p>
              )}
            </CardContent>
          </Card>

          {/* Proximidades Mais Procuradas - 50% width */}
          <Card className={`col-span-2 ${expandedChart === `${prefix}-proximidades` ? "col-span-4" : ""}`}>
            <CardHeader className="flex flex-row justify-between items-center px-4 pt-4">
              <CardTitle className="text-lg">Proximidades Mais Procuradas</CardTitle>
              <Button onClick={() => setExpandedChart(expandedChart === `${prefix}-proximidades` ? null : `${prefix}-proximidades`)}>
                {expandedChart === `${prefix}-proximidades` ? <Minimize2 className="w-5 h-5 text-blue-500" /> : <Maximize2 className="w-5 h-5 text-blue-500" />}
              </Button>
            </CardHeader>
            <CardContent className="h-[400px]">
              {loading[tipo.toLowerCase() as "residencial" | "turistico"] ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  <Skeleton className="w-full h-[300px] mt-4" />
                </div>
              ) : data.proximidades.length > 0 ? (
                <Pie
                  data={{
                    labels: data.proximidades.map((p) => p.tipo),
                    datasets: [{ data: data.proximidades.map((p) => (hiddenSet.has(p.tipo) ? 0 : p.count)), backgroundColor: colors.slice(0, data.proximidades.length) }],
                  }}
                  options={pieOptions(data.proximidades, hiddenSet, setHidden)}
                />
              ) : (
                <p>Sem dados</p>
              )}
            </CardContent>
          </Card>

          {/* Variação de Preço por Mês - 50% width */}
          <Card className={`col-span-2 ${expandedChart === `${prefix}-precoPorMes` ? "col-span-4" : ""}`}>
            <CardHeader className="flex flex-row justify-between items-center px-4 pt-4">
              <CardTitle className="text-lg">Variação de Preço por Mês</CardTitle>
              <Button onClick={() => setExpandedChart(expandedChart === `${prefix}-precoPorMes` ? null : `${prefix}-precoPorMes`)}>
                {expandedChart === `${prefix}-precoPorMes` ? <Minimize2 className="w-5 h-5 text-blue-500" /> : <Maximize2 className="w-5 h-5 text-blue-500" />}
              </Button>
            </CardHeader>
            <CardContent className="h-[400px]">
              {loading[tipo.toLowerCase() as "residencial" | "turistico"] ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  <Skeleton className="w-full h-[300px] mt-4" />
                </div>
              ) : data.precoPorMes.length > 0 ? (
                <Bar
                  data={{
                    labels: data.precoPorMes.map((p) => p.mes),
                    datasets: [{ label: `Preço Médio por Mês (${tipo === "Residencial" ? "Mensal" : "Diário"})`, data: data.precoPorMes.map((p) => p.precoMedio), backgroundColor: colors.slice(0, data.precoPorMes.length) }],
                  }}
                  options={chartOptions}
                />
              ) : (
                <p>Sem dados</p>
              )}
            </CardContent>
          </Card>

          {/* Zonas com Mais Imóveis Alugados (Pendente e Em Aluguel) - 100% width */}
          <Card className="col-span-4">
            <CardHeader className="px-4 pt-4">
              <CardTitle>Zonas com Mais Imóveis Alugados (Pendente e Em Aluguel)</CardTitle>
            </CardHeader>
            <CardContent>
              {loading[tipo.toLowerCase() as "residencial" | "turistico"] ? (
                <Skeleton className="h-[300px] w-full" />
              ) : data.zonasMaisAlugadas.length > 0 ? (
                <div>
                  <table className="w-full text-left">
                    <thead>
                      <tr>
                        <th className="p-2">Província</th>
                        <th className="p-2">Bairro</th>
                        <th className="p-2">Quantidade</th>
                        <th className="p-2">Mês</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedZonas.map((zona, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-2">{zona.provincia}</td>
                          <td className="p-2">{zona.bairro}</td>
                          <td className="p-2">{zona.count}</td>
                          <td className="p-2">{zona.mes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between mt-4">
                    <Button
                      onClick={() => setZonasPage((prev) => Math.max(prev - 1, 0))}
                      disabled={zonasPage === 0}
                    >
                      <ChevronLeft />
                    </Button>
                    <span>Página {zonasPage + 1} de {totalPages}</span>
                    <Button
                      onClick={() => setZonasPage((prev) => Math.min(prev + 1, totalPages - 1))}
                      disabled={zonasPage === totalPages - 1}
                    >
                      <ChevronRight />
                    </Button>
                  </div>
                </div>
              ) : (
                <p>Sem dados</p>
              )}
            </CardContent>
          </Card>

          {/* Preço Mensal por Zona - 100% width */}
          <Card className="col-span-4">
            <CardHeader className="flex flex-row justify-between items-center px-4 pt-4">
              <CardTitle className="text-lg">Preço Mensal por Zona</CardTitle>
              <Button onClick={() => setExpandedChart(expandedChart === `${prefix}-precoMensalZona` ? null : `${prefix}-precoMensalZona`)}>
                {expandedChart === `${prefix}-precoMensalZona` ? <Minimize2 className="w-5 h-5 text-blue-500" /> : <Maximize2 className="w-5 h-5 text-blue-500" />}
              </Button>
            </CardHeader>
            <div className="px-6 pb-4 flex space-x-4">
              <Select value={selectedProvincia} onValueChange={setSelectedProvincia}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Província" />
                </SelectTrigger>
                <SelectContent>
                  {provincias.map((provincia) => (
                    <SelectItem key={provincia} value={provincia}>
                      {provincia === "all" ? "Todas" : provincia}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedBairro} onValueChange={setSelectedBairro}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Bairro" />
                </SelectTrigger>
                <SelectContent>
                  {bairros.map((bairro) => (
                    <SelectItem key={bairro} value={bairro}>
                      {bairro === "all" ? "Todos" : bairro}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <CardContent className="h-[400px]">
              {loading[tipo.toLowerCase() as "residencial" | "turistico"] ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  <Skeleton className="w-full h-[300px] mt-4" />
                </div>
              ) : filteredPrecoMensalZona.length > 0 ? (
                <Bar
                  data={{
                    labels: filteredPrecoMensalZona.map((item) => item.mes),
                    datasets: [
                      {
                        label: `Preço ${tipo === "Residencial" ? "Mensal" : "Diário"} (${
                          selectedBairro !== "all" ? selectedBairro : selectedProvincia !== "all" ? selectedProvincia : "Todas as Zonas"
                        })`,
                        data: filteredPrecoMensalZona.map((item) => item.preco),
                        backgroundColor: colors.slice(0, filteredPrecoMensalZona.length),
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              ) : (
                <p>Sem dados para a seleção atual</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 p-6">
      {activeDashboard === "Residencial" && renderDashboard(residencialData, "Residencial", residencialYear, setResidencialYear)}
      {activeDashboard === "Turístico" && renderDashboard(turisticoData, "Turístico", turisticoYear, setTuristicoYear)}
    </div>
  );
}