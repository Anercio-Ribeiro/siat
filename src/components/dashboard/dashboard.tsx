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

// ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// export default function EstatisticasDashboard() {
//   const [precoZona, setPrecoZona] = useState<any[]>([]);
//   const [proximidades, setProximidades] = useState<any[]>([]);
//   const [precoPorMes, setPrecoPorMes] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const precoZonaRes = await fetch("/api/dashboard?tipo=preco-por-zona");
//         if (!precoZonaRes.ok) throw new Error("Erro ao carregar preco-por-zona");
//         const precoZonaData = await precoZonaRes.json();
//         setPrecoZona(precoZonaData);

//         const proxRes = await fetch("/api/dashboard?tipo=proximidades");
//         if (!proxRes.ok) throw new Error("Erro ao carregar proximidades");
//         const proxData = await proxRes.json();
//         setProximidades(proxData);

//         const precoMesRes = await fetch("/api/dashboard?tipo=preco-por-mes");
//         if (!precoMesRes.ok) throw new Error("Erro ao carregar preco-por-mes");
//         const precoMesData = await precoMesRes.json();
//         setPrecoPorMes(precoMesData);
//       } catch (error) {
//         console.error("Erro ao buscar dados:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const pieData = {
//     labels: proximidades.map((p) => p.tipo),
//     datasets: [
//       {
//         data: proximidades.map((p) => p.count),
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
//       },
//     ],
//   };

//   const barPrecoZonaData = {
//     labels: precoZona.map((p) => p.zona),
//     datasets: [
//       {
//         label: "Preço Médio (Mensal)",
//         data: precoZona.map((p) => p.precoMedio),
//         backgroundColor: "#36A2EB",
//       },
//     ],
//   };

//   const barPrecoMesData = {
//     labels: precoPorMes.map((p) => p.mes),
//     datasets: [
//       {
//         label: "Preço Médio por Mês",
//         data: precoPorMes.map((p) => p.precoMedio),
//         backgroundColor: "#FF6384",
//       },
//     ],
//   };

//   const chartOptions = {
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" as const },
//     },
//   };

//   return (
//     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Preço Médio por Zona</CardTitle>
//         </CardHeader>
//         <CardContent className="h-[400px]">
//           {precoZona.length > 0 ? (
//             <Bar data={barPrecoZonaData} options={chartOptions} />
//           ) : (
//             <p>Carregando...</p>
//           )}
//         </CardContent>
//       </Card>

//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Proximidades Mais Procuradas</CardTitle>
//         </CardHeader>
//         <CardContent className="h-[400px]">
//           {proximidades.length > 0 ? (
//             <Pie data={pieData} options={chartOptions} />
//           ) : (
//             <p>Carregando...</p>
//           )}
//         </CardContent>
//       </Card>

//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Variação de Preço por Mês</CardTitle>
//         </CardHeader>
//         <CardContent className="h-[400px]">
//           {precoPorMes.length > 0 ? (
//             <Bar data={barPrecoMesData} options={chartOptions} />
//           ) : (
//             <p>Carregando...</p>
//           )}
//         </CardContent>
//       </Card>
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

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function EstatisticasDashboard() {
  const [precoZona, setPrecoZona] = useState<any[]>([]);
  const [proximidades, setProximidades] = useState<any[]>([]);
  const [precoPorMes, setPrecoPorMes] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const precoZonaRes = await fetch("/api/dashboard?tipo=preco-por-zona");
        if (!precoZonaRes.ok) throw new Error("Erro ao carregar preco-por-zona");
        const precoZonaData = await precoZonaRes.json();
        setPrecoZona(precoZonaData);

        const proxRes = await fetch("/api/dashboard?tipo=proximidades");
        if (!proxRes.ok) throw new Error("Erro ao carregar proximidades");
        const proxData = await proxRes.json();
        setProximidades(proxData);

        const precoMesRes = await fetch("/api/dashboard?tipo=preco-por-mes");
        if (!precoMesRes.ok) throw new Error("Erro ao carregar preco-por-mes");
        const precoMesData = await precoMesRes.json();
        setPrecoPorMes(precoMesData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  const pieData = {
    labels: proximidades.map((p) => p.tipo),
    datasets: [
      {
        data: proximidades.map((p) => p.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const barPrecoZonaData = {
    labels: precoZona.map((p) => p.zona),
    datasets: [
      {
        label: "Preço Médio (Mensal)",
        data: precoZona.map((p) => p.precoMedio),
        backgroundColor: precoZona.map((_, index) => [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Teal
          "#9966FF", // Purple
          "#FF9F40", // Orange
          "#C9CBCF", // Gray
        ][index % 7]), // Cycle through 7 colors
      },
    ],
  };

  const barPrecoMesData = {
    labels: precoPorMes.map((p) => p.mes),
    datasets: [
      {
        label: "Preço Médio por Mês",
        data: precoPorMes.map((p) => p.precoMedio),
        backgroundColor: "#FF6384",
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
    },
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Preço Médio por Zona</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          {precoZona.length > 0 ? (
            <Bar data={barPrecoZonaData} options={chartOptions} />
          ) : (
            <p>Carregando...</p>
          )}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Proximidades Mais Procuradas</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          {proximidades.length > 0 ? (
            <Pie data={pieData} options={chartOptions} />
          ) : (
            <p>Carregando...</p>
          )}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Variação de Preço por Mês</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          {precoPorMes.length > 0 ? (
            <Bar data={barPrecoMesData} options={chartOptions} />
          ) : (
            <p>Carregando...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}