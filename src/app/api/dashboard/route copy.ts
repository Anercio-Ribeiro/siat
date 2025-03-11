// import { DashboardService } from '@/app/services/dashboardService';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     const dashboardService = new DashboardService();
//     const stats = await dashboardService.getDashboardStats();
//     return NextResponse.json(stats);
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Erro ao carregar estatísticas do dashboard' },
//       { status: 500 }
//     );
//   }
// }




import { estatisticasService } from "@/app/services/dashboardService";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { tipo } = req.query;

  switch (tipo) {
    case "preco-por-zona":
      const precoZona = await estatisticasService.getPrecoPorZona();
      return NextResponse.json(precoZona);
    case "imoveis-por-preco-tempo":
      const imoveisPrecoTempo = await estatisticasService.getImoveisPorPrecoETempo();
      return NextResponse.json(imoveisPrecoTempo);
    case "proximidades":
      const proximidades = await estatisticasService.getProximidadesMaisProcuradas();
      return NextResponse.json(proximidades);
    default:
      return NextResponse.json({ error: "Tipo de estatística inválido" });
  }
}