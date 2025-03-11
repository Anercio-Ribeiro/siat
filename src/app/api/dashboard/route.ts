import { estatisticasService } from "@/app/services/dashboardService";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const tipo = req.nextUrl.searchParams.get("tipo");

  if (!tipo) {
    return NextResponse.json({ error: "Parâmetro 'tipo' é obrigatório" }, { status: 400 });
  }

  try {
    switch (tipo) {
      case "preco-por-zona":
        const precoZona = await estatisticasService.getPrecoPorZona();
        return NextResponse.json(precoZona, { status: 200 });

      case "proximidades":
        const proximidades = await estatisticasService.getProximidadesMaisProcuradas();
        return NextResponse.json(proximidades, { status: 200 });

      case "preco-por-mes":
        const precoPorMes = await estatisticasService.getPrecoPorMes();
        return NextResponse.json(precoPorMes, { status: 200 });

      default:
        return NextResponse.json({ error: "Tipo de estatística inválido" }, { status: 400 });
    }
  } catch (error) {
    console.error(`Erro ao processar ${tipo}:`, error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}