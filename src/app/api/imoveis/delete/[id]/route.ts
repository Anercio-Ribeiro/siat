import { NextResponse } from "next/server";
import { ImovelService } from "@/app/services/imovelService";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const imovelService = new ImovelService();

const { id } = params;


  try {
    const imovel = await imovelService.deletarImovel(id);
    return NextResponse.json({ message: "Imóvel deletado com sucesso", imovel }, { status: 200 });
  } catch (error) {
    console.error("Erro ao deletar imóvel:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao deletar imóvel" }, { status: 500 });
  }
}
