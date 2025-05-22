

// "use client";
// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Bar, Line, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { useUser } from "@/hooks/getUser";
// import { cn } from "@/lib/utils";
// import { ArrowUp, ArrowDown } from "lucide-react";

// ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

// const formatCurrency = (value: number | undefined | null) => {
//   if (value === undefined || value === null) return "AOA 0";
//   return `${value.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}`;
// };

// type TipoAluguel = "RESIDENCIAL" | "TURISTICO";

// export const DashboardInquilinoProprietarioFlipBox: React.FC = () => {
//   const { user } = useUser();
//   const [tipoAluguel, setTipoAluguel] = useState<TipoAluguel>(
//     user?.role === "PROPRIETARIO" ? "RESIDENCIAL" : "RESIDENCIAL"
//   );
//   const [isFlipping, setIsFlipping] = useState(false);
//   const [showLoading, setShowLoading] = useState(true);

//   const toggleTipoAluguel = () => {
//     setIsFlipping(true);
//     setShowLoading(true);
//     setTimeout(() => {
//       setTipoAluguel(prev => (prev === "RESIDENCIAL" ? "TURISTICO" : "RESIDENCIAL"));
//       setIsFlipping(false);
//       setTimeout(() => setShowLoading(false), 3000);
//     }, 600);
//   };

//   const { data, isLoading } = useQuery({
//     queryKey: [`dashboard-${user?.role?.toLowerCase()}-${tipoAluguel}`, user?.id],
//     queryFn: async () => {
//       const response = await fetch(`/api/dashboard/${user?.role?.toLowerCase()}?tipoAluguel=${tipoAluguel}`);
//       if (!response.ok) throw new Error("Erro ao carregar dados");
//       return response.json();
//     },
//     enabled: !!user && (user.role === "PROPRIETARIO" || user.role === "INQUILINO"),
//   });

//   useEffect(() => {
//     setShowLoading(true);
//     const timer = setTimeout(() => setShowLoading(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (!user) return <div>Carregando usuário...</div>;
//   if (user.role !== "PROPRIETARIO" && user.role !== "INQUILINO") return false;

