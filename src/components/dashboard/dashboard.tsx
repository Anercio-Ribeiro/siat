



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

// ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// type DashboardData = {
//   precoZona: any[];
//   proximidades: any[];
//   precoPorMes: any[];
//   precoMensalZona: any[];
// };

// export default function EstatisticasDashboard() {
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
//   const [expandedChart, setExpandedChart] = useState<string | null>(null);
//   const [residencialYear, setResidencialYear] = useState<string>("2025");
//   const [turisticoYear, setTuristicoYear] = useState<string>("2025");
//   const [selectedProvincia, setSelectedProvincia] = useState<string>("all");
//   const [selectedBairro, setSelectedBairro] = useState<string>("all");
//   const [hiddenProximidadesRes, setHiddenProximidadesRes] = useState<Set<string>>(new Set());
//   const [hiddenProximidadesTur, setHiddenProximidadesTur] = useState<Set<string>>(new Set());

//   useEffect(() => {
//     const fetchResidencialData = async () => {
//       setLoading((prev) => ({ ...prev, residencial: true }));
//       try {
//         const [precoZonaRes, proxRes, precoMesRes, precoMensalZonaRes] = await Promise.all([
//           fetch(`/api/dashboard?tipo=preco-por-zona&year=${residencialYear}&tipoAluguel=RESIDENCIAL`).then((res) => res.json()),
//           fetch(`/api/dashboard?tipo=proximidades&year=${residencialYear}&tipoAluguel=RESIDENCIAL`).then((res) => res.json()),
//           fetch(`/api/dashboard?tipo=preco-por-mes&year=${residencialYear}&tipoAluguel=RESIDENCIAL`).then((res) => res.json()),
//           fetch(`/api/dashboard?tipo=preco-mensal-zona&year=${residencialYear}&tipoAluguel=RESIDENCIAL&provincia=${selectedProvincia}&bairro=${selectedBairro}`).then((res) => res.json()),
//         ]);
//         setResidencialData({
//           precoZona: precoZonaRes,
//           proximidades: proxRes,
//           precoPorMes: precoMesRes,
//           precoMensalZona: precoMensalZonaRes,
//         });
//       } catch (error) {
//         console.error("Erro ao buscar dados residenciais:", error);
//       } finally {
//         setLoading((prev) => ({ ...prev, residencial: false }));
//       }
//     };

//     const fetchTuristicoData = async () => {
//       setLoading((prev) => ({ ...prev, turistico: true }));
//       try {
//         const [precoZonaRes, proxRes, precoMesRes, precoMensalZonaRes] = await Promise.all([
//           fetch(`/api/dashboard?tipo=preco-por-zona&year=${turisticoYear}&tipoAluguel=TURISTICO`).then((res) => res.json()),
//           fetch(`/api/dashboard?tipo=proximidades&year=${turisticoYear}&tipoAluguel=TURISTICO`).then((res) => res.json()),
//           fetch(`/api/dashboard?tipo=preco-por-mes&year=${turisticoYear}&tipoAluguel=TURISTICO`).then((res) => res.json()),
//           fetch(`/api/dashboard?tipo=preco-mensal-zona&year=${turisticoYear}&tipoAluguel=TURISTICO&provincia=${selectedProvincia}&bairro=${selectedBairro}`).then((res) => res.json()),
//         ]);
//         setTuristicoData({
//           precoZona: precoZonaRes,
//           proximidades: proxRes,
//           precoPorMes: precoMesRes,
//           precoMensalZona: precoMensalZonaRes,
//         });
//       } catch (error) {
//         console.error("Erro ao buscar dados turísticos:", error);
//       } finally {
//         setLoading((prev) => ({ ...prev, turistico: false }));
//       }
//     };

