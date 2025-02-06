// import { NextResponse } from "next/server";
// import { ImovelService } from "@/app/services/imovelService";
// import { prisma } from "@/lib/prisma";

// export async function POST(req: Request) {
//   const imovelService = new ImovelService();
//   const body = await req.json();

//   try {
//     const {
//       titulo,
//       descricao,
//       preco,
//       endereco,
//       provincia,
//       bairro,
//       proximidades,
//       numeroQuarto,
//       numeroCasaBanho,
//       tipologia,
//       garagem,
//       municipio,
//       imagens
//     } = body;

//     // Validação dos campos obrigatórios
//     if (!titulo || !descricao || !preco || !endereco || !provincia || !bairro || !garagem) {
//       return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
//     }

//     // Obter usuário autenticado
//     const proprietario = await getAuthUser(req);
//     if (!proprietario) {
//       return NextResponse.json({ error: "Proprietário não autenticado" }, { status: 401 });
//     }

//     const imovelData = {
//       titulo,
//       descricao,
//       preco,
//       endereco,
//       provincia,
//       bairro,
//       numeroQuarto,
//       numeroCasaBanho,
//       tipologia,
//       garagem,
//       municipio,
//       imagens: {
//         create: imagens.map((imgUrl: string) => ({ url: imgUrl })),
//       },
//       proprietarioId: proprietario.id,
//       proximidades: {
//         create: proximidades || [],
//       },
//       criadoEm: new Date(),
//       atualizadoEm: new Date(),
//     };

//     const imovel = await imovelService.criarImovel(imovelData);
//     return NextResponse.json(imovel, { status: 201 });

//   } catch (error) {
//     console.error("Erro ao criar imóvel:", error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao criar imóvel" }, { status: 500 });
//   }
// }




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
      //proximidades,
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
    } = body;

    // if (!titulo || !descricao || !preco || !endereco || !provincia || !bairro || !garagem || !municipio) {
    //   return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
    // }

    // Obtém o usuário autenticado
    const proprietario = await getAuthenticatedUser();

    if(!proprietario)

      return NextResponse.json("Erro: user invalido");
    console.log("User logged: "+proprietario)

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
      imagens: {
        create: imagens.map((imgUrl: string) => ({ url: imgUrl })),
      },
      proprietarioId: proprietario.id,
      // proximidades: {
      //   create: proximidades || [],
      // },
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    const imovel = await imovelService.criarImovel(imovelData);
    console.log(imovel);
    return NextResponse.json(imovel, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar imóvel:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao criar imóvel" }, { status: 500 });
  }
}
