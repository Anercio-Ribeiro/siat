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

// export const EstatisticasDashboard: React.FC = () => {
//   const { user } = useUser();
//   const [tipoAluguel, setTipoAluguel] = useState<TipoAluguel>("RESIDENCIAL");
//   const [isFlipping, setIsFlipping] = useState(false);
//   const [showLoading, setShowLoading] = useState(true);

//   const toggleTipoAluguel = () => {
//     setIsFlipping(true);
//     setShowLoading(true);
//     setTimeout(() => {
//       setTipoAluguel((prev) => (prev === "RESIDENCIAL" ? "TURISTICO" : "RESIDENCIAL"));
//       setIsFlipping(false);
//       setTimeout(() => setShowLoading(false), 3000);
//     }, 600);
//   };

//   const { data, isLoading } = useQuery({
//     queryKey: [`dashboard-admin-${tipoAluguel}`, user?.id],
//     queryFn: async () => {
//       const year = new Date().getFullYear().toString();
//       const response = await Promise.all([
//         fetch(`/api/dashboard?tipo=total-imoveis&tipoAluguel=${tipoAluguel}&year=${year}`),
//         fetch(`/api/dashboard?tipo=total-alugados&tipoAluguel=${tipoAluguel}&year=${year}`),
//         fetch(`/api/dashboard?tipo=proximidades&tipoAluguel=${tipoAluguel}&year=${year}`),
//         fetch(`/api/dashboard?tipo=preco-por-mes&tipoAluguel=${tipoAluguel}&year=${year}`),
//         fetch(`/api/dashboard?tipo=zonas-mais-alugadas&tipoAluguel=${tipoAluguel}&year=${year}`),
//         fetch(`/api/dashboard?tipo=preco-mensal-zona&tipoAluguel=${tipoAluguel}&year=${year}`),
//       ]);

//       const [
//         totalImoveisRes,
//         totalAlugadosRes,
//         proximidadesRes,
//         precoPorMesRes,
//         zonasMaisAlugadasRes,
//         precoMensalZonaRes,
//       ] = response;

//       if (!response.every((res) => res.ok)) {
//         throw new Error("Erro ao carregar dados");
//       }

//       const [
//         totalImoveis,
//         totalAlugados,
//         proximidades,
//         precoPorMes,
//         zonasMaisAlugadas,
//         precoMensalZona,
//       ] = await Promise.all([
//         totalImoveisRes.json(),
//         totalAlugadosRes.json(),
//         proximidadesRes.json(),
//         precoPorMesRes.json(),
//         zonasMaisAlugadasRes.json(),
//         precoMensalZonaRes.json(),
//       ]);

//       return {
//         totalImoveis: totalImoveis.total || 0,
//         totalAlugados: totalAlugados.total || 0,
//         proximidades: proximidades || [],
//         precoPorMes: precoPorMes || [],
//         zonasMaisAlugadas: zonasMaisAlugadas || [],
//         precoMensalZona: precoMensalZona || [],
//         zonasPendentes: zonasMaisAlugadas.filter((z: any) => z.status === "PENDENTE") || [],
//         zonasEmAluguel: zonasMaisAlugadas.filter((z: any) => z.status === "EM_ALUGUEL") || [],
//       };
//     },
//     enabled: !!user && user.role === "ADMIN",
//   });

//   useEffect(() => {
//     setShowLoading(true);
//     const timer = setTimeout(() => setShowLoading(false), 3000);
//     return () => clearTimeout(timer);
//   }, [tipoAluguel]);

//   if (!user) return <div>Carregando usuário...</div>;
//   if (user.role !== "ADMIN") return false;

