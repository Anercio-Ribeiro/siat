import { ProximidadeImovelService } from "@/app/services/proximidadeImovelService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const proximidadeNome = searchParams.get("proximidadeNome"); // Alterado para proximidadeNome
  const distanciaMax = searchParams.get("distanciaMax");

  if (!proximidadeNome) {
    return NextResponse.json(
      { message: "O parâmetro 'proximidadeNome' é obrigatório." },
      { status: 400 }
    );
  }

  const service = new ProximidadeImovelService();

  try {
    const imoveis = await service.getProximidadesByTipo(
      proximidadeNome,
      //distanciaMax ? parseFloat(distanciaMax) : undefined
    );
    //TODO: Remover logs em produção
    //console.log("Imoveis da proximidade: "+imoveis)
    // const totalImoveis = await imovelService.contarImoveis(filters);
    return NextResponse.json({imoveis, status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao buscar imóveis" },
      { status: 404 }
    );
  }
}