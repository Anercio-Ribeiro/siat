// // "use client";
// // import { useState } from "react";
// // import { useQuery } from "@tanstack/react-query";
// // import { Bar, Line, Pie } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   LineElement,
// //   PointElement,
// //   ArcElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Skeleton } from "@/components/ui/skeleton";
// // import { Button } from "@/components/ui/button";
// // import { useUser } from "@/hooks/getUser";
// // import { cn } from "@/lib/utils"; // Função utilitária do Shadcn para combinar classes

// // ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

// // const formatCurrency = (value: number | undefined | null) => {
// //   if (value === undefined || value === null) return "AOA 0";
// //   return `${value.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}`;
// // };

// // type TipoAluguel = "RESIDENCIAL" | "TURISTICO";

// // export const DashboardInquilinoProprietarioFlipBox: React.FC = () => {
// //   const { user } = useUser();
// //   const [tipoAluguel, setTipoAluguel] = useState<TipoAluguel>(
// //     user?.role === "PROPRIETARIO" ? "RESIDENCIAL" : "RESIDENCIAL" // Padrão Residencial
// //   );
// //   const [isFlipping, setIsFlipping] = useState(false);

// //   const toggleTipoAluguel = () => {
// //     setIsFlipping(true);
// //     setTimeout(() => {
// //       setTipoAluguel(prev => (prev === "RESIDENCIAL" ? "TURISTICO" : "RESIDENCIAL"));
// //       setIsFlipping(false);
// //     }, 300); // Duração da animação
// //   };

// //   const { data, isLoading } = useQuery({
// //     queryKey: [`dashboard-${user?.role?.toLowerCase()}-${tipoAluguel}`, user?.id],
// //     queryFn: () =>
// //       fetch(`/api/dashboard/${user?.role?.toLowerCase()}?tipoAluguel=${tipoAluguel}`).then(res => res.json()),
// //     enabled: !!user && (user.role === "PROPRIETARIO" || user.role === "INQUILINO"),
// //   });

// //   if (!user) return <div>Carregando usuário...</div>;
// //   if (user.role !== "PROPRIETARIO" && user.role !== "INQUILINO")
// //     return <div>Acesso negado. Apenas proprietários e inquilinos podem ver este dashboard.</div>;

