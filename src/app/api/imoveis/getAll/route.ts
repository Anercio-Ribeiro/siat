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


import { NextResponse } from "next/server";
import { ImovelService } from "@/app/services/imovelService";

export async function GET() {
  const imovelService = new ImovelService();

  try {
    const imoveis = await imovelService.listarImoveis();

    // Remover o campo proprietarioId de cada imóvel no array
    const imoveisSemProprietarioId = imoveis.map(({ proprietarioId, ...imovel }) => imovel);

    return NextResponse.json({ imoveis: imoveisSemProprietarioId }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao buscar imóveis" }, { status: 500 });
  }
}
