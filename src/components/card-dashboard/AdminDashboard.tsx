"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/hooks/getUser";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type AdminDashboardData = {
  precoZona: { zona: string; precoMin: number; precoMax: number; precoMedio: number }[];
  proximidades: { tipo: string; count: number }[];
  alugueisPorMes: { mes: string; count: number }[];
  zonasPopulares: { zona: string; count: number }[];
};

export const AdminDashboard: React.FC = () => {
  const { user } = useUser();
  const [data, setData] = useState<AdminDashboardData>({
    precoZona: [],
    proximidades: [],
    alugueisPorMes: [],
    zonasPopulares: [],
  });
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState<string>("2025");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [precoZona, proximidades, alugueisPorMes, zonasPopulares] = await Promise.all([
          fetch(`/api/dashboard?tipo=preco-por-zona&year=${year}`).then(res => res.json()),
          fetch(`/api/dashboard?tipo=proximidades&year=${year}`).then(res => res.json()),
          fetch(`/api/dashboard?tipo=alugueis-por-mes&year=${year}`).then(res => res.json()),
          fetch(`/api/dashboard?tipo=zonas-populares&year=${year}`).then(res => res.json()),
        ]);
        setData({ precoZona, proximidades, alugueisPorMes, zonasPopulares });
      } catch (error) {
        console.error("Erro ao buscar dados do admin:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [year]);

  if (!user) return <div>Carregando usuário...</div>;
  if (user.role !== "ADMIN") return <div>Acesso negado. Apenas administradores podem ver este dashboard.</div>;

  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" as const } },
  };

  const years = Array.from({ length: 10 }, (_, i) => (2025 - i).toString());

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard do Administrador</h1>
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
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[400px] w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="w-full h-[400px]">
            <CardHeader>
              <CardTitle>Preço por Zona</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Bar
                data={{
                  labels: data.precoZona.map(p => p.zona),
                  datasets: [
                    { label: "Preço Mínimo (AOA)", data: data.precoZona.map(p => p.precoMin), backgroundColor: colors[0] },
                    { label: "Preço Máximo (AOA)", data: data.precoZona.map(p => p.precoMax), backgroundColor: colors[1] },
                    { label: "Preço Médio (AOA)", data: data.precoZona.map(p => p.precoMedio), backgroundColor: colors[2] },
                  ],
                }}
                options={chartOptions}
              />
            </CardContent>
          </Card>
          <Card className="w-full h-[400px]">
            <CardHeader>
              <CardTitle>Proximidades Mais Procuradas</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Pie
                data={{
                  labels: data.proximidades.map(p => p.tipo),
                  datasets: [{ data: data.proximidades.map(p => p.count), backgroundColor: colors }],
                }}
                options={chartOptions}
              />
            </CardContent>
          </Card>
          <Card className="w-full h-[400px]">
            <CardHeader>
              <CardTitle>Aluguéis por Mês</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Bar
                data={{
                  labels: data.alugueisPorMes.map(p => p.mes),
                  datasets: [{ label: "Número de Aluguéis", data: data.alugueisPorMes.map(p => p.count), backgroundColor: colors[3] }],
                }}
                options={chartOptions}
              />
            </CardContent>
          </Card>
          <Card className="w-full h-[400px]">
            <CardHeader>
              <CardTitle>Zonas Mais Populares</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <Bar
                data={{
                  labels: data.zonasPopulares.map(p => p.zona),
                  datasets: [{ label: "Número de Aluguéis", data: data.zonasPopulares.map(p => p.count), backgroundColor: colors[4] }],
                }}
                options={chartOptions}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};