//   if (isLoading || showLoading || !data) {
//     return (
//       <div className="p-6 space-y-6">
//         <Skeleton className="h-8 w-1/4" />
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {Array.from({ length: user.role === "PROPRIETARIO" ? 7 : 8 }).map((_, i) => (
//             <Skeleton key={i} className="h-32 w-full" />
//           ))}
//         </div>
//         <Skeleton className="h-64 w-full max-w-2xl mx-auto" />
//       </div>
//     );
//   }

//   const isProprietario = user.role === "PROPRIETARIO";

//   // Dados para Proprietário
//   const barChartDataProprietario = {
//     labels: ["Taxa de Ocupação", "Comparação com Média"],
//     datasets: [
//       {
//         label: "Percentual (%)",
//         data: [data.taxaOcupacao ?? 0, data.comparacaoMedia ?? 0],
//         backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
//         borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const lineChartDataProprietario = {
//     labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
//     datasets: [
//       {
//         label: "Receita Mensal (AOA)",
//         data: data.receitaMensal && data.receitaMensal.length >= 12
//           ? data.receitaMensal.slice(0, 12)
//           : [...(data.receitaMensal || []), ...Array(12 - (data.receitaMensal?.length || 0)).fill(0)],
//         fill: false,
//         borderColor: "rgba(75, 192, 192, 1)",
//         tension: 0.1,
//       },
//     ],
//   };

//   // Dados para Inquilino
//   const pieChartDataInquilino = {
//     labels: ["Imóveis Disponíveis", "Taxa de Ocupação"],
//     datasets: [
//       {
//         data: [data.totalImoveis ?? 0, data.taxaMediaOcupacao ?? 0],
//         backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"],
//         borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const barChartDataInquilino = {
//     labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
//     datasets: [
//       {
//         label: "Gastos Mensais (AOA)",
//         data: data.gastosMensais || [0, 0, 0, 0, 0, 0],
//         backgroundColor: "rgba(54, 162, 235, 0.6)",
//         borderColor: "rgba(54, 162, 235, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" as const },
//       title: { display: true, text: isProprietario ? "Desempenho dos Seus Imóveis" : "Visão Geral da Plataforma" },
//     },
//   };

//   const lineBarChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" as const },
//       title: { display: true, text: isProprietario ? "Receita ao Longo do Tempo" : "Gastos por Mês" },
//     },
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">
//           Dashboard do {isProprietario ? "Proprietário" : "Inquilino"} - {tipoAluguel}
//         </h1>
//         <Button onClick={toggleTipoAluguel} className="relative">
//           Alternar para {tipoAluguel === "RESIDENCIAL" ? "Turístico" : "Residencial"}
//         </Button>
//       </div>

//       <div className="flip-container">
//         <div className={cn("flip-inner", { "flip": isFlipping })}>
//           {isProprietario ? (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Taxa de Ocupação</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className="text-2xl font-semibold flex items-center">
//                       <span className={data.taxaOcupacao > 0 ? "text-green-600" : "text-red-600"}>
//                         {data.taxaOcupacao ?? 0}%
//                       </span>
//                       {data.taxaOcupacao > 0 && <ArrowUp className="ml-2 h-5 w-5 text-green-600" />}
//                       {data.taxaOcupacao < 0 && <ArrowDown className="ml-2 h-5 w-5 text-red-600" />}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Este mês</p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Receita Total</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className={`text-2xl font-semibold ${data.receitaTotal > 0 ? "text-green-600" : "text-red-600"}`}>
//                       {formatCurrency(data.receitaTotal)}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Últimos 30 dias</p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Aluguéis Concluídos</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className={`text-2xl font-semibold ${data.alugueisConcluidos > 0 ? "text-green-600" : "text-red-600"}`}>
//                       {data.alugueisConcluidos ?? 0}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Este mês</p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Tempo Médio de Reserva</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className={`text-2xl font-semibold ${data.tempoMedioReserva > 0 ? "text-green-600" : "text-red-600"}`}>
//                       {data.tempoMedioReserva ?? 0} dias
//                     </p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Imóvel Mais Popular</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className={`text-2xl font-semibold ${data.imovelMaisPopular ? "" : "text-red-600"}`}>
//                       {data.imovelMaisPopular ? `${data.imovelMaisPopular.titulo}` : "Nenhum"}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       {data.imovelMaisPopular ? (
//                         <span className="text-green-600">{`${data.imovelMaisPopular.reservas ?? 0} reservas`}</span>
//                       ) : ""}
//                     </p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Comparação com Média</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className="text-2xl font-semibold flex items-center">
//                       <span className={data.comparacaoMedia > 0 ? "text-green-600" : data.comparacaoMedia < 0 ? "text-red-600" : ""}>
//                         {data.comparacaoMedia ?? 0}%
//                       </span>
//                       {data.comparacaoMedia > 0 && <ArrowUp className="ml-2 h-5 w-5 text-green-600" />}
//                       {data.comparacaoMedia < 0 && <ArrowDown className="ml-2 h-5 w-5 text-red-600" />}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Acima/Abaixo da média</p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Pendências</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className="text-2xl font-semibold text-red-600">{data.pendencias ?? 0}</p>
//                     <p className="text-sm text-muted-foreground">Solicitações pendentes</p>
//                   </CardContent>
//                 </Card>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//                 <Card className="w-full h-[400px]">
//                   <CardHeader className="p-4">
//                     <CardTitle>Desempenho</CardTitle>
//                   </CardHeader>
//                   <CardContent className="h-[300px] p-4">
//                     <Bar data={barChartDataProprietario} options={chartOptions} />
//                   </CardContent>
//                 </Card>
//                 <Card className="w-full h-[400px]">
//                   <CardHeader className="p-4">
//                     <CardTitle>Receita ao Longo do Tempo</CardTitle>
//                   </CardHeader>
//                   <CardContent className="h-[300px] p-4">
//                     <Line data={lineChartDataProprietario} options={lineBarChartOptions} />
//                   </CardContent>
//                 </Card>
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Imóveis Disponíveis</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className={`text-2xl font-semibold ${data.totalImoveis > 0 ? "text-green-600" : "text-red-600"}`}>
//                       {data.totalImoveis ?? 0}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Na plataforma</p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Taxa Média de Ocupação</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className="text-2xl font-semibold flex items-center">
//                       <span className={data.taxaMediaOcupacao > 0 ? "text-green-600" : "text-red-600"}>
//                         {data.taxaMediaOcupacao ?? 0}%
//                       </span>
//                       {data.taxaMediaOcupacao > 0 && <ArrowUp className="ml-2 h-5 w-5 text-green-600" />}
//                       {data.taxaMediaOcupacao < 0 && <ArrowDown className="ml-2 h-5 w-5 text-red-600" />}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Este mês</p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Preço Médio</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className={`text-2xl font-semibold ${data.precoMedio > 0 ? "text-green-600" : "text-red-600"}`}>
//                       {formatCurrency(data.precoMedio)}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Por noite/mês</p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Crescimento da Plataforma</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className={`text-2xl font-semibold ${data.crescimentoPlataforma > 0 ? "text-green-600" : "text-red-600"}`}>
//                       {data.crescimentoPlataforma ?? 0}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Novos imóveis em 30 dias</p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Atividade Recente</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className={`text-2xl font-semibold ${data.atividadeRecente > 0 ? "text-green-600" : "text-red-600"}`}>
//                       {data.atividadeRecente ?? 0}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Aluguéis na última semana</p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Seus Aluguéis</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className={`text-2xl font-semibold ${data.numeroAlugueis > 0 ? "text-green-600" : "text-red-600"}`}>
//                       {data.numeroAlugueis ?? 0}
//                     </p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Gasto Total</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className={`text-2xl font-semibold ${data.gastoTotal > 0 ? "text-green-600" : "text-red-600"}`}>
//                       {formatCurrency(data.gastoTotal)}
//                     </p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Duração Média</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className={`text-2xl font-semibold ${data.duracaoMedia > 0 ? "text-green-600" : "text-red-600"}`}>
//                       {(data.duracaoMedia ?? 0).toFixed(1)} dias
//                     </p>
//                   </CardContent>
//                 </Card>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//                 <Card className="w-full h-[400px]">
//                   <CardHeader className="p-4">
//                     <CardTitle>Visão Geral</CardTitle>
//                   </CardHeader>
//                   <CardContent className="h-[300px] p-4">
//                     <Pie data={pieChartDataInquilino} options={chartOptions} />
//                   </CardContent>
//                 </Card>
//                 <Card className="w-full h-[400px]">
//                   <CardHeader className="p-4">
//                     <CardTitle>Gastos por Mês</CardTitle>
//                   </CardHeader>
//                   <CardContent className="h-[300px] p-4">
//                     <Bar data={barChartDataInquilino} options={lineBarChartOptions} />
//                   </CardContent>
//                 </Card>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };









// "use client";
// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Bar, Line, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { useUser } from "@/hooks/getUser";
// import { cn } from "@/lib/utils";
// import { ArrowUp, ArrowDown } from "lucide-react";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const formatCurrency = (value: number | undefined | null) => {
//   if (value === undefined || value === null) return "AOA 0";
//   return `${value.toLocaleString("pt-AO", {
//     style: "currency",
//     currency: "AOA",
//   })}`;
// };

// type TipoAluguel = "RESIDENCIAL" | "TURISTICO";

// const generateTrendData = (
//   currentValue: number | undefined,
//   months: number = 6
// ): number[] => {
//   if (currentValue === undefined || currentValue === null) return Array(months).fill(0);
//   const trend = [];
//   const isPositive = currentValue > 0;
//   const base = isPositive ? currentValue * 0.8 : currentValue * 1.2;
//   for (let i = 0; i < months; i++) {
//     const variation = (Math.random() - 0.5) * base * 0.2;
//     trend.push(base + variation);
//   }
//   trend[months - 1] = currentValue; // Último valor é o atual
//   return trend;
// };

// const MiniTrendChart: React.FC<{
//   data: number[];
//   label: string;
//   isPositive: boolean;
// }> = ({ data, label, isPositive }) => {
//   const chartData = {
//     labels: ["-6m", "-5m", "-4m", "-3m", "-2m", "-1m"],
//     datasets: [
//       {
//         label,
//         data,
//         fill: false,
//         borderColor: isPositive ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)",
//         tension: 0.1,
//         pointRadius: 0,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       tooltip: { enabled: false },
//     },
//     scales: {
//       x: { display: false },
//       y: { display: false },
//     },
//   };

//   return (
//     <div className="h-10 w-full">
//       <Line data={chartData} options={options} />
//     </div>
//   );
// };

// export const DashboardInquilinoProprietarioFlipBox: React.FC = () => {
//   const { user } = useUser();
//   const [tipoAluguel, setTipoAluguel] = useState<TipoAluguel>(
//     user?.role === "PROPRIETARIO" ? "RESIDENCIAL" : "RESIDENCIAL"
//   );
//   const [isFlipping, setIsFlipping] = useState(false);
//   const [showLoading, setShowLoading] = useState(true);

//   const toggleTipoAluguel = () => {
//     setIsFlipping(true);
//     setShowLoading(true);
//     setTimeout(() => {
//       setTipoAluguel((prev) =>
//         prev === "RESIDENCIAL" ? "TURISTICO" : "RESIDENCIAL"
//       );
//       setIsFlipping(false);
//       setTimeout(() => setShowLoading(false), 3000);
//     }, 600);
//   };

//   const { data, isLoading } = useQuery({
//     queryKey: [`dashboard-${user?.role?.toLowerCase()}-${tipoAluguel}`, user?.id],
//     queryFn: async () => {
//       const response = await fetch(
//         `/api/dashboard/${user?.role?.toLowerCase()}?tipoAluguel=${tipoAluguel}`
//       );
//       if (!response.ok) throw new Error("Erro ao carregar dados");
//       return response.json();
//     },
//     enabled: !!user && (user.role === "PROPRIETARIO" || user.role === "INQUILINO"),
//   });

//   useEffect(() => {
//     setShowLoading(true);
//     const timer = setTimeout(() => setShowLoading(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (!user) return <div>Carregando usuário...</div>;
//   if (user.role !== "PROPRIETARIO" && user.role !== "INQUILINO") return false;

//   if (isLoading || showLoading || !data) {
//     return (
//       <div className="p-6 space-y-6">
//         <Skeleton className="h-8 w-1/4" />
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {Array.from({ length: user.role === "PROPRIETARIO" ? 7 : 8 }).map(
//             (_, i) => (
//               <Skeleton key={i} className="h-32 w-full" />
//             )
//           )}
//         </div>
//         <Skeleton className="h-64 w-full max-w-2xl mx-auto" />
//       </div>
//     );
//   }

//   const isProprietario = user.role === "PROPRIETARIO";

//   // Dados para Proprietário
//   const barChartDataProprietario = {
//     labels: ["Taxa de Ocupação", "Comparação com Média"],
//     datasets: [
//       {
//         label: "Percentual (%)",
//         data: [
//           data.taxaOcupacao ?? 0,
//           data.comparacaoMedia ?? 0,
//         ],
//         backgroundColor: [
//           "rgba(75, 192, 192, 0.6)",
//           "rgba(255, 99, 132, 0.6)",
//         ],
//         borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const lineChartDataProprietario = {
//     labels: [
//       "Jan",
//       "Fev",
//       "Mar",
//       "Abr",
//       "Mai",
//       "Jun",
//       "Jul",
//       "Ago",
//       "Set",
//       "Out",
//       "Nov",
//       "Dez",
//     ],
//     datasets: [
//       {
//         label: "Receita Mensal (AOA)",
//         data:
//           data.receitaMensal && data.receitaMensal.length >= 12
//             ? data.receitaMensal.slice(0, 12)
//             : [
//                 ...(data.receitaMensal || []),
//                 ...Array(12 - (data.receitaMensal?.length || 0)).fill(0),
//               ],
//         fill: false,
//         borderColor: "rgba(75, 192, 192, 1)",
//         tension: 0.1,
//       },
//     ],
//   };

//   // Dados para Inquilino
//   const totalInquilino = (data.totalImoveis ?? 0) + (data.taxaMediaOcupacao ?? 0);
//   const pieChartDataInquilino = {
//     labels: ["Imóveis Disponíveis", "Taxa de Ocupação"],
//     datasets: [
//       {
//         data:
//           totalInquilino > 0
//             ? [
//                 ((data.totalImoveis ?? 0) / totalInquilino) * 100,
//                 ((data.taxaMediaOcupacao ?? 0) / totalInquilino) * 100,
//               ]
//             : [0, 0],
//         backgroundColor: [
//           "rgba(54, 162, 235, 0.6)",
//           "rgba(255, 206, 86, 0.6)",
//         ],
//         borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const barChartDataInquilino = {
//     labels: [
//       "Jan",
//       "Fev",
//       "Mar",
//       "Abr",
//       "Mai",
//       "Jun",
//       "Jul",
//       "Ago",
//       "Set",
//       "Out",
//       "Nov",
//       "Dez",
//     ],
//     datasets: [
//       {
//         label: "Gastos Mensais (AOA)",
//         data: data.gastosMensais || Array(12).fill(0),
//         backgroundColor: "rgba(54, 162, 235, 0.6)",
//         borderColor: "rgba(54, 162, 235, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" as const },
//       title: {
//         display: true,
//         text: isProprietario
//           ? "Desempenho dos Seus Imóveis (%)"
//           : "Visão Geral da Plataforma (%)",
//       },
//       tooltip: {
//         callbacks: {
//           label: (context: any) =>
//             `${context.dataset.label}: ${context.raw.toFixed(2)}%`,
//         },
//       },
//     },
//     scales: isProprietario
//       ? {
//           y: {
//             beginAtZero: true,
//             title: { display: true, text: "Percentual (%)" },
//           },
//         }
//       : undefined,
//   };

//   const lineBarChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" as const },
//       title: {
//         display: true,
//         text: isProprietario ? "Receita ao Longo do Tempo" : "Gastos por Mês",
//       },
//     },
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">
//           Dashboard do {isProprietario ? "Proprietário" : "Inquilino"} -{" "}
//           {tipoAluguel}
//         </h1>
//         <Button onClick={toggleTipoAluguel} className="relative">
//           Alternar para {tipoAluguel === "RESIDENCIAL" ? "Turístico" : "Residencial"}
//         </Button>
//       </div>

//       <div className="flip-container">
//         <div className={cn("flip-inner", { flip: isFlipping })}>
//           {isProprietario ? (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Taxa de Ocupação</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className="text-2xl font-semibold flex items-center">
//                       <span
//                         className={
//                           data.taxaOcupacao > 0 ? "text-green-600" : "text-red-600"
//                         }
//                       >
//                         {data.taxaOcupacao ?? 0}%
//                       </span>
//                       {data.taxaOcupacao > 0 && (
//                         <ArrowUp className="ml-2 h-5 w-5 text-green-600" />
//                       )}
//                       {data.taxaOcupacao < 0 && (
//                         <ArrowDown className="ml-2 h-5 w-5 text-red-600" />
//                       )}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Este mês</p>
//                     <MiniTrendChart
//                       data={generateTrendData(data.taxaOcupacao)}
//                       label="Taxa de Ocupação"
//                       isPositive={data.taxaOcupacao > 0}
//                     />
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Receita Total</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p
//                       className={`text-2xl font-semibold ${
//                         data.receitaTotal > 0 ? "text-green-600" : "text-red-600"
//                       }`}
//                     >
//                       {formatCurrency(data.receitaTotal)}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Últimos 30 dias</p>
//                     <MiniTrendChart
//                       data={generateTrendData(data.receitaTotal)}
//                       label="Receita Total"
//                       isPositive={data.receitaTotal > 0}
//                     />
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Aluguéis Concluídos</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p
//                       className={`text-2xl font-semibold ${
//                         data.alugueisConcluidos > 0
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {data.alugueisConcluidos ?? 0}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Este mês</p>
//                     <MiniTrendChart
//                       data={generateTrendData(data.alugueisConcluidos)}
//                       label="Aluguéis Concluídos"
//                       isPositive={data.alugueisConcluidos > 0}
//                     />
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Tempo Médio de Reserva</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p
//                       className={`text-2xl font-semibold ${
//                         data.tempoMedioReserva > 0
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {data.tempoMedioReserva ?? 0} dias
//                     </p>
//                     <MiniTrendChart
//                       data={generateTrendData(data.tempoMedioReserva)}
//                       label="Tempo Médio de Reserva"
//                       isPositive={data.tempoMedioReserva > 0}
//                     />
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Imóvel Mais Popular</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p
//                       className={`text-2xl font-semibold ${
//                         data.imovelMaisPopular ? "" : "text-red-600"
//                       }`}
//                     >
//                       {data.imovelMaisPopular
//                         ? `${data.imovelMaisPopular.titulo}`
//                         : "Nenhum"}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       {data.imovelMaisPopular ? (
//                         <span className="text-green-600">{`${
//                           data.imovelMaisPopular.reservas ?? 0
//                         } reservas`}</span>
//                       ) : (
//                         ""
//                       )}
//                     </p>
//                     <MiniTrendChart
//                       data={generateTrendData(
//                         data.imovelMaisPopular?.reservas ?? 0
//                       )}
//                       label="Reservas do Imóvel Mais Popular"
//                       isPositive={(data.imovelMaisPopular?.reservas ?? 0) > 0}
//                     />
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Comparação com Média</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className="text-2xl font-semibold flex items-center">
//                       <span
//                         className={
//                           data.comparacaoMedia > 0
//                             ? "text-green-600"
//                             : data.comparacaoMedia < 0
//                             ? "text-red-600"
//                             : ""
//                         }
//                       >
//                         {data.comparacaoMedia ?? 0}%
//                       </span>
//                       {data.comparacaoMedia > 0 && (
//                         <ArrowUp className="ml-2 h-5 w-5 text-green-600" />
//                       )}
//                       {data.comparacaoMedia < 0 && (
//                         <ArrowDown className="ml-2 h-5 w-5 text-red-600" />
//                       )}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       Acima/Abaixo da média
//                     </p>
//                     <MiniTrendChart
//                       data={generateTrendData(data.comparacaoMedia)}
//                       label="Comparação com Média"
//                       isPositive={data.comparacaoMedia > 0}
//                     />
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Pendências</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className="text-2xl font-semibold text-red-600">
//                       {data.pendencias ?? 0}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       Solicitações pendentes
//                     </p>
//                     <MiniTrendChart
//                       data={generateTrendData(data.pendencias)}
//                       label="Pendências"
//                       isPositive={false} // Pendências são sempre negativas
//                     />
//                   </CardContent>
//                 </Card>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//                 <Card className="w-full h-[400px]">
//                   <CardHeader className="p-4">
//                     <CardTitle>Desempenho</CardTitle>
//                   </CardHeader>
//                   <CardContent className="h-[300px] p-4">
//                     <Bar data={barChartDataProprietario} options={chartOptions} />
//                   </CardContent>
//                 </Card>
//                 <Card className="w-full h-[400px]">
//                   <CardHeader className="p-4">
//                     <CardTitle>Receita ao Longo do Tempo</CardTitle>
//                   </CardHeader>
//                   <CardContent className="h-[300px] p-4">
//                     <Line
//                       data={lineChartDataProprietario}
//                       options={lineBarChartOptions}
//                     />
//                   </CardContent>
//                 </Card>
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Imóveis Disponíveis</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p
//                       className={`text-2xl font-semibold ${
//                         data.totalImoveis > 0 ? "text-green-600" : "text-red-600"
//                       }`}
//                     >
//                       {data.totalImoveis ?? 0}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Na plataforma</p>
//                     <MiniTrendChart
//                       data={generateTrendData(data.totalImoveis)}
//                       label="Imóveis Disponíveis"
//                       isPositive={data.totalImoveis > 0}
//                     />
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Taxa Média de Ocupação</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p className="text-2xl font-semibold flex items-center">
//                       <span
//                         className={
//                           data.taxaMediaOcupacao > 0
//                             ? "text-green-600"
//                             : "text-red-600"
//                         }
//                       >
//                         {data.taxaMediaOcupacao ?? 0}%
//                       </span>
//                       {data.taxaMediaOcupacao > 0 && (
//                         <ArrowUp className="ml-2 h-5 w-5 text-green-600" />
//                       )}
//                       {data.taxaMediaOcupacao < 0 && (
//                         <ArrowDown className="ml-2 h-5 w-5 text-red-600" />
//                       )}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Este mês</p>
//                     <MiniTrendChart
//                       data={generateTrendData(data.taxaMediaOcupacao)}
//                       label="Taxa Média de Ocupação"
//                       isPositive={data.taxaMediaOcupacao > 0}
//                     />
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Preço Médio</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p
//                       className={`text-2xl font-semibold ${
//                         data.precoMedio > 0 ? "text-green-600" : "text-red-600"
//                       }`}
//                     >
//                       {formatCurrency(data.precoMedio)}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Por noite/mês</p>
//                     <MiniTrendChart
//                       data={generateTrendData(data.precoMedio)}
//                       label="Preço Médio"
//                       isPositive={data.precoMedio > 0}
//                     />
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Crescimento da Plataforma</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p
//                       className={`text-2xl font-semibold ${
//                         data.crescimentoPlataforma > 0
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {data.crescimentoPlataforma ?? 0}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       Novos imóveis em 30 dias
//                     </p>
//                     <MiniTrendChart
//                       data={generateTrendData(data.crescimentoPlataforma)}
//                       label="Crescimento da Plataforma"
//                       isPositive={data.crescimentoPlataforma > 0}
//                     />
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Atividade Recente</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p
//                       className={`text-2xl font-semibold ${
//                         data.atividadeRecente > 0
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {data.atividadeRecente ?? 0}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       Aluguéis na última semana
//                     </p>
//                     <MiniTrendChart
//                       data={generateTrendData(data.atividadeRecente)}
//                       label="Atividade Recente"
//                       isPositive={data.atividadeRecente > 0}
//                     />
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Seus Aluguéis</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p
//                       className={`text-2xl font-semibold ${
//                         data.numeroAlugueis > 0
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {data.numeroAlugueis ?? 0}
//                     </p>
//                     <MiniTrendChart
//                       data={generateTrendData(data.numeroAlugueis)}
//                       label="Seus Aluguéis"
//                       isPositive={data.numeroAlugueis > 0}
//                     />
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Gasto Total</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p
//                       className={`text-2xl font-semibold ${
//                         data.gastoTotal > 0 ? "text-green-600" : "text-red-600"
//                       }`}
//                     >
//                       {formatCurrency(data.gastoTotal)}
//                     </p>
//                     <MiniTrendChart
//                       data={generateTrendData(data.gastoTotal)}
//                       label="Gasto Total"
//                       isPositive={data.gastoTotal > 0}
//                     />
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader className="p-4">
//                     <CardTitle>Duração Média</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <p
//                       className={`text-2xl font-semibold ${
//                         data.duracaoMedia > 0 ? "text-green-600" : "text-red-600"
//                       }`}
//                     >
//                       {(data.duracaoMedia ?? 0).toFixed(1)} dias
//                     </p>
//                     <MiniTrendChart
//                       data={generateTrendData(data.duracaoMedia)}
//                       label="Duração Média"
//                       isPositive={data.duracaoMedia > 0}
//                     />
//                   </CardContent>
//                 </Card>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//                 <Card className="w-full h-[400px]">
//                   <CardHeader className="p-4">
//                     <CardTitle>Visão Geral</CardTitle>
//                   </CardHeader>
//                   <CardContent className="h-[300px] p-4">
//                     <Pie data={pieChartDataInquilino} options={chartOptions} />
//                   </CardContent>
//                 </Card>
//                 <Card className="w-full h-[400px]">
//                   <CardHeader className="p-4">
//                     <CardTitle>Gastos por Mês</CardTitle>
//                   </CardHeader>
//                   <CardContent className="h-[300px] p-4">
//                     <Bar data={barChartDataInquilino} options={lineBarChartOptions} />
//                   </CardContent>
//                 </Card>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };














"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/getUser";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, Maximize2, Minimize2 } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const formatCurrency = (value: number | undefined | null) => {
  if (value === undefined || value === null) return "AOA 0";
  return `${value.toLocaleString("pt-AO", {
    style: "currency",
    currency: "AOA",
  })}`;
};

type TipoAluguel = "RESIDENCIAL" | "TURISTICO";

const months = ["Todos", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).sort((a, b) => b - a);

const generateTrendData = (
  currentValue: number | undefined,
  monthsCount: number = 6
): number[] => {
  if (currentValue === undefined || currentValue === null) return Array(monthsCount).fill(0);
  const trend = [];
  const isPositive = currentValue > 0;
  const base = isPositive ? currentValue * 0.8 : currentValue * 1.2;
  for (let i = 0; i < monthsCount; i++) {
    const variation = (Math.random() - 0.5) * base * 0.2;
    trend.push(base + variation);
  }
  trend[monthsCount - 1] = currentValue;
  return trend;
};

const MiniTrendChart: React.FC<{
  data: number[];
  label: string;
  isPositive: boolean;
}> = ({ data, label, isPositive }) => {
  const chartData = {
    labels: ["-6m", "-5m", "-4m", "-3m", "-2m", "-1m"],
    datasets: [
      {
        label,
        data,
        fill: false,
        borderColor: isPositive ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)",
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  return (
    <div className="h-10 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export const DashboardInquilinoProprietarioFlipBox: React.FC = () => {
  const { user } = useUser();
  const [tipoAluguel, setTipoAluguel] = useState<TipoAluguel>(
    user?.role === "PROPRIETARIO" ? "RESIDENCIAL" : "RESIDENCIAL"
  );
  const [isFlipping, setIsFlipping] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState<string>("Todos");
  const [chartSizes, setChartSizes] = useState({
    desempenho: 400,
    receitaGastos: 400,
  });

  const toggleChartSize = (chart: keyof typeof chartSizes) => {
    setChartSizes((prev) => ({
      ...prev,
      [chart]: prev[chart] === 400 ? 600 : 400,
    }));
  };

  const toggleTipoAluguel = () => {
    setIsFlipping(true);
    setShowLoading(true);
    setTimeout(() => {
      setTipoAluguel((prev) => (prev === "RESIDENCIAL" ? "TURISTICO" : "RESIDENCIAL"));
      setIsFlipping(false);
      setTimeout(() => setShowLoading(false), 3000);
    }, 600);
  };

  const { data, isLoading } = useQuery({
    queryKey: [`dashboard-${user?.role?.toLowerCase()}-${tipoAluguel}-${selectedYear}-${selectedMonth}`, user?.id],
    queryFn: async () => {
      const monthParam = selectedMonth === "Todos" ? "" : `&month=${selectedMonth}`;
      const response = await fetch(
        `/api/dashboard/${user?.role?.toLowerCase()}?tipoAluguel=${tipoAluguel}&year=${selectedYear}${monthParam}`
      );
      if (!response.ok) throw new Error("Erro ao carregar dados");
      return response.json();
    },
    enabled: !!user && (user.role === "PROPRIETARIO" || user.role === "INQUILINO"),
  });

  useEffect(() => {
    setShowLoading(true);
    const timer = setTimeout(() => setShowLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [tipoAluguel, selectedYear, selectedMonth]);

  if (!user) return <div>Carregando usuário...</div>;
  if (user.role !== "PROPRIETARIO" && user.role !== "INQUILINO") return false;

  if (isLoading || showLoading || !data) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: user.role === "PROPRIETARIO" ? 7 : 8 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full max-w-2xl mx-auto" />
      </div>
    );
  }

  const isProprietario = user.role === "PROPRIETARIO";

  const barChartDataProprietario = {
    labels: ["Taxa de Ocupação", "Comparação com Média"],
    datasets: [
      {
        label: "Percentual (%)",
        data: [data.taxaOcupacao ?? 0, data.comparacaoMedia ?? 0],
        backgroundColor: [
          (data.taxaOcupacao ?? 0) >= 0 ? "rgba(75, 192, 192, 0.6)" : "rgba(255, 99, 132, 0.6)",
          (data.comparacaoMedia ?? 0) >= 0 ? "rgba(75, 192, 192, 0.6)" : "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          (data.taxaOcupacao ?? 0) >= 0 ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)",
          (data.comparacaoMedia ?? 0) >= 0 ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartDataProprietario = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    datasets: [
      {
        label: "Receita Mensal (AOA)",
        data:
          data.receitaMensal && data.receitaMensal.length >= 12
            ? data.receitaMensal.slice(0, 12)
            : [...(data.receitaMensal || []), ...Array(12 - (data.receitaMensal?.length || 0)).fill(0)],
        fill: false,
        borderColor:
          data.receitaMensal && data.receitaMensal.some((v: number) => v < 0)
            ? "rgba(255, 99, 132, 1)"
            : "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const totalInquilino = (data.totalImoveis ?? 0) + (data.taxaMediaOcupacao ?? 0);
  const pieChartDataInquilino = {
    labels: ["Imóveis Disponíveis", "Taxa de Ocupação"],
    datasets: [
      {
        data:
          totalInquilino > 0
            ? [
                ((data.totalImoveis ?? 0) / totalInquilino) * 100,
                ((data.taxaMediaOcupacao ?? 0) / totalInquilino) * 100,
              ]
            : [0, 0],
        backgroundColor: [
          (data.totalImoveis ?? 0) >= 0 ? "rgba(54, 162, 235, 0.6)" : "rgba(255, 99, 132, 0.6)",
          (data.taxaMediaOcupacao ?? 0) >= 0 ? "rgba(255, 206, 86, 0.6)" : "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          (data.totalImoveis ?? 0) >= 0 ? "rgba(54, 162, 235, 1)" : "rgba(255, 99, 132, 1)",
          (data.taxaMediaOcupacao ?? 0) >= 0 ? "rgba(255, 206, 86, 1)" : "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartDataInquilino = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    datasets: [
      {
        label: "Gastos Mensais (AOA)",
        data: data.gastosMensais || Array(12).fill(0),
        backgroundColor: data.gastosMensais && data.gastosMensais.some((v: number) => v < 0)
          ? "rgba(255, 99, 132, 0.6)"
          : "rgba(54, 162, 235, 0.6)",
        borderColor: data.gastosMensais && data.gastosMensais.some((v: number) => v < 0)
          ? "rgba(255, 99, 132, 1)"
          : "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: isProprietario ? "Desempenho dos Seus Imóveis (%)" : "Visão Geral da Plataforma (%)",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw.toFixed(2)}%`,
        },
      },
    },
    scales: isProprietario
      ? {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Percentual (%)" },
          },
        }
      : undefined,
  };

  const lineBarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: isProprietario ? "Receita ao Longo do Tempo" : "Gastos por Mês",
      },
    },
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Dashboard do {isProprietario ? "Proprietário" : "Inquilino"} - {tipoAluguel}
        </h1>
        <Button onClick={toggleTipoAluguel} className="relative">
          Alternar para {tipoAluguel === "RESIDENCIAL" ? "Turístico" : "Residencial"}
        </Button>
      </div>

      <div className="flip-container">
        <div className={cn("flip-inner", { flip: isFlipping })}>
          {isProprietario ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Taxa de Ocupação</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-2xl font-semibold flex items-center">
                      <span
                        className={data.taxaOcupacao >= 0 ? "text-green-600" : "text-red-600"}
                      >
                        {data.taxaOcupacao ?? 0}%
                      </span>
                      {data.taxaOcupacao > 0 && (
                        <ArrowUp className="ml-2 h-5 w-5 text-green-600" />
                      )}
                      {data.taxaOcupacao < 0 && (
                        <ArrowDown className="ml-2 h-5 w-5 text-red-600" />
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">Este mês</p>
                    <MiniTrendChart
                      data={generateTrendData(data.taxaOcupacao)}
                      label="Taxa de Ocupação"
                      isPositive={data.taxaOcupacao >= 0}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Receita Total</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p
                      className={`text-2xl font-semibold ${
                        data.receitaTotal >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatCurrency(data.receitaTotal)}
                    </p>
                    <p className="text-sm text-muted-foreground">Últimos 30 dias</p>
                    <MiniTrendChart
                      data={generateTrendData(data.receitaTotal)}
                      label="Receita Total"
                      isPositive={data.receitaTotal >= 0}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Aluguéis Concluídos</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p
                      className={`text-2xl font-semibold ${
                        data.alugueisConcluidos >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {data.alugueisConcluidos ?? 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Este mês</p>
                    <MiniTrendChart
                      data={generateTrendData(data.alugueisConcluidos)}
                      label="Aluguéis Concluídos"
                      isPositive={data.alugueisConcluidos >= 0}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Tempo Médio de Reserva</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p
                      className={`text-2xl font-semibold ${
                        data.tempoMedioReserva >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {data.tempoMedioReserva ?? 0} dias
                    </p>
                    <MiniTrendChart
                      data={generateTrendData(data.tempoMedioReserva)}
                      label="Tempo Médio de Reserva"
                      isPositive={data.tempoMedioReserva >= 0}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Imóvel Mais Popular</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p
                      className={`text-2xl font-semibold ${
                        data.imovelMaisPopular ? "" : "text-red-600"
                      }`}
                    >
                      {data.imovelMaisPopular
                        ? `${data.imovelMaisPopular.titulo}`
                        : "Nenhum"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {data.imovelMaisPopular ? (
                        <span
                          className={
                            (data.imovelMaisPopular.reservas ?? 0) >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {`${data.imovelMaisPopular.reservas ?? 0} reservas`}
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                    <MiniTrendChart
                      data={generateTrendData(data.imovelMaisPopular?.reservas ?? 0)}
                      label="Reservas do Imóvel Mais Popular"
                      isPositive={(data.imovelMaisPopular?.reservas ?? 0) >= 0}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Comparação com Média</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-2xl font-semibold flex items-center">
                      <span
                        className={
                          data.comparacaoMedia >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {data.comparacaoMedia ?? 0}%
                      </span>
                      {data.comparacaoMedia > 0 && (
                        <ArrowUp className="ml-2 h-5 w-5 text-green-600" />
                      )}
                      {data.comparacaoMedia < 0 && (
                        <ArrowDown className="ml-2 h-5 w-5 text-red-600" />
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">Acima/Abaixo da média</p>
                    <MiniTrendChart
                      data={generateTrendData(data.comparacaoMedia)}
                      label="Comparação com Média"
                      isPositive={data.comparacaoMedia >= 0}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Pendências</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p
                      className={`text-2xl font-semibold ${
                        (data.pendencias ?? 0) > 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {data.pendencias ?? 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Solicitações pendentes</p>
                    <MiniTrendChart
                      data={generateTrendData(data.pendencias)}
                      label="Pendências"
                      isPositive={false}
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card className="w-full" style={{ height: `${chartSizes.desempenho}px` }}>
                  <CardHeader className="p-4 flex justify-between items-center">
                    <CardTitle>Desempenho</CardTitle>
                    <div className="flex space-x-2">
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="border rounded p-1"
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="border rounded p-1"
                      >
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleChartSize("desempenho")}
                      >
                        {chartSizes.desempenho === 400 ? (
                          <Maximize2 className="h-4 w-4" />
                        ) : (
                          <Minimize2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="h-[calc(100%-4rem)] p-4">
                    <Bar data={barChartDataProprietario} options={chartOptions} />
                  </CardContent>
                </Card>
                <Card className="w-full" style={{ height: `${chartSizes.receitaGastos}px` }}>
                  <CardHeader className="p-4 flex justify-between items-center">
                    <CardTitle>Receita ao Longo do Tempo</CardTitle>
                    <div className="flex space-x-2">
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="border rounded p-1"
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="border rounded p-1"
                      >
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleChartSize("receitaGastos")}
                      >
                        {chartSizes.receitaGastos === 400 ? (
                          <Maximize2 className="h-4 w-4" />
                        ) : (
                          <Minimize2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="h-[calc(100%-4rem)] p-4">
                    <Line data={lineChartDataProprietario} options={lineBarChartOptions} />
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Imóveis Disponíveis</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p
                      className={`text-2xl font-semibold ${
                        (data.totalImoveis ?? 0) >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {data.totalImoveis ?? 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Na plataforma</p>
                    <MiniTrendChart
                      data={generateTrendData(data.totalImoveis)}
                      label="Imóveis Disponíveis"
                      isPositive={(data.totalImoveis ?? 0) >= 0}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Taxa Média de Ocupação</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-2xl font-semibold flex items-center">
                      <span
                        className={
                          (data.taxaMediaOcupacao ?? 0) >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {data.taxaMediaOcupacao ?? 0}%
                      </span>
                      {data.taxaMediaOcupacao > 0 && (
                        <ArrowUp className="ml-2 h-5 w-5 text-green-600" />
                      )}
                      {data.taxaMediaOcupacao < 0 && (
                        <ArrowDown className="ml-2 h-5 w-5 text-red-600" />
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">Este mês</p>
                    <MiniTrendChart
                      data={generateTrendData(data.taxaMediaOcupacao)}
                      label="Taxa Média de Ocupação"
                      isPositive={(data.taxaMediaOcupacao ?? 0) >= 0}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Preço Médio</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p
                      className={`text-2xl font-semibold ${
                        (data.precoMedio ?? 0) >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatCurrency(data.precoMedio)}
                    </p>
                    <p className="text-sm text-muted-foreground">Por noite/mês</p>
                    <MiniTrendChart
                      data={generateTrendData(data.precoMedio)}
                      label="Preço Médio"
                      isPositive={(data.precoMedio ?? 0) >= 0}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Crescimento da Plataforma</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p
                      className={`text-2xl font-semibold ${
                        (data.crescimentoPlataforma ?? 0) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {data.crescimentoPlataforma ?? 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Novos imóveis em 30 dias</p>
                    <MiniTrendChart
                      data={generateTrendData(data.crescimentoPlataforma)}
                      label="Crescimento da Plataforma"
                      isPositive={(data.crescimentoPlataforma ?? 0) >= 0}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Atividade Recente</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p
                      className={`text-2xl font-semibold ${
                        (data.atividadeRecente ?? 0) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {data.atividadeRecente ?? 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Aluguéis na última semana</p>
                    <MiniTrendChart
                      data={generateTrendData(data.atividadeRecente)}
                      label="Atividade Recente"
                      isPositive={(data.atividadeRecente ?? 0) >= 0}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Seus Aluguéis</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p
                      className={`text-2xl font-semibold ${
                        (data.numeroAlugueis ?? 0) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {data.numeroAlugueis ?? 0}
                    </p>
                    <MiniTrendChart
                      data={generateTrendData(data.numeroAlugueis)}
                      label="Seus Aluguéis"
                      isPositive={(data.numeroAlugueis ?? 0) >= 0}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Gasto Total</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p
                      className={`text-2xl font-semibold ${
                        (data.gastoTotal ?? 0) >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatCurrency(data.gastoTotal)}
                    </p>
                    <MiniTrendChart
                      data={generateTrendData(data.gastoTotal)}
                      label="Gasto Total"
                      isPositive={(data.gastoTotal ?? 0) >= 0}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Duração Média</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p
                      className={`text-2xl font-semibold ${
                        (data.duracaoMedia ?? 0) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {(data.duracaoMedia ?? 0).toFixed(1)} dias
                    </p>
                    <MiniTrendChart
                      data={generateTrendData(data.duracaoMedia)}
                      label="Duração Média"
                      isPositive={(data.duracaoMedia ?? 0) >= 0}
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card className="w-full" style={{ height: `${chartSizes.desempenho}px` }}>
                  <CardHeader className="p-4 flex justify-between items-center">
                    <CardTitle>Visão Geral</CardTitle>
                    <div className="flex space-x-2">
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="border rounded p-1"
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="border rounded p-1"
                      >
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleChartSize("desempenho")}
                      >
                        {chartSizes.desempenho === 400 ? (
                          <Maximize2 className="h-4 w-4" />
                        ) : (
                          <Minimize2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="h-[calc(100%-4rem)] p-4">
                    <Pie data={pieChartDataInquilino} options={chartOptions} />
                  </CardContent>
                </Card>
                <Card className="w-full" style={{ height: `${chartSizes.receitaGastos}px` }}>
                  <CardHeader className="p-4 flex justify-between items-center">
                    <CardTitle>Gastos por Mês</CardTitle>
                    <div className="flex space-x-2">
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="border rounded p-1"
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="border rounded p-1"
                      >
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleChartSize("receitaGastos")}
                      >
                        {chartSizes.receitaGastos === 400 ? (
                          <Maximize2 className="h-4 w-4" />
                        ) : (
                          <Minimize2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="h-[calc(100%-4rem)] p-4">
                    <Bar data={barChartDataInquilino} options={lineBarChartOptions} />
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};