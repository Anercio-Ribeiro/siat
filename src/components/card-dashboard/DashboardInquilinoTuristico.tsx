
// "use client";
// import { useQuery } from "@tanstack/react-query";
// import { Pie, Bar } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useUser } from "@/hooks/getUser";

// ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const formatCurrency = (value: number | undefined | null) => {
//   if (value === undefined || value === null) return "AOA 0";
//   return `${value.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}`;
// };

// export const DashboardInquilinoTuristico: React.FC = () => {
//   const { user } = useUser();

//   const { data, isLoading } = useQuery({
//     queryKey: ["dashboard-inquilino-turistico", user?.id],
//     queryFn: () => fetch("/api/dashboard/inquilino?tipoAluguel=TURISTICO").then(res => res.json()),
//     enabled: !!user && user.role === "INQUILINO",
//   });

//   const pieChartData = {
//     labels: ["Imóveis Disponíveis", "Taxa de Ocupação"],
//     datasets: [
//       {
//         data: [data.totalImoveis, data.taxaMediaOcupacao],
//         backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"],
//         borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const barChartData = {
//     labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"], // Simulação de meses
//     datasets: [
//       {
//         label: "Gastos Mensais (AOA)",
//         data: [10000, 15000, 12000, 18000, 20000, data.gastoTotal / 6], // Exemplo + dado real
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
//       title: { display: true, text: "Visão Geral da Plataforma" },
//     },
//   };

//   const barChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" as const },
//       title: { display: true, text: "Gastos por Mês" },
//     },
//   };

//   // Restante igual ao DashboardInquilino original, ajustando o título
//   if (!user) return <div>Carregando usuário...</div>;
//   if (user.role !== "INQUILINO") return <div>Acesso negado. Apenas inquilinos podem ver este dashboard.</div>;

//   return (
//     <div className="p-4 space-y-6">
//       <h1 className="text-2xl font-bold">Dashboard do Inquilino - Turístico</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Imóveis Disponíveis</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">{data.totalImoveis}</p>
//             <p className="text-sm text-muted-foreground">Na plataforma</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Taxa Média de Ocupação</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">{data.taxaMediaOcupacao}%</p>
//             <p className="text-sm text-muted-foreground">Este mês</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Preço Médio</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">{formatCurrency(data.precoMedio)}</p>
//             <p className="text-sm text-muted-foreground">Por noite/mês</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Crescimento da Plataforma</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">{data.crescimentoPlataforma}</p>
//             <p className="text-sm text-muted-foreground">Novos imóveis em 30 dias</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Atividade Recente</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">{data.atividadeRecente}</p>
//             <p className="text-sm text-muted-foreground">Aluguéis na última semana</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Seus Aluguéis</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">{data.numeroAlugueis}</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Gasto Total</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">{formatCurrency(data.gastoTotal)}</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Duração Média</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">{data.duracaoMedia.toFixed(1)} dias</p>
//           </CardContent>
//         </Card>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Card className="w-full h-[400px]">
//           <CardHeader>
//             <CardTitle>Visão Geral</CardTitle>
//           </CardHeader>
//           <CardContent className="h-[300px]">
//             <Pie data={pieChartData} options={chartOptions} />
//           </CardContent>
//         </Card>
//         <Card className="w-full h-[400px]">
//           <CardHeader>
//             <CardTitle>Gastos por Mês</CardTitle>
//           </CardHeader>
//           <CardContent className="h-[300px]">
//             <Bar data={barChartData} options={barChartOptions} />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };









"use client";
import { useQuery } from "@tanstack/react-query";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/getUser";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const formatCurrency = (value: number | undefined | null) => {
  if (value === undefined || value === null) return "AOA 0";
  return `${value.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}`;
};

export const DashboardInquilinoTuristico: React.FC = () => {
  const { user } = useUser();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-inquilino-turistico", user?.id],
    queryFn: () => fetch("/api/dashboard/inquilino?tipoAluguel=TURISTICO").then(res => res.json()),
    enabled: !!user && user.role === "INQUILINO",
  });

  if (!user) return <div>Carregando usuário...</div>;
  if (user.role !== "INQUILINO") return <div>Acesso negado. Apenas inquilinos podem ver este dashboard.</div>;

  if (isLoading || !data) {
    return (
      <div className="p-4 space-y-6">
        <Skeleton className="h-8 w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full max-w-md mx-auto" />
      </div>
    );
  }

  const pieChartData = {
    labels: ["Imóveis Disponíveis", "Taxa de Ocupação"],
    datasets: [
      {
        data: [data.totalImoveis ?? 0, data.taxaMediaOcupacao ?? 0], // Valores padrão
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"], // Simulação de meses
    datasets: [
      {
        label: "Gastos Mensais (AOA)",
        data: [10000, 15000, 12000, 18000, 20000, (data.gastoTotal ?? 0) / 6], // Valor padrão
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
      title: { display: true, text: "Visão Geral da Plataforma" },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Gastos por Mês" },
    },
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard do Inquilino - Turístico</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Imóveis Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data.totalImoveis ?? 0}</p>
            <p className="text-sm text-muted-foreground">Na plataforma</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Taxa Média de Ocupação</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data.taxaMediaOcupacao ?? 0}%</p>
            <p className="text-sm text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preço Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{formatCurrency(data.precoMedio)}</p>
            <p className="text-sm text-muted-foreground">Por noite/mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Crescimento da Plataforma</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data.crescimentoPlataforma ?? 0}</p>
            <p className="text-sm text-muted-foreground">Novos imóveis em 30 dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data.atividadeRecente ?? 0}</p>
            <p className="text-sm text-muted-foreground">Aluguéis na última semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Seus Aluguéis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data.numeroAlugueis ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gasto Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{formatCurrency(data.gastoTotal)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Duração Média</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{(data.duracaoMedia ?? 0).toFixed(1)} dias</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="w-full h-[400px]">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Pie data={pieChartData} options={chartOptions} />
          </CardContent>
        </Card>
        <Card className="w-full h-[400px]">
          <CardHeader>
            <CardTitle>Gastos por Mês</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Bar data={barChartData} options={barChartOptions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};