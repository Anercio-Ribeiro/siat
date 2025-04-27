import { NextResponse } from "next/server";
import { ImovelService } from "@/app/services/imovelService";
import { getAuthenticatedUser } from "@/lib/getAuthUser";

export async function POST(req: Request) {
  const imovelService = new ImovelService();
  const body = await req.json();

  try {
    const {
      titulo,
      descricao,
      preco,
      endereco,
      provincia,
      bairro,
      latitude,
      longitude,
      numeroQuarto,
      numeroCasaBanho,
      tipologia,
      garagem,
      municipio,
      imagens,
      precoMensal,
      tipoAluguel,
      status,
    } = body;

 
    const proprietario = await getAuthenticatedUser();

    if(!proprietario)

      return NextResponse.json("Erro: user invalido");
    
    //TODO: Remover logs em produção
      // console.log("User logged: "+proprietario)

    const imovelData = {
      titulo,
      descricao,
      preco,
      endereco,
      provincia,
      bairro,
      numeroQuarto,
      numeroCasaBanho,
      tipologia,
      garagem,
      municipio,
      latitude,
      longitude,
      precoMensal,
      tipoAluguel,
      visualizacoes: 0,
      status: true,
      imagens: {
        create: imagens.map((imgUrl: string) => ({ url: imgUrl })),
      },
      proprietarioId: proprietario.id,
  
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    const imovel = await imovelService.criarImovel(imovelData);
    //TODO: Remover logs em produção
    //console.log(imovel);
    return NextResponse.json(imovel, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar imóvel:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao criar imóvel" }, { status: 500 });
  }
}