//   if (isLoading || showLoading || !data) {
//     return (
//       <div className="p-6 space-y-6">
//         <Skeleton className="h-8 w-1/4" />
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {Array.from({ length: 6 }).map((_, i) => (
//             <Skeleton key={i} className="h-32 w-full" />
//           ))}
//         </div>
//         <Skeleton className="h-64 w-full max-w-2xl mx-auto" />
//       </div>
//     );
//   }

//   // Gráfico de Proximidades Mais Procuradas
//   const proximidadesChartData = {
//     labels: data.proximidades.map((p: any) => p.tipo || "Desconhecido"),
//     datasets: [
//       {
//         label: "Número de Imóveis",
//         data: data.proximidades.map((p: any) => p.count || 0),
//         backgroundColor: "rgba(54, 162, 235, 0.6)",
//         borderColor: "rgba(54, 162, 235, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Gráfico de Variação de Preço por Mês
//   const precoPorMesChartData = {
//     labels: data.precoPorMes.map((p: any) => p.mes || "Desconhecido"),
//     datasets: [
//       {
//         label: "Preço Médio (AOA)",
//         data: data.precoPorMes.map((p: any) => p.precoMedio || 0),
//         fill: false,
//         borderColor: "rgba(75, 192, 192, 1)",
//         tension: 0.1,
//       },
//     ],
//   };

//   // Gráfico de Zonas com Mais Imóveis Alugados
//   const zonasMaisAlugadasChartData = {
//     labels: data.zonasMaisAlugadas.map((z: any) => `${z.bairro}, ${z.provincia}`),
//     datasets: [
//       {
//         label: "Número de Aluguéis",
//         data: data.zonasMaisAlugadas.map((z: any) => z.count || 0),
//         backgroundColor: "rgba(255, 206, 86, 0.6)",
//         borderColor: "rgba(255, 206, 86, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Gráfico de Preço Mensal por Zona (Residencial e Turístico)
//   const precoMensalZonaChartData = {
//     labels: data.precoMensalZona.map((z: any) => z.mes || "Desconhecido"),
//     datasets: [
//       {
//         label: "Preço Médio Residencial (AOA)",
//         data: data.precoMensalZona
//           .filter((z: any) => z.tipoAluguel === "RESIDENCIAL")
//           .map((z: any) => z.preco || 0),
//         fill: false,
//         borderColor: "rgba(75, 192, 192, 1)",
//         tension: 0.1,
//       },
//       {
//         label: "Preço Médio Turístico (AOA)",
//         data: data.precoMensalZona
//           .filter((z: any) => z.tipoAluguel === "TURISTICO")
//           .map((z: any) => z.preco || 0),
//         fill: false,
//         borderColor: "rgba(255, 99, 132, 1)",
//         tension: 0.1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" as const },
//       title: { display: true, text: "Visão Geral da Plataforma" },
//     },
//   };

//   const lineBarChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" as const },
//       title: { display: true, text: "Estatísticas por Mês" },
//     },
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">
//           Dashboard do Administrador - {tipoAluguel}
//         </h1>
//         <Button onClick={toggleTipoAluguel} className="relative">
//           Alternar para {tipoAluguel === "RESIDENCIAL" ? "Turístico" : "Residencial"}
//         </Button>
//       </div>

//       <div className="flip-container">
//         <div className={cn("flip-inner", { flip: isFlipping })}>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <Card>
//               <CardHeader className="p-4">
//                 <CardTitle>Total de Imóveis</CardTitle>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <p
//                   className={`text-2xl font-semibold ${
//                     data.totalImoveis > 0 ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {data.totalImoveis || 0}
//                 </p>
//                 <p className="text-sm text-muted-foreground">Registrados na plataforma</p>
//                 <MiniTrendChart
//                   data={generateTrendData(data.totalImoveis)}
//                   label="Total de Imóveis"
//                   isPositive={data.totalImoveis > 0}
//                 />
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="p-4">
//                 <CardTitle>Total de Imóveis Alugados</CardTitle>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <p
//                   className={`text-2xl font-semibold ${
//                     data.totalAlugados > 0 ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {data.totalAlugados || 0}
//                 </p>
//                 <p className="text-sm text-muted-foreground">Concluídos</p>
//                 <MiniTrendChart
//                   data={generateTrendData(data.totalAlugados)}
//                   label="Total de Imóveis Alugados"
//                   isPositive={data.totalAlugados > 0}
//                 />
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="p-4">
//                 <CardTitle>Proximidade Mais Procurada</CardTitle>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <p
//                   className={`text-2xl font-semibold ${
//                     data.proximidades.length > 0 ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {data.proximidades[0]?.tipo || "Nenhuma"}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   {data.proximidades[0]?.count || 0} imóveis
//                 </p>
//                 <MiniTrendChart
//                   data={generateTrendData(data.proximidades[0]?.count)}
//                   label="Proximidade Mais Procurada"
//                   isPositive={data.proximidades[0]?.count > 0}
//                 />
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="p-4">
//                 <CardTitle>Zona com Mais Imóveis Alugados</CardTitle>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <p
//                   className={`text-2xl font-semibold ${
//                     data.zonasMaisAlugadas.length > 0 ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {data.zonasMaisAlugadas[0]?.bairro
//                     ? `${data.zonasMaisAlugadas[0].bairro}, ${data.zonasMaisAlugadas[0].provincia}`
//                     : "Nenhuma"}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   {data.zonasMaisAlugadas[0]?.count || 0} aluguéis
//                 </p>
//                 <MiniTrendChart
//                   data={generateTrendData(data.zonasMaisAlugadas[0]?.count)}
//                   label="Zona com Mais Imóveis Alugados"
//                   isPositive={data.zonasMaisAlugadas[0]?.count > 0}
//                 />
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="p-4">
//                 <CardTitle>Preço Médio Mensal</CardTitle>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <p
//                   className={`text-2xl font-semibold ${
//                     data.precoPorMes.length > 0 ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {formatCurrency(data.precoPorMes[0]?.precoMedio || 0)}
//                 </p>
//                 <p className="text-sm text-muted-foreground">Este ano</p>
//                 <MiniTrendChart
//                   data={generateTrendData(data.precoPorMes[0]?.precoMedio)}
//                   label="Preço Médio Mensal"
//                   isPositive={data.precoPorMes[0]?.precoMedio > 0}
//                 />
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="p-4">
//                 <CardTitle>Zonas Pendentes</CardTitle>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <p
//                   className={`text-2xl font-semibold ${
//                     data.zonasPendentes.length > 0 ? "text-red-600" : "text-green-600"
//                   }`}
//                 >
//                   {data.zonasPendentes.length || 0}
//                 </p>
//                 <p className="text-sm text-muted-foreground">Solicitações pendentes</p>
//                 <MiniTrendChart
//                   data={generateTrendData(data.zonasPendentes.length)}
//                   label="Zonas Pendentes"
//                   isPositive={false}
//                 />
//               </CardContent>
//             </Card>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//             <Card className="w-full h-[400px]">
//               <CardHeader className="p-4">
//                 <CardTitle>Proximidades Mais Procuradas</CardTitle>
//               </CardHeader>
//               <CardContent className="h-[300px] p-4">
//                 <Bar data={proximidadesChartData} options={chartOptions} />
//               </CardContent>
//             </Card>
//             <Card className="w-full h-[400px]">
//               <CardHeader className="p-4">
//                 <CardTitle>Variação de Preço por Mês</CardTitle>
//               </CardHeader>
//               <CardContent className="h-[300px] p-4">
//                 <Line data={precoPorMesChartData} options={lineBarChartOptions} />
//               </CardContent>
//             </Card>
//             <Card className="w-full h-[400px]">
//               <CardHeader className="p-4">
//                 <CardTitle>Zonas com Mais Imóveis Alugados</CardTitle>
//               </CardHeader>
//               <CardContent className="h-[300px] p-4">
//                 <Bar data={zonasMaisAlugadasChartData} options={chartOptions} />
//               </CardContent>
//             </Card>
//             <Card className="w-full h-[400px]">
//               <CardHeader className="p-4">
//                 <CardTitle>Preço Mensal por Zona</CardTitle>
//               </CardHeader>
//               <CardContent className="h-[300px] p-4">
//                 <Line data={precoMensalZonaChartData} options={lineBarChartOptions} />
//               </CardContent>
//             </Card>
//           </div>
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

export const DashboardAdmin: React.FC = () => {
  const { user } = useUser();
  const [tipoAluguel, setTipoAluguel] = useState<TipoAluguel>("RESIDENCIAL");
  const [isFlipping, setIsFlipping] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState<string>("Todos");
  const [chartSizes, setChartSizes] = useState({
    proximidades: 400,
    precoPorMes: 400,
    zonasMaisAlugadas: 400,
    precoMensalZona: 400,
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
    queryKey: [`dashboard-admin-${tipoAluguel}-${selectedYear}-${selectedMonth}`, user?.id],
    queryFn: async () => {
      const monthParam = selectedMonth === "Todos" ? undefined : selectedMonth;
      const response = await Promise.all([
        fetch(`/api/dashboard?tipo=total-imoveis&tipoAluguel=${tipoAluguel}&year=${selectedYear}${monthParam ? `&month=${monthParam}` : ""}`),
        fetch(`/api/dashboard?tipo=total-imoveis&year=${selectedYear}${monthParam ? `&month=${monthParam}` : ""}`), // Total global
        fetch(`/api/dashboard?tipo=total-alugados&tipoAluguel=${tipoAluguel}&year=${selectedYear}${monthParam ? `&month=${monthParam}` : ""}`),
        fetch(`/api/dashboard?tipo=proximidades&tipoAluguel=${tipoAluguel}&year=${selectedYear}${monthParam ? `&month=${monthParam}` : ""}`),
        fetch(`/api/dashboard?tipo=preco-por-mes&tipoAluguel=${tipoAluguel}&year=${selectedYear}${monthParam ? `&month=${monthParam}` : ""}`),
        fetch(`/api/dashboard?tipo=zonas-mais-alugadas&tipoAluguel=${tipoAluguel}&year=${selectedYear}${monthParam ? `&month=${monthParam}` : ""}`),
        fetch(`/api/dashboard?tipo=preco-mensal-zona&tipoAluguel=${tipoAluguel}&year=${selectedYear}${monthParam ? `&month=${monthParam}` : ""}`),
      ]);

      const [
        totalImoveisRes,
        totalImoveisGlobalRes,
        totalAlugadosRes,
        proximidadesRes,
        precoPorMesRes,
        zonasMaisAlugadasRes,
        precoMensalZonaRes,
      ] = response;

      if (!response.every((res) => res.ok)) {
        throw new Error("Erro ao carregar dados");
      }

      const [
        totalImoveis,
        totalImoveisGlobal,
        totalAlugados,
        proximidades,
        precoPorMes,
        zonasMaisAlugadas,
        precoMensalZona,
      ] = await Promise.all([
        totalImoveisRes.json(),
        totalImoveisGlobalRes.json(),
        totalAlugadosRes.json(),
        proximidadesRes.json(),
        precoPorMesRes.json(),
        zonasMaisAlugadasRes.json(),
        precoMensalZonaRes.json(),
      ]);

      return {
        totalImoveis: totalImoveis.total || 0,
        totalImoveisGlobal: totalImoveisGlobal.total || 0,
        totalAlugados: totalAlugados.total || 0,
        proximidades: proximidades || [],
        precoPorMes: precoPorMes || [],
        zonasMaisAlugadas: zonasMaisAlugadas || [],
        precoMensalZona: precoMensalZona || [],
        zonasPendentes: zonasMaisAlugadas.filter((z: any) => z.status === "PENDENTE") || [],
        zonasEmAluguel: zonasMaisAlugadas.filter((z: any) => z.status === "EM_ALUGUEL") || [],
      };
    },
    enabled: !!user && user.role === "ADMIN",
  });

  useEffect(() => {
    setShowLoading(true);
    const timer = setTimeout(() => setShowLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [tipoAluguel, selectedYear, selectedMonth]);

  if (!user) return <div>Carregando usuário...</div>;
  if (user.role !== "ADMIN") return false;

  if (isLoading || showLoading || !data) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full max-w-2xl mx-auto" />
      </div>
    );
  }

  const proximidadesChartData = {
    labels: data.proximidades.map((p: any) => p.tipo || "Desconhecido"),
    datasets: [
      {
        label: "Número de Imóveis",
        data: data.proximidades.map((p: any) => p.count || 0),
        backgroundColor: data.proximidades.map((p: any) =>
          (p.count || 0) > 0 ? "rgba(75, 192, 192, 0.6)" : "rgba(255, 99, 132, 0.6)"
        ),
        borderColor: data.proximidades.map((p: any) =>
          (p.count || 0) > 0 ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)"
        ),
        borderWidth: 1,
      },
    ],
  };

  const precoPorMesChartData = {
    labels: data.precoPorMes.map((p: any) => p.mes || "Desconhecido"),
    datasets: [
      {
        label: "Preço Médio (AOA)",
        data: data.precoPorMes.map((p: any) => p.precoMedio || 0),
        fill: false,
        borderColor: data.precoPorMes.some((p: any) => (p.precoMedio || 0) < 0)
          ? "rgba(255, 99, 132, 1)"
          : "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const zonasMaisAlugadasChartData = {
    labels: data.zonasMaisAlugadas.map((z: any) => `${z.bairro}, ${z.provincia}`),
    datasets: [
      {
        label: "Número de Aluguéis",
        data: data.zonasMaisAlugadas.map((z: any) => z.count || 0),
        backgroundColor: data.zonasMaisAlugadas.map((z: any) =>
          (z.count || 0) > 0 ? "rgba(75, 192, 192, 0.6)" : "rgba(255, 99, 132, 0.6)"
        ),
        borderColor: data.zonasMaisAlugadas.map((z: any) =>
          (z.count || 0) > 0 ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)"
        ),
        borderWidth: 1,
      },
    ],
  };

  const precoMensalZonaChartData = {
    labels: data.precoMensalZona.map((z: any) => z.mes || "Desconhecido"),
    datasets: [
      {
        label: "Preço Médio Residencial (AOA)",
        data: data.precoMensalZona
          .filter((z: any) => z.tipoAluguel === "RESIDENCIAL")
          .map((z: any) => z.preco || 0),
        fill: false,
        borderColor: data.precoMensalZona.some((z: any) => (z.preco || 0) < 0)
          ? "rgba(255, 99, 132, 1)"
          : "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
      {
        label: "Preço Médio Turístico (AOA)",
        data: data.precoMensalZona
          .filter((z: any) => z.tipoAluguel === "TURISTICO")
          .map((z: any) => z.preco || 0),
        fill: false,
        borderColor: data.precoMensalZona.some((z: any) => (z.preco || 0) < 0)
          ? "rgba(255, 99, 132, 1)"
          : "rgba(255, 99, 132, 1)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Visão Geral da Plataforma" },
    },
  };

  const lineBarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Estatísticas por Mês" },
    },
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Dashboard do Administrador - {tipoAluguel}
        </h1>
        <Button onClick={toggleTipoAluguel} className="relative">
          Alternar para {tipoAluguel === "RESIDENCIAL" ? "Turístico" : "Residencial"}
        </Button>
      </div>

      <div className="flip-container">
        <div className={cn("flip-inner", { flip: isFlipping })}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Total de Imóveis</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p
                  className={`text-2xl font-semibold ${
                    data.totalImoveis >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {data.totalImoveis} ({data.totalImoveisGlobal})
                </p>
                <p className="text-sm text-muted-foreground">Registrados na plataforma</p>
                <MiniTrendChart
                  data={generateTrendData(data.totalImoveis)}
                  label="Total de Imóveis"
                  isPositive={data.totalImoveis >= 0}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Total de Imóveis Alugados</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p
                  className={`text-2xl font-semibold ${
                    data.totalAlugados >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {data.totalAlugados || 0}
                </p>
                <p className="text-sm text-muted-foreground">Concluídos</p>
                <MiniTrendChart
                  data={generateTrendData(data.totalAlugados)}
                  label="Total de Imóveis Alugados"
                  isPositive={data.totalAlugados >= 0}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Proximidade Mais Procurada</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p
                  className={`text-2xl font-semibold ${
                    data.proximidades.length > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {data.proximidades[0]?.tipo || "Nenhuma"}
                </p>
                <p
                  className={`text-sm ${
                    (data.proximidades[0]?.count || 0) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {data.proximidades[0]?.count || 0} imóveis
                </p>
                <MiniTrendChart
                  data={generateTrendData(data.proximidades[0]?.count)}
                  label="Proximidade Mais Procurada"
                  isPositive={(data.proximidades[0]?.count || 0) >= 0}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Zona com Mais Imóveis Alugados</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p
                  className={`text-2xl font-semibold ${
                    data.zonasMaisAlugadas.length > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {data.zonasMaisAlugadas[0]?.bairro
                    ? `${data.zonasMaisAlugadas[0].bairro}, ${data.zonasMaisAlugadas[0].provincia}`
                    : "Nenhuma"}
                </p>
                <p
                  className={`text-sm ${
                    (data.zonasMaisAlugadas[0]?.count || 0) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {data.zonasMaisAlugadas[0]?.count || 0} aluguéis
                </p>
                <MiniTrendChart
                  data={generateTrendData(data.zonasMaisAlugadas[0]?.count)}
                  label="Zona com Mais Imóveis Alugados"
                  isPositive={(data.zonasMaisAlugadas[0]?.count || 0) >= 0}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Preço Médio Mensal</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p
                  className={`text-2xl font-semibold ${
                    (data.precoPorMes[0]?.precoMedio || 0) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formatCurrency(data.precoPorMes[0]?.precoMedio || 0)}
                </p>
                <p className="text-sm text-muted-foreground">Este ano</p>
                <MiniTrendChart
                  data={generateTrendData(data.precoPorMes[0]?.precoMedio)}
                  label="Preço Médio Mensal"
                  isPositive={(data.precoPorMes[0]?.precoMedio || 0) >= 0}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Zonas Pendentes</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p
                  className={`text-2xl font-semibold ${
                    data.zonasPendentes.length > 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {data.zonasPendentes.length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Solicitações pendentes</p>
                <MiniTrendChart
                  data={generateTrendData(data.zonasPendentes.length)}
                  label="Zonas Pendentes"
                  isPositive={false}
                />
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="w-full" style={{ height: `${chartSizes.proximidades}px` }}>
              <CardHeader className="p-4 flex justify-between items-center">
                <CardTitle>Proximidades Mais Procuradas</CardTitle>
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
                    onClick={() => toggleChartSize("proximidades")}
                  >
                    {chartSizes.proximidades === 400 ? (
                      <Maximize2 className="h-4 w-4" />
                    ) : (
                      <Minimize2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-[calc(100%-4rem)] p-4">
                <Bar data={proximidadesChartData} options={chartOptions} />
              </CardContent>
            </Card>
            <Card className="w-full" style={{ height: `${chartSizes.precoPorMes}px` }}>
              <CardHeader className="p-4 flex justify-between items-center">
                <CardTitle>Variação de Preço por Mês</CardTitle>
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
                    onClick={() => toggleChartSize("precoPorMes")}
                  >
                    {chartSizes.precoPorMes === 400 ? (
                      <Maximize2 className="h-4 w-4" />
                    ) : (
                      <Minimize2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-[calc(100%-4rem)] p-4">
                <Line data={precoPorMesChartData} options={lineBarChartOptions} />
              </CardContent>
            </Card>
            <Card className="w-full" style={{ height: `${chartSizes.zonasMaisAlugadas}px` }}>
              <CardHeader className="p-4 flex justify-between items-center">
                <CardTitle>Zonas com Mais Imóveis Alugados</CardTitle>
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
                    onClick={() => toggleChartSize("zonasMaisAlugadas")}
                  >
                    {chartSizes.zonasMaisAlugadas === 400 ? (
                      <Maximize2 className="h-4 w-4" />
                    ) : (
                      <Minimize2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-[calc(100%-4rem)] p-4">
                <Bar data={zonasMaisAlugadasChartData} options={chartOptions} />
              </CardContent>
            </Card>
            <Card className="w-full" style={{ height: `${chartSizes.precoMensalZona}px` }}>
              <CardHeader className="p-4 flex justify-between items-center">
                <CardTitle>Preço Mensal por Zona</CardTitle>
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
                    onClick={() => toggleChartSize("precoMensalZona")}
                  >
                    {chartSizes.precoMensalZona === 400 ? (
                      <Maximize2 className="h-4 w-4" />
                    ) : (
                      <Minimize2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-[calc(100%-4rem)] p-4">
                <Line data={precoMensalZonaChartData} options={lineBarChartOptions} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};