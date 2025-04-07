// import { estatisticasService } from "@/app/services/dashboardService";
// import { NextRequest, NextResponse } from "next/server";


// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const tipo = searchParams.get("tipo");
//   const year = searchParams.get("year");
//   const provincia = searchParams.get("provincia");
//   const bairro = searchParams.get("bairro");
//   const tipoAluguel = searchParams.get("tipoAluguel");

//   try {
//     switch (tipo) {
//       case "preco-por-zona":
//         const precoZona = await estatisticasService.getPrecoPorZona(year ?? undefined, tipoAluguel ?? undefined);
//         return NextResponse.json(precoZona);
//       case "proximidades":
//         const proximidades = await estatisticasService.getProximidades(year ?? undefined, tipoAluguel ?? undefined);
//         return NextResponse.json(proximidades);
//       case "preco-por-mes":
//         const precoPorMes = await estatisticasService.getPrecoPorMes(year ?? undefined, tipoAluguel ?? undefined);
//         return NextResponse.json(precoPorMes);
//       case "preco-mensal-zona":
//         const precoMensalZona = await estatisticasService.getPrecoMensalPorZona(year ?? undefined, tipoAluguel ?? undefined);
//         return NextResponse.json(precoMensalZona);
//       default:
//         return NextResponse.json({ error: "Tipo de dashboard inválido" }, { status: 400 });
//     }
//   } catch (error) {
//     console.error("Erro ao buscar dados do dashboard:", error);
//     return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
//   }
// }





import { estatisticasService } from "@/app/services/dashboardService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tipo = searchParams.get("tipo");
  const year = searchParams.get("year");
  const provincia = searchParams.get("provincia");
  const bairro = searchParams.get("bairro");
  const tipoAluguel = searchParams.get("tipoAluguel");
  const month = searchParams.get("month");

  try {
    switch (tipo) {
      case "preco-por-zona":
        const precoZona = await estatisticasService.getPrecoPorZona(year ?? undefined, tipoAluguel ?? undefined, month ?? undefined);
        return NextResponse.json(precoZona);
      case "proximidades":
        const proximidades = await estatisticasService.getProximidades(year ?? undefined, tipoAluguel ?? undefined, month ?? undefined);
        return NextResponse.json(proximidades);
      case "preco-por-mes":
        const precoPorMes = await estatisticasService.getPrecoPorMes(year ?? undefined, tipoAluguel ?? undefined, month ?? undefined);
        return NextResponse.json(precoPorMes);
      case "preco-mensal-zona":
        const precoMensalZona = await estatisticasService.getPrecoMensalPorZona(year ?? undefined, tipoAluguel ?? undefined, provincia ?? undefined, bairro ?? undefined, month ?? undefined);
        return NextResponse.json(precoMensalZona);
      case "total-imoveis":
        const totalImoveis = await estatisticasService.getTotalImoveis(year ?? undefined, tipoAluguel ?? undefined, month ?? undefined);
        return NextResponse.json(totalImoveis);
      case "total-alugados":
        const totalAlugados = await estatisticasService.getTotalAlugados(year ?? undefined, tipoAluguel ?? undefined, month ?? undefined);
        return NextResponse.json(totalAlugados);
      case "zonas-mais-alugadas":
        const zonasMaisAlugadas = await estatisticasService.getZonasMaisAlugadas(year ?? undefined, tipoAluguel ?? undefined, month ?? undefined);
        return NextResponse.json(zonasMaisAlugadas);
      default:
        return NextResponse.json({ error: "Tipo de dashboard inválido" }, { status: 400 });
    }
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}