// import { NextResponse } from "next/server";
// import { ImovelService } from "@/app/services/imovelService";

// export async function GET() {
//   const imovelService = new ImovelService();

//   try {
//     const imoveis = await imovelService.listarImoveis();
//     return NextResponse.json(imoveis, { status: 200 });
//   } catch (error) {
//     console.error("Erro ao buscar imóveis:", error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao buscar imóveis" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import { ImovelService } from "@/app/services/imovelService";

// export async function GET() {
//   const imovelService = new ImovelService();

//   try {
//     const imoveis = await imovelService.listarImoveis();

//     // Remover o campo proprietarioId de cada imóvel no array
//     const imoveisSemProprietarioId = imoveis.map(({ proprietarioId, ...imovel }) => imovel);

//     console.log(imoveisSemProprietarioId)

//     return NextResponse.json({ imoveis: imoveisSemProprietarioId }, { status: 200 });
//   } catch (error) {
//     console.error("Erro ao buscar imóveis:", error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao buscar imóveis" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import { ImovelService } from "@/app/services/imovelService";
// import { getAuthenticatedUser } from "@/lib/getAuthUser";


// export async function GET() {
//   const imovelService = new ImovelService();

//   try {
//     // Obtém o usuário autenticado
//     const user = await getAuthenticatedUser();

//     // Lista os imóveis do serviço
//     const imoveis = await imovelService.listarImoveis();

//     // Filtra os imóveis para retornar apenas os que pertencem ao usuário autenticado
//     const imoveisDoUsuario = imoveis.filter(imovel => imovel.proprietarioId === user.id);

//     // Remove o campo `proprietarioId` de cada imóvel para a resposta
//     const imoveisSemProprietarioId = imoveisDoUsuario.map(({ proprietarioId, ...imovel }) => imovel);

//     return NextResponse.json({ imoveis: imoveisSemProprietarioId }, { status: 200 });
//   } catch (error) {
//     console.error("Erro ao buscar imóveis:", error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "Erro ao buscar imóveis" },
//       { status: 500 }
//     );
//   }
// }


// pages/api/imoveis/getAll.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/getAuthUser";
import { ImovelService } from "@/app/services/imovelService";

export async function GET() {
  const imovelService = new ImovelService();

  try {
    // Obtém o usuário autenticado
    const user = await getAuthenticatedUser();

    // Lista todos os imóveis do serviço
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




