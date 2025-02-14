

// // pages/api/imoveis/getAll.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import { getAuthenticatedUser } from "@/lib/getAuthUser";
// import { ImovelService } from "@/app/services/imovelService";

// export async function GET(request: NextRequest) {
//   const imovelService = new ImovelService();

//   try {
//     // Obtém o usuário autenticado
//     const user = await getAuthenticatedUser();

//     // Lista todos os imóveis do serviço
//     const imoveis = await imovelService.listarImoveis();

//     // Verifica se o usuário está autenticado
//     if (user) {
//       // Se houver um usuário autenticado, filtra os imóveis para retornar apenas os que pertencem a ele
//       const imoveisFiltrados = imoveis.filter(imovel => imovel.proprietarioId === user.id);
//       return NextResponse.json({ imoveis: imoveisFiltrados }, { status: 200 });
//     } else {
//       // Se nenhum usuário estiver logado, retorna todos os imóveis
//       return NextResponse.json({ imoveis }, { status: 200 });
//     }
//   } catch (error) {
//     console.error("Erro ao buscar imóveis:", error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "Erro ao buscar imóveis" },
//       { status: 500 }
//     );
//   }
// }




export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/getAuthUser";
import { ImovelService } from "@/app/services/imovelService";

export async function GET(request: NextRequest) {
  const imovelService = new ImovelService();
  try {
    const user = await getAuthenticatedUser();
    // ... rest of your imoveis code remains the same
    const imoveis = await imovelService.listarImoveis();

    // Verifica se o usuário está autenticado
    if (user) {
      // Se houver um usuário autenticado, filtra os imóveis para retornar apenas os que pertencem a ele
      const imoveisFiltrados = imoveis.filter(imovel => imovel.proprietarioId === user.id);
      return NextResponse.json({ imoveis: imoveisFiltrados }, { status: 200 });
    } else {
      // Se nenhum usuário estiver logado, retorna todos os imóveis
      return NextResponse.json({ imoveis }, { status: 200 });
    }
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao buscar imóveis" },
      { status: 500 }
    );
  }
}