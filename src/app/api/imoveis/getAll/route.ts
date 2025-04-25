import { ImovelService } from "@/app/services/imovelService";
import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/getAuthUser";

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