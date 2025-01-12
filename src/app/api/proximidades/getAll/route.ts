// // app/api/imoveis/search/route.ts
// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

import { ProximidadeService } from "@/app/services/proximidadeService";
import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const lat = parseFloat(searchParams.get("lat") || "0");
//   const lng = parseFloat(searchParams.get("lng") || "0");
//   const raio = parseFloat(searchParams.get("raio") || "5"); // raio em km
//   const tipo = searchParams.get("tipo"); // tipo de proximidade

//   try {
//     // Buscar imóveis com proximidades dentro do raio especificado
//     const imoveis = await prisma.proximidade.findMany({
//       where: {
//         proximidades: tipo ? {
//           some: {
//             tipo: tipo,
//             AND: [
//               {
//                 latitude: {
//                   gte: lat - raio/111.32, // aproximação para conversão km -> graus
//                   lte: lat + raio/111.32
//                 }
//               },
//               {
//                 longitude: {
//                   gte: lng - raio/(111.32 * Math.cos(lat * Math.PI/180)),
//                   lte: lng + raio/(111.32 * Math.cos(lat * Math.PI/180))
//                 }
//               }
//             ]
//           }
//         } : undefined
//       },
//       include: {
//         proximidades: true,
//         imagens: true
//       }
//     });

//     return NextResponse.json(imoveis);
//   } catch (error) {
//     console.error("Erro ao buscar imóveis:", error);
//     return NextResponse.json(
//       { error: "Erro ao buscar imóveis" },
//       { status: 500 }
//     );
//   }
// }








// export async function GET() {
//   const proximidadeService = new ProximidadeService();

//   try {

//     const proximidades = await proximidadeService.listarProximidades({ skip: 0, take: 10 });

//    console.log(proximidades)
//       return NextResponse.json( proximidades , { status: 200 });
 
//   } catch (error) {
//     console.error("Erro ao buscar imóveis:", error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "Erro ao buscar imóveis" },
//       { status: 500 }
//     );
//   }
// }





const ITEMS_PER_PAGE = 4;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const proximidadeService = new ProximidadeService();

  try {
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const [total, proximidades] = await Promise.all([
      proximidadeService.countProximidades(),
      proximidadeService.listarProximidades({
        skip,
        take: ITEMS_PER_PAGE
      })
    ]);

    return NextResponse.json({
      data: proximidades,
      pagination: {
        total,
        totalPages: Math.ceil(total / ITEMS_PER_PAGE),
        currentPage: page,
        perPage: ITEMS_PER_PAGE
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar proximidades:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao buscar proximidades" },
      { status: 500 }
    );
  }
}