// //   if (isLoading || !data) {
// //     return (
// //       <div className="p-4 space-y-6">
// //         <Skeleton className="h-8 w-1/4" />
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           {Array.from({ length: user.role === "PROPRIETARIO" ? 7 : 8 }).map((_, i) => (
// //             <Skeleton key={i} className="h-32 w-full" />
// //           ))}
// //         </div>
// //         <Skeleton className="h-64 w-full max-w-2xl mx-auto" />
// //       </div>
// //     );
// //   }

// //   const isProprietario = user.role === "PROPRIETARIO";

// //   // Dados para Proprietário
// //   const barChartDataProprietario = {
// //     labels: ["Taxa de Ocupação", "Comparação com Média"],
// //     datasets: [
// //       {
// //         label: "Percentual (%)",
// //         data: [data.taxaOcupacao ?? 0, data.comparacaoMedia ?? 0],
// //         backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
// //         borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// //   const lineChartDataProprietario = {
// //     labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
// //     datasets: [
// //       {
// //         label: "Receita Mensal (AOA)",
// //         data: [50000, 60000, 45000, 70000, 80000, data.receitaTotal ?? 0],
// //         fill: false,
// //         borderColor: "rgba(75, 192, 192, 1)",
// //         tension: 0.1,
// //       },
// //     ],
// //   };

// //   // Dados para Inquilino
// //   const pieChartDataInquilino = {
// //     labels: ["Imóveis Disponíveis", "Taxa de Ocupação"],
// //     datasets: [
// //       {
// //         data: [data.totalImoveis ?? 0, data.taxaMediaOcupacao ?? 0],
// //         backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"],
// //         borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// //   const barChartDataInquilino = {
// //     labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
// //     datasets: [
// //       {
// //         label: "Gastos Mensais (AOA)",
// //         data: [10000, 15000, 12000, 18000, 20000, (data.gastoTotal ?? 0) / 6],
// //         backgroundColor: "rgba(54, 162, 235, 0.6)",
// //         borderColor: "rgba(54, 162, 235, 1)",
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// //   const chartOptions = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     plugins: {
// //       legend: { position: "top" as const },
// //       title: { display: true, text: isProprietario ? "Desempenho dos Seus Imóveis" : "Visão Geral da Plataforma" },
// //     },
// //   };

// //   const lineBarChartOptions = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     plugins: {
// //       legend: { position: "top" as const },
// //       title: { display: true, text: isProprietario ? "Receita ao Longo do Tempo" : "Gastos por Mês" },
// //     },
// //   };

// //   return (
// //     <div className="p-4 space-y-6">
// //       <div className="flex justify-between items-center">
// //         <h1 className="text-2xl font-bold">
// //           Dashboard do {isProprietario ? "Proprietário" : "Inquilino"} - {tipoAluguel}
// //         </h1>
// //         <Button onClick={toggleTipoAluguel} className="relative">
// //           Alternar para {tipoAluguel === "RESIDENCIAL" ? "Turístico" : "Residencial"}
// //         </Button>
// //       </div>

// //       <div className={cn("flip-container", { "flip": isFlipping })}>
// //         {isProprietario ? (
// //           <>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Taxa de Ocupação</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-2xl font-semibold">{data.taxaOcupacao ?? 0}%</p>
// //                   <p className="text-sm text-muted-foreground">Este mês</p>
// //                 </CardContent>
// //               </Card>
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Receita Total</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-2xl font-semibold">{formatCurrency(data.receitaTotal)}</p>
// //                   <p className="text-sm text-muted-foreground">Últimos 30 dias</p>
// //                 </CardContent>
// //               </Card>
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Aluguéis Concluídos</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-2xl font-semibold">{data.alugueisConcluidos ?? 0}</p>
// //                   <p className="text-sm text-muted-foreground">Este mês</p>
// //                 </CardContent>
// //               </Card>
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Tempo Médio de Reserva</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-2xl font-semibold">{data.tempoMedioReserva ?? 0} dias</p>
// //                 </CardContent>
// //               </Card>
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Imóvel Mais Popular</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-2xl font-semibold">
// //                     {data.imovelMaisPopular ? `${data.imovelMaisPopular.titulo}` : "Nenhum"}
// //                   </p>
// //                   <p className="text-sm text-muted-foreground">
// //                     {data.imovelMaisPopular ? `${data.imovelMaisPopular.reservas ?? 0} reservas` : ""}
// //                   </p>
// //                 </CardContent>
// //               </Card>
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Comparação com Média</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-2xl font-semibold">{data.comparacaoMedia ?? 0}%</p>
// //                   <p className="text-sm text-muted-foreground">Acima/Abaixo da média</p>
// //                 </CardContent>
// //               </Card>
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Pendências</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-2xl font-semibold">{data.pendencias ?? 0}</p>
// //                   <p className="text-sm text-muted-foreground">Solicitações pendentes</p>
// //                 </CardContent>
// //               </Card>
// //             </div>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <Card className="w-full h-[400px]">
// //                 <CardHeader>
// //                   <CardTitle>Desempenho</CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="h-[300px]">
// //                   <Bar data={barChartDataProprietario} options={chartOptions} />
// //                 </CardContent>
// //               </Card>
// //               <Card className="w-full h-[400px]">
// //                 <CardHeader>
// //                   <CardTitle>Receita ao Longo do Tempo</CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="h-[300px]">
// //                   <Line data={lineChartDataProprietario} options={lineBarChartOptions} />
// //                 </CardContent>
// //               </Card>
// //             </div>
// //           </>
// //         ) : (
// //           <>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Imóveis Disponíveis</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-2xl font-semibold">{data.totalImoveis ?? 0}</p>
// //                   <p className="text-sm text-muted-foreground">Na plataforma</p>
// //                 </CardContent>
// //               </Card>
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Taxa Média de Ocupação</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-2xl font-semibold">{data.taxaMediaOcupacao ?? 0}%</p>
// //                   <p className="text-sm text-muted-foreground">Este mês</p>
// //                 </CardContent>
// //               </Card>
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Preço Médio</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-2xl font-semibold">{formatCurrency(data.precoMedio)}</p>
// //                   <p className="text-sm text-muted-foreground">Por noite/mês</p>
// //                 </CardContent>
// //               </Card>
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Crescimento da Plataforma</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-2xl font-semibold">{data.crescimentoPlataforma ?? 0}</p>
// //                   <p className="text-sm text-muted-foreground">Novos imóveis em 30 dias</p>
// //                 </CardContent>
// //               </Card>
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Atividade Recente</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-2xl font-semibold">{data.atividadeRecente ?? 0}</p>
// //                   <p className="text-sm text-muted-foreground">Aluguéis na última semana</p>
// //                 </CardContent>
// //               </Card>
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Seus Aluguéis</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-2xl font-semibold">{data.numeroAlugueis ?? 0}</p>
// //                 </CardContent>
// //               </Card>
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Gasto Total</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-2xl font-semibold">{formatCurrency(data.gastoTotal)}</p>
// //                 </CardContent>
// //               </Card>
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Duração Média</CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-2xl font-semibold">{(data.duracaoMedia ?? 0).toFixed(1)} dias</p>
// //                 </CardContent>
// //               </Card>
// //             </div>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <Card className="w-full h-[400px]">
// //                 <CardHeader>
// //                   <CardTitle>Visão Geral</CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="h-[300px]">
// //                   <Pie data={pieChartDataInquilino} options={chartOptions} />
// //                 </CardContent>
// //               </Card>
// //               <Card className="w-full h-[400px]">
// //                 <CardHeader>
// //                   <CardTitle>Gastos por Mês</CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="h-[300px]">
// //                   <Bar data={barChartDataInquilino} options={lineBarChartOptions} />
// //                 </CardContent>
// //               </Card>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };














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
//       setTimeout(() => setShowLoading(false), 3000); // Atraso de 3 segundos para o loading
//     }, 300); // Duração da animação flip
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
//     // Reseta o loading ao carregar a página inicialmente
//     setShowLoading(true);
//     const timer = setTimeout(() => setShowLoading(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (!user) return <div>Carregando usuário...</div>;
//   if (user.role !== "PROPRIETARIO" && user.role !== "INQUILINO")
//     return <div>Acesso negado. Apenas proprietários e inquilinos podem ver este dashboard.</div>;

//   if (isLoading || showLoading || !data) {
//     return (
//       <div className="p-4 space-y-6">
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
//     labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
//     datasets: [
//       {
//         label: "Receita Mensal (AOA)",
//         data: [50000, 60000, 45000, 70000, 80000, data.receitaTotal ?? 0],
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
//     labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
//     datasets: [
//       {
//         label: "Gastos Mensais (AOA)",
//         data: [10000, 15000, 12000, 18000, 20000, (data.gastoTotal ?? 0) / 6],
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
//     <div className="p-4 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">
//           Dashboard do {isProprietario ? "Proprietário" : "Inquilino"} - {tipoAluguel}
//         </h1>
//         <Button onClick={toggleTipoAluguel} className="relative">
//           Alternar para {tipoAluguel === "RESIDENCIAL" ? "Turístico" : "Residencial"}
//         </Button>
//       </div>

//       <div className={cn("transition-all duration-300", { "opacity-0 rotate-y-90": isFlipping })}>
//         {isProprietario ? (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Taxa de Ocupação</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-semibold">{data.taxaOcupacao ?? 0}%</p>
//                   <p className="text-sm text-muted-foreground">Este mês</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Receita Total</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-semibold">{formatCurrency(data.receitaTotal)}</p>
//                   <p className="text-sm text-muted-foreground">Últimos 30 dias</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Aluguéis Concluídos</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-semibold">{data.alugueisConcluidos ?? 0}</p>
//                   <p className="text-sm text-muted-foreground">Este mês</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Tempo Médio de Reserva</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-semibold">{data.tempoMedioReserva ?? 0} dias</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Imóvel Mais Popular</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-semibold">
//                     {data.imovelMaisPopular ? `${data.imovelMaisPopular.titulo}` : "Nenhum"}
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     {data.imovelMaisPopular ? `${data.imovelMaisPopular.reservas ?? 0} reservas` : ""}
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Comparação com Média</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-semibold">{data.comparacaoMedia ?? 0}%</p>
//                   <p className="text-sm text-muted-foreground">Acima/Abaixo da média</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Pendências</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-semibold">{data.pendencias ?? 0}</p>
//                   <p className="text-sm text-muted-foreground">Solicitações pendentes</p>
//                 </CardContent>
//               </Card>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Card className="w-full h-[400px]">
//                 <CardHeader>
//                   <CardTitle>Desempenho</CardTitle>
//                 </CardHeader>
//                 <CardContent className="h-[300px]">
//                   <Bar data={barChartDataProprietario} options={chartOptions} />
//                 </CardContent>
//               </Card>
//               <Card className="w-full h-[400px]">
//                 <CardHeader>
//                   <CardTitle>Receita ao Longo do Tempo</CardTitle>
//                 </CardHeader>
//                 <CardContent className="h-[300px]">
//                   <Line data={lineChartDataProprietario} options={lineBarChartOptions} />
//                 </CardContent>
//               </Card>
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Imóveis Disponíveis</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-semibold">{data.totalImoveis ?? 0}</p>
//                   <p className="text-sm text-muted-foreground">Na plataforma</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Taxa Média de Ocupação</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-semibold">{data.taxaMediaOcupacao ?? 0}%</p>
//                   <p className="text-sm text-muted-foreground">Este mês</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Preço Médio</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-semibold">{formatCurrency(data.precoMedio)}</p>
//                   <p className="text-sm text-muted-foreground">Por noite/mês</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Crescimento da Plataforma</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-semibold">{data.crescimentoPlataforma ?? 0}</p>
//                   <p className="text-sm text-muted-foreground">Novos imóveis em 30 dias</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Atividade Recente</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-semibold">{data.atividadeRecente ?? 0}</p>
//                   <p className="text-sm text-muted-foreground">Aluguéis na última semana</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Seus Aluguéis</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-semibold">{data.numeroAlugueis ?? 0}</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Gasto Total</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-semibold">{formatCurrency(data.gastoTotal)}</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Duração Média</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-semibold">{(data.duracaoMedia ?? 0).toFixed(1)} dias</p>
//                 </CardContent>
//               </Card>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Card className="w-full h-[400px]">
//                 <CardHeader>
//                   <CardTitle>Visão Geral</CardTitle>
//                 </CardHeader>
//                 <CardContent className="h-[300px]">
//                   <Pie data={pieChartDataInquilino} options={chartOptions} />
//                 </CardContent>
//               </Card>
//               <Card className="w-full h-[400px]">
//                 <CardHeader>
//                   <CardTitle>Gastos por Mês</CardTitle>
//                 </CardHeader>
//                 <CardContent className="h-[300px]">
//                   <Bar data={barChartDataInquilino} options={lineBarChartOptions} />
//                 </CardContent>
//               </Card>
//             </div>
//           </>
//         )}
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

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const formatCurrency = (value: number | undefined | null) => {
  if (value === undefined || value === null) return "AOA 0";
  return `${value.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}`;
};

type TipoAluguel = "RESIDENCIAL" | "TURISTICO";

export const DashboardInquilinoProprietarioFlipBox: React.FC = () => {
  const { user } = useUser();
  const [tipoAluguel, setTipoAluguel] = useState<TipoAluguel>(
    user?.role === "PROPRIETARIO" ? "RESIDENCIAL" : "RESIDENCIAL"
  );
  const [isFlipping, setIsFlipping] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const toggleTipoAluguel = () => {
    setIsFlipping(true);
    setShowLoading(true);
    setTimeout(() => {
      setTipoAluguel(prev => (prev === "RESIDENCIAL" ? "TURISTICO" : "RESIDENCIAL"));
      setIsFlipping(false);
      setTimeout(() => setShowLoading(false), 3000); // Atraso de 3 segundos para o loading
    }, 600); // Duração da animação flip
  };

  const { data, isLoading } = useQuery({
    queryKey: [`dashboard-${user?.role?.toLowerCase()}-${tipoAluguel}`, user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/dashboard/${user?.role?.toLowerCase()}?tipoAluguel=${tipoAluguel}`);
      if (!response.ok) throw new Error("Erro ao carregar dados");
      return response.json();
    },
    enabled: !!user && (user.role === "PROPRIETARIO" || user.role === "INQUILINO"),
  });

  useEffect(() => {
    setShowLoading(true);
    const timer = setTimeout(() => setShowLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!user) return <div>Carregando usuário...</div>;
  if (user.role !== "PROPRIETARIO" && user.role !== "INQUILINO")
    return false;

  if (isLoading || showLoading || !data) {
    return (
      <div className="p-4 space-y-6">
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

  // Dados para Proprietário
  const barChartDataProprietario = {
    labels: ["Taxa de Ocupação", "Comparação com Média"],
    datasets: [
      {
        label: "Percentual (%)",
        data: [data.taxaOcupacao ?? 0, data.comparacaoMedia ?? 0],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const lineChartDataProprietario = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Receita Mensal (AOA)",
        data: data.receitaMensal || [0, 0, 0, 0, 0, 0],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  // Dados para Inquilino
  const pieChartDataInquilino = {
    labels: ["Imóveis Disponíveis", "Taxa de Ocupação"],
    datasets: [
      {
        data: [data.totalImoveis ?? 0, data.taxaMediaOcupacao ?? 0],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const barChartDataInquilino = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Gastos Mensais (AOA)",
        data: data.gastosMensais || [0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: isProprietario ? "Desempenho dos Seus Imóveis" : "Visão Geral da Plataforma" },
    },
  };

  const lineBarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: isProprietario ? "Receita ao Longo do Tempo" : "Gastos por Mês" },
    },
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Dashboard do {isProprietario ? "Proprietário" : "Inquilino"} - {tipoAluguel}
        </h1>
        <Button onClick={toggleTipoAluguel} className="relative">
          Alternar para {tipoAluguel === "RESIDENCIAL" ? "Turístico" : "Residencial"}
        </Button>
      </div>

      <div className="flip-container">
        <div className={cn("flip-inner", { "flip": isFlipping })}>
          {isProprietario ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card><CardHeader><CardTitle>Taxa de Ocupação</CardTitle></CardHeader><CardContent><p className="text-2xl font-semibold">{data.taxaOcupacao ?? 0}%</p><p className="text-sm text-muted-foreground">Este mês</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Receita Total</CardTitle></CardHeader><CardContent><p className="text-2xl font-semibold">{formatCurrency(data.receitaTotal)}</p><p className="text-sm text-muted-foreground">Últimos 30 dias</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Aluguéis Concluídos</CardTitle></CardHeader><CardContent><p className="text-2xl font-semibold">{data.alugueisConcluidos ?? 0}</p><p className="text-sm text-muted-foreground">Este mês</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Tempo Médio de Reserva</CardTitle></CardHeader><CardContent><p className="text-2xl font-semibold">{data.tempoMedioReserva ?? 0} dias</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Imóvel Mais Popular</CardTitle></CardHeader><CardContent><p className="text-2xl font-semibold">{data.imovelMaisPopular ? `${data.imovelMaisPopular.titulo}` : "Nenhum"}</p><p className="text-sm text-muted-foreground">{data.imovelMaisPopular ? `${data.imovelMaisPopular.reservas ?? 0} reservas` : ""}</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Comparação com Média</CardTitle></CardHeader><CardContent><p className="text-2xl font-semibold">{data.comparacaoMedia ?? 0}%</p><p className="text-sm text-muted-foreground">Acima/Abaixo da média</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Pendências</CardTitle></CardHeader><CardContent><p className="text-2xl font-semibold">{data.pendencias ?? 0}</p><p className="text-sm text-muted-foreground">Solicitações pendentes</p></CardContent></Card>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="w-full h-[400px]"><CardHeader><CardTitle>Desempenho</CardTitle></CardHeader><CardContent className="h-[300px]"><Bar data={barChartDataProprietario} options={chartOptions} /></CardContent></Card>
                <Card className="w-full h-[400px]"><CardHeader><CardTitle>Receita ao Longo do Tempo</CardTitle></CardHeader><CardContent className="h-[300px]"><Line data={lineChartDataProprietario} options={lineBarChartOptions} /></CardContent></Card>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card><CardHeader><CardTitle>Imóveis Disponíveis</CardTitle></CardHeader><CardContent><p className="text-2xl font-semibold">{data.totalImoveis ?? 0}</p><p className="text-sm text-muted-foreground">Na plataforma</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Taxa Média de Ocupação</CardTitle></CardHeader><CardContent><p className="text-2xl font-semibold">{data.taxaMediaOcupacao ?? 0}%</p><p className="text-sm text-muted-foreground">Este mês</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Preço Médio</CardTitle></CardHeader><CardContent><p className="text-2xl font-semibold">{formatCurrency(data.precoMedio)}</p><p className="text-sm text-muted-foreground">Por noite/mês</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Crescimento da Plataforma</CardTitle></CardHeader><CardContent><p className="text-2xl font-semibold">{data.crescimentoPlataforma ?? 0}</p><p className="text-sm text-muted-foreground">Novos imóveis em 30 dias</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Atividade Recente</CardTitle></CardHeader><CardContent><p className="text-2xl font-semibold">{data.atividadeRecente ?? 0}</p><p className="text-sm text-muted-foreground">Aluguéis na última semana</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Seus Aluguéis</CardTitle></CardHeader><CardContent><p className="text-2xl font-semibold">{data.numeroAlugueis ?? 0}</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Gasto Total</CardTitle></CardHeader><CardContent><p className="text-2xl font-semibold">{formatCurrency(data.gastoTotal)}</p></CardContent></Card>
                <Card><CardHeader><CardTitle>Duração Média</CardTitle></CardHeader><CardContent><p className="text-2xl font-semibold">{(data.duracaoMedia ?? 0).toFixed(1)} dias</p></CardContent></Card>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="w-full h-[400px]"><CardHeader><CardTitle>Visão Geral</CardTitle></CardHeader><CardContent className="h-[300px]"><Pie data={pieChartDataInquilino} options={chartOptions} /></CardContent></Card>
                <Card className="w-full h-[400px]"><CardHeader><CardTitle>Gastos por Mês</CardTitle></CardHeader><CardContent className="h-[300px]"><Bar data={barChartDataInquilino} options={lineBarChartOptions} /></CardContent></Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};