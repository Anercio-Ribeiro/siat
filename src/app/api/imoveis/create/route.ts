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
//       tipoAluguel,
//       endereco,
//       provincia,
//       bairro,
//       proximidades,
//       numeroQuarto,
//       numeroCasaBanho,
//       tipologia,
//       imagens
//     } = body;

//     // Validação básica dos campos obrigatórios
//     if (!titulo || !descricao || !preco || !tipoAluguel || !endereco || !provincia || !bairro) {
//       return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
//     }

//     // Verificar se o proprietário existe
//     const proprietario = await prisma.utilizador.findFirst();
//     if (!proprietario) {
//       return NextResponse.json({ error: "Proprietário não encontrado" }, { status: 404 });
//     }

//     const imovelData = {
//       titulo,
//       descricao,
//       preco,
//       tipoAluguel,
//       endereco,
//       provincia,
//       bairro,
//       numeroQuarto,
//       numeroCasaBanho,
//       tipologia,
//       imagens: {
//         create: imagens || []
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
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const imovelService = new ImovelService();
  const body = await req.json();

  try {
    const {
      titulo,
      descricao,
      preco,
      tipoAluguel,
      endereco,
      provincia,
      bairro,
      proximidades,
      numeroQuarto,
      numeroCasaBanho,
      tipologia,
      imagens
    } = body;

    // Validação básica dos campos obrigatórios
    if (!titulo || !descricao || !preco || !tipoAluguel || !endereco || !provincia || !bairro) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
    }

    // Verificar se o proprietário existe
    const proprietario = await prisma.user.findFirst();
    if (!proprietario) {
      return NextResponse.json({ error: "Proprietário não encontrado" }, { status: 404 });
    }

    const imovelData = {
      titulo,
      descricao,
      preco,
      tipoAluguel,
      endereco,
      provincia,
      bairro,
      numeroQuarto,
      numeroCasaBanho,
      tipologia,
      imagens: {
        create: imagens.map((imgUrl: string) => ({ url: imgUrl })) // Criar as imagens a partir do array de URLs
      },
      proprietarioId: proprietario.id,
      proximidades: {
        create: proximidades || [],
      },
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    const imovel = await imovelService.criarImovel(imovelData);
    return NextResponse.json(imovel, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar imóvel:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao criar imóvel" }, { status: 500 });
  }
}
