// import { PrismaClient, ProximidadeImovel, TipoProximidade } from "@prisma/client";

// const prisma = new PrismaClient();

// export class ProximidadeImovelRepository {
//   async findByTipo(
//     tipo: string,
//     page: number = 1,
//     pageSize: number = 8
//   ): Promise<any[]> {
//     console.log(`Buscando proximidade com tipo: '${tipo}'`);

//     const skip = (page - 1) * pageSize; // Calcula quantos registros pular

//     const ImovelProximidades = await prisma.proximidadeImovel.findMany({
//       where: {
//         proximidade: {
//           tipo: tipo.toUpperCase() as TipoProximidade,
//         },
//       },
//       include: {
//         imovel: {
//           include: {
//             imagens: {
//               select: { url: true }, // Inclui apenas a URL das imagens
//             },
//           },
//         },
//       },
//       skip, // Pula os registros das páginas anteriores
//       take: pageSize, // Limita a 8 elementos por página
//     });

//     if (!ImovelProximidades.length) {
//       throw new Error(`Nenhuma proximidade com tipo '${tipo}' encontrada.`);
//     }

//     // Extrai apenas o objeto 'imovel' de cada resultado
//     return ImovelProximidades.map((proximidade) => ({
//       id: proximidade.imovel.id,
//       titulo: proximidade.imovel.titulo,
//       descricao: proximidade.imovel.descricao,
//       preco: proximidade.imovel.preco,
//       proprietarioId: proximidade.imovel.proprietarioId,
//       endereco: proximidade.imovel.endereco,
//       provincia: proximidade.imovel.provincia,
//       bairro: proximidade.imovel.bairro,
//       numeroQuarto: proximidade.imovel.numeroQuarto,
//       numeroCasaBanho: proximidade.imovel.numeroCasaBanho,
//       tipologia: proximidade.imovel.tipologia,
//       criadoEm: proximidade.imovel.criadoEm,
//       atualizadoEm: proximidade.imovel.atualizadoEm,
//       garagem: proximidade.imovel.garagem,
//       latitude: proximidade.imovel.latitude,
//       longitude: proximidade.imovel.longitude,
//       municipio: proximidade.imovel.municipio,
//       precoMensal: proximidade.imovel.precoMensal,
//       tipoAluguel: proximidade.imovel.tipoAluguel,
//       visualizacoes: proximidade.imovel.visualizacoes,
//       imagens: proximidade.imovel.imagens,
//     }));
//   }

//   // async countTotal(){
//   //       const totalImoveis = await prisma.proximidadeImovel.count({
//   //         where: {
//   //           proximidade: {
//   //             tipo: tipo.toUpperCase(),
//   //           },
//   //         },
//   //       });
        
//   //       const totalPages = Math.ceil(totalImoveis / pageSize);
//   // }
// }







import { prisma } from "@/lib/prisma";
import { PrismaClient, ProximidadeImovel, TipoProximidade } from "@prisma/client";


export class ProximidadeImovelRepository {
  async findByTipo(
    tipo: string,
    page: number = 1,
    pageSize: number = 8
  ): Promise<any[]> {
    console.log(`Buscando proximidade com tipo: '${tipo}'`);

    const skip = (page - 1) * pageSize;

    const ImovelProximidades = await prisma.proximidadeImovel.findMany({
      where: {
        proximidade: {
          tipo: tipo.toUpperCase() as TipoProximidade,
        },
      },
      include: {
        imovel: {
          include: {
            imagens: {
              select: { url: true },
            },
          },
        },
      },
      skip,
      take: pageSize,
    });

    // Não lançar erro, apenas retornar a lista (vazia ou não)
    return ImovelProximidades.map((proximidade) => ({
      id: proximidade.imovel.id,
      titulo: proximidade.imovel.titulo,
      descricao: proximidade.imovel.descricao,
      preco: proximidade.imovel.preco,
      proprietarioId: proximidade.imovel.proprietarioId,
      endereco: proximidade.imovel.endereco,
      provincia: proximidade.imovel.provincia,
      bairro: proximidade.imovel.bairro,
      numeroQuarto: proximidade.imovel.numeroQuarto,
      numeroCasaBanho: proximidade.imovel.numeroCasaBanho,
      tipologia: proximidade.imovel.tipologia,
      criadoEm: proximidade.imovel.criadoEm,
      atualizadoEm: proximidade.imovel.atualizadoEm,
      garagem: proximidade.imovel.garagem,
      latitude: proximidade.imovel.latitude,
      longitude: proximidade.imovel.longitude,
      municipio: proximidade.imovel.municipio,
      precoMensal: proximidade.imovel.precoMensal,
      //tipoAluguel: proximidade.imovel.tipoAluguel,
      visualizacoes: proximidade.imovel.visualizacoes,
      imagens: proximidade.imovel.imagens,
    }));
  }
}