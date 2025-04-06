// "use client";
// import { useQuery } from "@tanstack/react-query";
// import { Bar, Line } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useUser } from "@/hooks/getUser";

// ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

// const formatCurrency = (value: number | undefined | null) => {
//   if (value === undefined || value === null) return "AOA 0";
//   return `${value.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}`;
// };

// export const DashboardProprietarioResidencial: React.FC = () => {
//   const { user } = useUser();

//   const { data, isLoading } = useQuery({
//     queryKey: ["dashboard-proprietario-residencial", user?.id],
//     queryFn: () => fetch("/api/dashboard/proprietario?tipoAluguel=RESIDENCIAL").then(res => res.json()),
//     enabled: !!user && user.role === "PROPRIETARIO",
//   });

//     const barChartData = {
//     labels: ["Taxa de Ocupação", "Comparação com Média"],
//     datasets: [
//       {
//         label: "Percentual (%)",
//         data: [data.taxaOcupacao, data.comparacaoMedia],
//         backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
//         borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
//         borderWidth: 1,
//       },
//     ],
//   };

//     const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false, // Impede o redimensionamento automático
//     plugins: {
//       legend: { position: "top" as const },
//       title: { display: true, text: "Desempenho dos Seus Imóveis" },
//     },
//   };


//     const lineChartData = {
//     labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"], // Simulação de meses
//     datasets: [
//       {
//         label: "Receita Mensal (AOA)",
//         data: [50000, 60000, 45000, 70000, 80000, data.receitaTotal], // Exemplo + dado real
//         fill: false,
//         borderColor: "rgba(75, 192, 192, 1)",
//         tension: 0.1,
//       },
//     ],
//   };


//     const lineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" as const },
//       title: { display: true, text: "Receita ao Longo do Tempo" },
//     },
//   };

//   // Restante do código igual ao DashboardProprietario original, mas com título ajustado
//   if (!user) return <div>Carregando usuário...</div>;
//   if (user.role !== "PROPRIETARIO") return <div>Acesso negado. Apenas proprietários podem ver este dashboard.</div>;

//   if (isLoading) {
//     return (
//       <div className="p-4 space-y-6">
//         <Skeleton className="h-8 w-1/4" />
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {Array.from({ length: 7 }).map((_, i) => (
//             <Skeleton key={i} className="h-32 w-full" />
//           ))}
//         </div>
//         <Skeleton className="h-64 w-full max-w-2xl mx-auto" />
//       </div>
//     );
//   }

//   // Gráficos e Cards permanecem os mesmos, apenas ajustando o título
//   return (
//     <div className="p-4 space-y-6">
//       <h1 className="text-2xl font-bold">Dashboard do Proprietário - RESIDENCIAL</h1>
//       {/* Cards e gráficos como no original */}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Taxa de Ocupação</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">{data.taxaOcupacao}%</p>
//             <p className="text-sm text-muted-foreground">Este mês</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Receita Total</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">{formatCurrency(data.receitaTotal)}</p>
//             <p className="text-sm text-muted-foreground">Últimos 30 dias</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Aluguéis Concluídos</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">{data.alugueisConcluidos}</p>
//             <p className="text-sm text-muted-foreground">Este mês</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Tempo Médio de Reserva</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">{data.tempoMedioReserva} dias</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Imóvel Mais Popular</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">
//               {data.imovelMaisPopular ? `${data.imovelMaisPopular.titulo}` : "Nenhum"}
//             </p>
//             <p className="text-sm text-muted-foreground">
//               {data.imovelMaisPopular ? `${data.imovelMaisPopular.reservas} reservas` : ""}
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Comparação com Média</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">{data.comparacaoMedia}%</p>
//             <p className="text-sm text-muted-foreground">Acima/Abaixo da média</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Pendências</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">{data.pendencias}</p>
//             <p className="text-sm text-muted-foreground">Solicitações pendentes</p>
//           </CardContent>
//         </Card>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Card className="w-full h-[400px]">
//           <CardHeader>
//             <CardTitle>Desempenho</CardTitle>
//           </CardHeader>
//           <CardContent className="h-[300px]">
//             <Bar data={barChartData} options={chartOptions} />
//           </CardContent>
//         </Card>
//         <Card className="w-full h-[400px]">
//           <CardHeader>
//             <CardTitle>Receita ao Longo do Tempo</CardTitle>
//           </CardHeader>
//           <CardContent className="h-[300px]">
//             <Line data={lineChartData} options={lineChartOptions} />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };











"use client";
import { useQuery } from "@tanstack/react-query";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/getUser";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const formatCurrency = (value: number | undefined | null) => {
  if (value === undefined || value === null) return "AOA 0";
  return `${value.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}`;
};

export const DashboardProprietarioResidencial: React.FC = () => {
  const { user } = useUser();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-proprietario-residencial", user?.id],
    queryFn: () => fetch("/api/dashboard/proprietario?tipoAluguel=RESIDENCIAL").then(res => res.json()),
    enabled: !!user && user.role === "PROPRIETARIO",
  });

  if (!user) return <div>Carregando usuário...</div>;
  if (user.role !== "PROPRIETARIO") return <div>Acesso negado. Apenas proprietários podem ver este dashboard.</div>;

  if (isLoading || !data) {
    return (
      <div className="p-4 space-y-6">
        <Skeleton className="h-8 w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full max-w-2xl mx-auto" />
      </div>
    );
  }

  const barChartData = {
    labels: ["Taxa de Ocupação", "Comparação com Média"],
    datasets: [
      {
        label: "Percentual (%)",
        data: [data.taxaOcupacao ?? 0, data.comparacaoMedia ?? 0], // Valores padrão
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"], // Simulação de meses
    datasets: [
      {
        label: "Receita Mensal (AOA)",
        data: [50000, 60000, 45000, 70000, 80000, data.receitaTotal ?? 0], // Valor padrão
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Desempenho dos Seus Imóveis" },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Receita ao Longo do Tempo" },
    },
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard do Proprietário - Residencial</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Ocupação</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data.taxaOcupacao ?? 0}%</p>
            <p className="text-sm text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{formatCurrency(data.receitaTotal)}</p>
            <p className="text-sm text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Aluguéis Concluídos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data.alugueisConcluidos ?? 0}</p>
            <p className="text-sm text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tempo Médio de Reserva</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data.tempoMedioReserva ?? 0} dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Imóvel Mais Popular</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {data.imovelMaisPopular ? `${data.imovelMaisPopular.titulo}` : "Nenhum"}
            </p>
            <p className="text-sm text-muted-foreground">
              {data.imovelMaisPopular ? `${data.imovelMaisPopular.reservas ?? 0} reservas` : ""}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Comparação com Média</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data.comparacaoMedia ?? 0}%</p>
            <p className="text-sm text-muted-foreground">Acima/Abaixo da média</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pendências</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data.pendencias ?? 0}</p>
            <p className="text-sm text-muted-foreground">Solicitações pendentes</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="w-full h-[400px]">
          <CardHeader>
            <CardTitle>Desempenho</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Bar data={barChartData} options={chartOptions} />
          </CardContent>
        </Card>
        <Card className="w-full h-[400px]">
          <CardHeader>
            <CardTitle>Receita ao Longo do Tempo</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Line data={lineChartData} options={lineChartOptions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};