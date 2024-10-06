// import { NextResponse } from "next/server";
// import { ImovelService } from "@/app/services/imovelService";

// export async function PATCH(req: Request, { params }: { params: { id: string } }) {
//   const imovelService = new ImovelService();
//   const body = await req.json();
//   const { id } = params;
//   const data = body;

//   if (!id) {
//     return NextResponse.json({ error: "ID do imóvel é obrigatório" }, { status: 400 });
//   }

//   try {
//     // Verificar se o imóvel existe
//     const imovelExistente = await imovelService.encontrarImovelPorId(id);
//     if (!imovelExistente) {
//       return NextResponse.json({ error: "Imóvel não encontrado" }, { status: 404 });
//     }

//     // Atualizar o imóvel encontrado com os novos dados
//     const imovelAtualizado = await imovelService.atualizarImovel(id, data);
//     return NextResponse.json(imovelAtualizado, { status: 200 });
//   } catch (error) {
//     console.error("Erro ao atualizar imóvel:", error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao atualizar imóvel" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { ImovelService } from "@/app/services/imovelService";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const imovelService = new ImovelService();
  const body = await req.json();
  const { id } = params;
  const data = body;

  if (!id) {
    return NextResponse.json({ error: "ID do imóvel é obrigatório" }, { status: 400 });
  }

  try {
    // Verificar se o imóvel existe
    const imovelExistente = await imovelService.encontrarImovelPorId(id);
    if (!imovelExistente) {
      return NextResponse.json({ error: "Imóvel não encontrado" }, { status: 404 });
    }

    // Atualizar o imóvel encontrado com os novos dados
    const imovelAtualizado = await imovelService.atualizarImovel(id, data);

    // Remover o campo proprietarioId do retorno
    const { proprietarioId, ...imovelSemProprietarioId } = imovelAtualizado;

    return NextResponse.json(imovelSemProprietarioId, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar imóvel:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao atualizar imóvel" }, { status: 500 });
  }
}
