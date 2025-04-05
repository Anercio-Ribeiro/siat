// // src/app/api/proximidade/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { ProximidadeImovelService } from "@/app/services/proximidadeImovelService";
// import { prisma } from "@/lib/prisma";
// import { TipoProximidade } from "@prisma/client";

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const tipo = searchParams.get("tipo");
//   const page = parseInt(searchParams.get("page") || "1", 10);
//   const pageSize = 8;

//   console.log("Query params received:", { tipo, page });

//   if (!tipo) {
//     return NextResponse.json(
//       { message: "O parâmetro 'tipo' é obrigatório." },
//       { status: 400 }
//     );
//   }

//   const service = new ProximidadeImovelService();

//   try {
//     const proximidades = await service.getProximidadesByTipo(tipo, page, pageSize);
    
//     // Contar o total de registros no banco para calcular totalPages
//     const totalImoveis = await prisma.proximidadeImovel.count({
//       where: {
//         proximidade: {
//           tipo: tipo.toUpperCase() as TipoProximidade,
//         },
//       },
//     });
    
//     const totalPages = Math.ceil(totalImoveis / pageSize);

//     // Retornar no formato esperado pelo frontend
//     const response = {
//       imoveis: proximidades.Proximidade,
//       totalImoveis,
//       totalPages,
//       currentPage: page,
//     };

//     return NextResponse.json(response, { status: 200 });
//   } catch (error) {
//     console.error("Erro ao buscar proximidades:", error);
//     if (error instanceof Error && error.message.includes("não encontrada")) {
//       return NextResponse.json({ message: error.message }, { status: 404 });
//     }
//     return NextResponse.json(
//       { message: "Erro interno ao buscar proximidades" },
//       { status: 500 }
//     );
//   }
// }




// // src/app/api/proximidade/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { ProximidadeImovelService } from "@/app/services/proximidadeImovelService";
// import { prisma } from "@/lib/prisma";
// import { TipoProximidade } from "@prisma/client";

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const tipo = searchParams.get("tipo");
//   const page = parseInt(searchParams.get("page") || "1", 10);
//   const pageSize = 8;

//   console.log("Query params received:", { tipo, page });

//   if (!tipo) {
//     return NextResponse.json(
//       { message: "O parâmetro 'tipo' é obrigatório." },
//       { status: 400 }
//     );
//   }

//   const service = new ProximidadeImovelService();

//   try {
//     const proximidades = await service.getProximidadesByTipo(tipo, page, pageSize);
    
//     // Contar o total de registros no banco para calcular totalPages
//     const totalImoveis = await prisma.proximidadeImovel.count({
//       where: {
//         proximidade: {
//           tipo: tipo.toUpperCase() as TipoProximidade,
//         },
//       },
//     });
    
//     const totalPages = Math.ceil(totalImoveis / pageSize);

//     // Retornar no formato esperado pelo frontend
//     const response = {
//       imoveis: proximidades.Proximidade,
//       totalImoveis,
//       totalPages,
//       currentPage: page,
//     };

//     return NextResponse.json(response, { status: 200 });
//   } catch (error) {
//     console.error("Erro ao buscar proximidades:", error);
//     if (error instanceof Error && error.message.includes("não encontrada")) {
//       return NextResponse.json({ message: error.message }, { status: 404 });
//     }
//     return NextResponse.json(
//       { message: "Erro interno ao buscar proximidades" },
//       { status: 500 }
//     );
//   }
// }









// src/app/api/proximidade-imovel/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ProximidadeImovelService } from "@/app/services/proximidadeImovelService";
import { PrismaClient, TipoProximidade } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tipo = searchParams.get("tipo");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 8;

  console.log("Query params received:", { tipo, page });

  if (!tipo) {
    return NextResponse.json(
      { message: "O parâmetro 'tipo' é obrigatório." },
      { status: 400 }
    );
  }

  const service = new ProximidadeImovelService();

  try {
    const proximidades = await service.getProximidadesByTipo(tipo, page, pageSize);

    // Contar o total de registros no banco
    const totalImoveis = await prisma.proximidadeImovel.count({
      where: {
        proximidade: {
          tipo: tipo.toUpperCase() as TipoProximidade,
        },
      },
    });

    const totalPages = Math.ceil(totalImoveis / pageSize);

    // Retornar resposta no formato esperado pelo frontend
    const response = {
      imoveis: proximidades.Proximidade,
      totalImoveis,
      totalPages,
      currentPage: page,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar proximidades:", error);
    return NextResponse.json(
      { message: "Erro interno ao buscar proximidades" },
      { status: 500 }
    );
  }
}