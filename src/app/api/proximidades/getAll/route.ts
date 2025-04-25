
import { ProximidadeService } from "@/app/services/proximidadeService";
import { NextResponse } from "next/server";

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