// export const dynamic = 'force-dynamic';

import { ImovelService } from "@/app/services/imovelService";
import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/getAuthUser";

// import { NextRequest, NextResponse } from "next/server";
// import { getAuthenticatedUser } from "@/lib/getAuthUser";
// import { ImovelService } from "@/app/services/imovelService";

// export async function GET(request: NextRequest) {
//   const imovelService = new ImovelService();
//   try {
//     const user = await getAuthenticatedUser();
//     // ... rest of your imoveis code remains the same
//     const result = await imovelService.listarImoveis();
//     const imoveis = result.imoveis;

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


// export const dynamic = 'force-dynamic';
// import { NextRequest, NextResponse } from "next/server";
// import { getAuthenticatedUser } from "@/lib/getAuthUser";
// import { ImovelService } from "@/app/services/imovelService";

// export async function GET(request: NextRequest) {
//   const imovelService = new ImovelService();
//   try {
//     const user = await getAuthenticatedUser();
    
//     // Get pagination parameters from URL
//     const searchParams = request.nextUrl.searchParams;
//     const page = parseInt(searchParams.get('page') || '1');
//     const pageSize = parseInt(searchParams.get('pageSize') || '6');
    
//     // Get paginated imoveis
//     const { imoveis, total, totalPages } = await imovelService.listarImoveis(page, pageSize);
    
//     // Filter based on authenticated user if needed
//     if (user) {
//       const imoveisFiltrados = imoveis.filter(imovel => imovel.proprietarioId === user.id);
//       return NextResponse.json({
//         imoveis: imoveisFiltrados,
//         total: imoveisFiltrados.length,
//         totalPages: Math.ceil(imoveisFiltrados.length / pageSize),
//         currentPage: page
//       }, { status: 200 });
//     } else {
//       // Return all imoveis with pagination metadata
//       return NextResponse.json({
//         imoveis,
//         total,
//         totalPages,
//         currentPage: page
//       }, { status: 200 });
//     }
//   } catch (error) {
//     console.error("Erro ao buscar imóveis:", error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "Erro ao buscar imóveis" },
//       { status: 500 }
//     );
//   }
// }



export async function GET(request: NextRequest) {
  const imovelService = new ImovelService();
  try {
    const user = await getAuthenticatedUser();
    
    // Get pagination parameters from URL
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '6');
    
    // Get paginated imoveis with user filter if needed
    const userId = user ? user.id : undefined;
    const { imoveis, total, totalPages } = await imovelService.listarImoveis(page, pageSize, userId);
    
    // Return imoveis with pagination metadata
    return NextResponse.json({
      imoveis,
      total,
      totalPages,
      currentPage: page
    }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao buscar imóveis" },
      { status: 500 }
    );
  }
}