// import { estatisticasService } from "@/app/services/dashboardService";
// import { NextRequest, NextResponse } from "next/server";


// export async function GET(req: NextRequest) {
//   const tipo = req.nextUrl.searchParams.get("tipo");

//   if (!tipo) {
//     return NextResponse.json({ error: "Parâmetro 'tipo' é obrigatório" }, { status: 400 });
//   }

//   try {
//     switch (tipo) {
//       case "preco-por-zona":
//         const precoZona = await estatisticasService.getPrecoPorZona();
//         return NextResponse.json(precoZona, { status: 200 });

//       case "proximidades":
//         const proximidades = await estatisticasService.getProximidadesMaisProcuradas();
//         return NextResponse.json(proximidades, { status: 200 });

//       case "preco-por-mes":
//         const precoPorMes = await estatisticasService.getPrecoPorMes();
//         return NextResponse.json(precoPorMes, { status: 200 });

//       default:
//         return NextResponse.json({ error: "Tipo de estatística inválido" }, { status: 400 });
//     }
//   } catch (error) {
//     console.error(`Erro ao processar ${tipo}:`, error);
//     return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
//   }
// }





// import { NextRequest, NextResponse } from "next/server";
// import { estatisticasService } from "@/app/services/dashboardService";

// export async function GET(req: NextRequest) {
//   const tipo = req.nextUrl.searchParams.get("tipo");
//   const year = req.nextUrl.searchParams.get("year");
//   const provincia = req.nextUrl.searchParams.get("provincia");
//   const bairro = req.nextUrl.searchParams.get("bairro");

//   if (!tipo) {
//     return NextResponse.json({ error: "Parâmetro 'tipo' é obrigatório" }, { status: 400 });
//   }

//   try {
//     switch (tipo) {
//       case "preco-por-zona":
//         const precoZona = await estatisticasService.getPrecoPorZona();
//         return NextResponse.json(precoZona, { status: 200 });

//       case "proximidades":
//         const proximidades = await estatisticasService.getProximidadesMaisProcuradas();
//         return NextResponse.json(proximidades, { status: 200 });

//       case "preco-por-mes":
//         const precoPorMes = await estatisticasService.getPrecoPorMes();
//         return NextResponse.json(precoPorMes, { status: 200 });

//       case "preco-mensal-zona":
//         const precoMensalZona = await estatisticasService.getPrecoMensalPorZona(provincia || undefined, bairro || undefined);
//         return NextResponse.json(precoMensalZona, { status: 200 });

//       default:
//         return NextResponse.json({ error: "Tipo de estatística inválido" }, { status: 400 });
//     }
//   } catch (error) {
//     console.error(`Erro ao processar ${tipo}:`, error);
//     return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
//   }
// }







// import { NextRequest, NextResponse } from "next/server";
// import { estatisticasService } from "@/app/services/dashboardService";

// export async function GET(req: NextRequest) {
//   const tipo = req.nextUrl.searchParams.get("tipo");
//   const year = req.nextUrl.searchParams.get("year");
//   const provincia = req.nextUrl.searchParams.get("provincia");
//   const bairro = req.nextUrl.searchParams.get("bairro");

//   if (!tipo) {
//     return NextResponse.json({ error: "Parâmetro 'tipo' é obrigatório" }, { status: 400 });
//   }

//   try {
//     switch (tipo) {
//       case "preco-por-zona":
//         const precoZona = await estatisticasService.getPrecoPorZona(year || undefined);
//         return NextResponse.json(precoZona, { status: 200 });

//       case "proximidades":
//         const proximidades = await estatisticasService.getProximidadesMaisProcuradas(year || undefined);
//         return NextResponse.json(proximidades, { status: 200 });

//       case "preco-por-mes":
//         const precoPorMes = await estatisticasService.getPrecoPorMes(year || undefined);
//         return NextResponse.json(precoPorMes, { status: 200 });

//       case "preco-mensal-zona":
//         const precoMensalZona = await estatisticasService.getPrecoMensalPorZona(provincia || undefined, bairro || undefined, year || undefined);
//         return NextResponse.json(precoMensalZona, { status: 200 });

//       default:
//         return NextResponse.json({ error: "Tipo de estatística inválido" }, { status: 400 });
//     }
//   } catch (error) {
//     console.error(`Erro ao processar ${tipo}:`, error);
//     return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
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

  try {
    switch (tipo) {
      case "preco-por-zona":
        const precoZona = await estatisticasService.getPrecoPorZona(year ?? undefined, tipoAluguel ?? undefined);
        return NextResponse.json(precoZona);
      case "proximidades":
        const proximidades = await estatisticasService.getProximidades(year ?? undefined, tipoAluguel ?? undefined);
        return NextResponse.json(proximidades);
      case "preco-por-mes":
        const precoPorMes = await estatisticasService.getPrecoPorMes(year ?? undefined, tipoAluguel ?? undefined);
        return NextResponse.json(precoPorMes);
      case "preco-mensal-zona":
        const precoMensalZona = await estatisticasService.getPrecoMensalPorZona(year ?? undefined, tipoAluguel ?? undefined);
        return NextResponse.json(precoMensalZona);
      default:
        return NextResponse.json({ error: "Tipo de dashboard inválido" }, { status: 400 });
    }
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}