//     fetchResidencialData();
//     fetchTuristicoData();
//   }, [residencialYear, turisticoYear, selectedProvincia, selectedBairro]);

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
//               {loading[tipo.toLowerCase() as "residencial" | "turistico"] ? (
//                 <div className="flex flex-col items-center justify-center h-full">
//                   <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
//                   <Skeleton className="w-full h-[300px] mt-4" />
//                 </div>
//               ) : filteredPrecoMensalZona.length > 0 ? (
//                 <Bar
//                   data={{
//                     labels: filteredPrecoMensalZona.map((item) => item.mes), // Apenas meses no eixo X
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
import { Loader2, Maximize2, Minimize2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

type DashboardData = {
  precoZona: any[];
  proximidades: any[];
  precoPorMes: any[];
  precoMensalZona: any[];
};

export default function EstatisticasDashboard() {
  const [residencialData, setResidencialData] = useState<DashboardData>({
    precoZona: [],
    proximidades: [],
    precoPorMes: [],
    precoMensalZona: [],
  });
  const [turisticoData, setTuristicoData] = useState<DashboardData>({
    precoZona: [],
    proximidades: [],
    precoPorMes: [],
    precoMensalZona: [],
  });
  const [loading, setLoading] = useState({ residencial: true, turistico: true });
  const [loadingPrecoMensalZona, setLoadingPrecoMensalZona] = useState({ residencial: true, turistico: true });
  const [expandedChart, setExpandedChart] = useState<string | null>(null);
  const [residencialYear, setResidencialYear] = useState<string>("2025");
  const [turisticoYear, setTuristicoYear] = useState<string>("2025");
  const [selectedProvincia, setSelectedProvincia] = useState<string>("all");
  const [selectedBairro, setSelectedBairro] = useState<string>("all");
  const [hiddenProximidadesRes, setHiddenProximidadesRes] = useState<Set<string>>(new Set());
  const [hiddenProximidadesTur, setHiddenProximidadesTur] = useState<Set<string>>(new Set());

  // Fetch para os dados gerais (exceto Preço Mensal por Zona)
  useEffect(() => {
    const fetchResidencialData = async () => {
      setLoading((prev) => ({ ...prev, residencial: true }));
      try {
        const [precoZonaRes, proxRes, precoMesRes] = await Promise.all([
          fetch(`/api/dashboard?tipo=preco-por-zona&year=${residencialYear}&tipoAluguel=RESIDENCIAL`).then((res) => res.json()),
          fetch(`/api/dashboard?tipo=proximidades&year=${residencialYear}&tipoAluguel=RESIDENCIAL`).then((res) => res.json()),
          fetch(`/api/dashboard?tipo=preco-por-mes&year=${residencialYear}&tipoAluguel=RESIDENCIAL`).then((res) => res.json()),
        ]);
        setResidencialData((prev) => ({
          ...prev,
          precoZona: precoZonaRes,
          proximidades: proxRes,
          precoPorMes: precoMesRes,
        }));
      } catch (error) {
        console.error("Erro ao buscar dados residenciais:", error);
      } finally {
        setLoading((prev) => ({ ...prev, residencial: false }));
      }
    };

    const fetchTuristicoData = async () => {
      setLoading((prev) => ({ ...prev, turistico: true }));
      try {
        const [precoZonaRes, proxRes, precoMesRes] = await Promise.all([
          fetch(`/api/dashboard?tipo=preco-por-zona&year=${turisticoYear}&tipoAluguel=TURISTICO`).then((res) => res.json()),
          fetch(`/api/dashboard?tipo=proximidades&year=${turisticoYear}&tipoAluguel=TURISTICO`).then((res) => res.json()),
          fetch(`/api/dashboard?tipo=preco-por-mes&year=${turisticoYear}&tipoAluguel=TURISTICO`).then((res) => res.json()),
        ]);
        setTuristicoData((prev) => ({
          ...prev,
          precoZona: precoZonaRes,
          proximidades: proxRes,
          precoPorMes: precoMesRes,
        }));
      } catch (error) {
        console.error("Erro ao buscar dados turísticos:", error);
      } finally {
        setLoading((prev) => ({ ...prev, turistico: false }));
      }
    };

    fetchResidencialData();
    fetchTuristicoData();
  }, [residencialYear, turisticoYear]); // Apenas depende do ano

  // Fetch específico para Preço Mensal por Zona
  useEffect(() => {
    const fetchPrecoMensalZonaResidencial = async () => {
      setLoadingPrecoMensalZona((prev) => ({ ...prev, residencial: true }));
      try {
        const precoMensalZonaRes = await fetch(
          `/api/dashboard?tipo=preco-mensal-zona&year=${residencialYear}&tipoAluguel=RESIDENCIAL&provincia=${selectedProvincia}&bairro=${selectedBairro}`
        ).then((res) => res.json());
        setResidencialData((prev) => ({
          ...prev,
          precoMensalZona: precoMensalZonaRes,
        }));
      } catch (error) {
        console.error("Erro ao buscar preço mensal por zona residencial:", error);
      } finally {
        setLoadingPrecoMensalZona((prev) => ({ ...prev, residencial: false }));
      }
    };

    const fetchPrecoMensalZonaTuristico = async () => {
      setLoadingPrecoMensalZona((prev) => ({ ...prev, turistico: true }));
      try {
        const precoMensalZonaRes = await fetch(
          `/api/dashboard?tipo=preco-mensal-zona&year=${turisticoYear}&tipoAluguel=TURISTICO&provincia=${selectedProvincia}&bairro=${selectedBairro}`
        ).then((res) => res.json());
        setTuristicoData((prev) => ({
          ...prev,
          precoMensalZona: precoMensalZonaRes,
        }));
      } catch (error) {
        console.error("Erro ao buscar preço mensal por zona turístico:", error);
      } finally {
        setLoadingPrecoMensalZona((prev) => ({ ...prev, turistico: false }));
      }
    };

    fetchPrecoMensalZonaResidencial();
    fetchPrecoMensalZonaTuristico();
  }, [residencialYear, turisticoYear, selectedProvincia, selectedBairro]); // Depende do ano e dos filtros

  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#C9CBCF",
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
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
            const total = data.reduce((sum, p) => sum + p.count, 0);
            return data.map((p, index) => {
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
          if (newSet.has(label)) {
            newSet.delete(label);
          } else {
            newSet.add(label);
          }
          setHidden(newSet);
        },
      },
    },
  });

  const years = Array.from({ length: 10 }, (_, i) => (2025 - i).toString());
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

  const renderDashboard = (
    data: DashboardData,
    tipo: "Residencial" | "Turístico",
    year: string,
    setYear: (year: string) => void
  ) => {
    const prefix = tipo === "Residencial" ? "res" : "tur";
    const hiddenSet = tipo === "Residencial" ? hiddenProximidadesRes : hiddenProximidadesTur;
    const setHidden = tipo === "Residencial" ? setHiddenProximidadesRes : setHiddenProximidadesTur;

    // Filtra os dados de precoMensalZona com base na província e/ou bairro selecionados
    const filteredPrecoMensalZona = data.precoMensalZona.filter((item) => {
      const matchProvincia = selectedProvincia === "all" || item.provincia === selectedProvincia;
      const matchBairro = selectedBairro === "all" || item.bairro === selectedBairro;
      return matchProvincia && matchBairro;
    });

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{tipo}</h2>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o ano" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Preço Médio por Zona */}
          <Card className={`w-full ${expandedChart === `${prefix}-precoZona` ? "lg:col-span-3" : ""}`}>
            <CardHeader className="flex flex-row justify-between items-center px-4 pt-4">
              <CardTitle className="text-lg">Preço Médio por Zona</CardTitle>
              <Button
                onClick={() => setExpandedChart(expandedChart === `${prefix}-precoZona` ? null : `${prefix}-precoZona`)}
              >
                {expandedChart === `${prefix}-precoZona` ? (
                  <Minimize2 className="w-5 h-5 text-blue-500" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-blue-500" />
                )}
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
                    datasets: [
                      {
                        label: `Preço Médio (${tipo === "Residencial" ? "Mensal" : "Diário"})`,
                        data: data.precoZona.map((p) => p.precoMedio),
                        backgroundColor: colors.slice(0, data.precoZona.length),
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              ) : (
                <p>Sem dados</p>
              )}
            </CardContent>
          </Card>

          {/* Proximidades Mais Procuradas */}
          <Card className={`w-full ${expandedChart === `${prefix}-proximidades` ? "lg:col-span-3" : ""}`}>
            <CardHeader className="flex flex-row justify-between items-center px-4 pt-4">
              <CardTitle className="text-lg">Proximidades Mais Procuradas</CardTitle>
              <Button
                onClick={() =>
                  setExpandedChart(expandedChart === `${prefix}-proximidades` ? null : `${prefix}-proximidades`)
                }
              >
                {expandedChart === `${prefix}-proximidades` ? (
                  <Minimize2 className="w-5 h-5 text-blue-500" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-blue-500" />
                )}
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
                    datasets: [
                      {
                        data: data.proximidades.map((p) => (hiddenSet.has(p.tipo) ? 0 : p.count)),
                        backgroundColor: colors.slice(0, data.proximidades.length),
                      },
                    ],
                  }}
                  options={pieOptions(data.proximidades, hiddenSet, setHidden)}
                />
              ) : (
                <p>Sem dados</p>
              )}
            </CardContent>
          </Card>

          {/* Variação de Preço por Mês */}
          <Card className={`w-full ${expandedChart === `${prefix}-precoPorMes` ? "lg:col-span-3" : ""}`}>
            <CardHeader className="flex flex-row justify-between items-center px-4 pt-4">
              <CardTitle className="text-lg">Variação de Preço por Mês</CardTitle>
              <Button
                onClick={() => setExpandedChart(expandedChart === `${prefix}-precoPorMes` ? null : `${prefix}-precoPorMes`)}
              >
                {expandedChart === `${prefix}-precoPorMes` ? (
                  <Minimize2 className="w-5 h-5 text-blue-500" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-blue-500" />
                )}
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
                    datasets: [
                      {
                        label: `Preço Médio por Mês (${tipo === "Residencial" ? "Mensal" : "Diário"})`,
                        data: data.precoPorMes.map((p) => p.precoMedio),
                        backgroundColor: colors.slice(0, data.precoPorMes.length),
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              ) : (
                <p>Sem dados</p>
              )}
            </CardContent>
          </Card>

          {/* Preço Mensal por Zona - Sempre em tela cheia */}
          <Card className="w-full lg:col-span-3">
            <CardHeader className="flex flex-row justify-between items-center px-4 pt-4">
              <CardTitle className="text-lg">Preço Mensal por Zona</CardTitle>
              <Button
                onClick={() =>
                  setExpandedChart(expandedChart === `${prefix}-precoMensalZona` ? null : `${prefix}-precoMensalZona`)
                }
              >
                {expandedChart === `${prefix}-precoMensalZona` ? (
                  <Minimize2 className="w-5 h-5 text-blue-500" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-blue-500" />
                )}
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
              {loadingPrecoMensalZona[tipo.toLowerCase() as "residencial" | "turistico"] ? (
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
    <div className="space-y-12">
      {renderDashboard(residencialData, "Residencial", residencialYear, setResidencialYear)}
      {renderDashboard(turisticoData, "Turístico", turisticoYear, setTuristicoYear)}
    </div>
  );
}