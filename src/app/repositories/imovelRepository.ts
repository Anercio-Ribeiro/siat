// import { prisma } from '@/lib/prisma';
// import { Imovel } from '@prisma/client';

// export class ImovelRepository {

//   async criarImovel(data: Omit<Imovel, 'id'>): Promise<Imovel> {
//     return await prisma.imovel.create({
//       data,
//       include: { imagens: true,  }, // Inclui as relações criadas proximidades: true
//     });
//   }


//   async encontrarImovelPorId(id: string): Promise<Imovel | null> {
//     return await prisma.imovel.findUnique({
//       where: { id },
//       include: {
//        // proximidades: true,
//         proprietario: {
//           select: {
//             id: true,
//             nome: true,
//             email: true,
//             role: true,
//           },
//         },
//       },
//     });
//   }
  

//   async atualizarImovel(id: string, data: Partial<Omit<Imovel, 'id'>>): Promise<Imovel> {
//     return await prisma.imovel.update({
//       where: { id },
//       data,
//     });
//   }

//   async deletarImovel(id: string): Promise<Imovel> {
//     return await prisma.imovel.delete({
//       where: { id },
//     });
//   }

//   async listarImoveis(page: number = 1, pageSize: number = 6, userId?: string): Promise<{ imoveis: Imovel[], total: number }> {
//     const skip = (page - 1) * pageSize;
    
//     // Build the where clause conditionally
//     const where = userId ? { proprietarioId: userId } : {};
    
//     const [imoveis, total] = await Promise.all([
//       prisma.imovel.findMany({
//         where,
//         skip,
//         take: pageSize,
//         include: {
//           proprietario: {
//             select: {
//               id: true,
//               nome: true,
//               email: true,
//               role: true,
//             },
//           },
//           imagens: {
//             select: {
//               url: true,
//             }
//           }
//         },
//         orderBy: {
//           id: 'desc'
//         }
//       }),
//       prisma.imovel.count({ where })
//     ]);
    
//     return { imoveis, total };
//   }
  

//   async encontrarPrimeiroImovel(): Promise<Imovel | null> {
//     return await prisma.imovel.findFirst();
//   }


//   async buscarImoveis(filters: any, skip: number, take: number) {
//     return prisma.imovel.findMany({
//       where: filters,
//       include: {
//         imagens: {
//           select: {
//             url: true,
//           },
        
//     },
//     // proximidades: {
//     //   select: {
//     //     nome: true,
//     //     latitude: true,
//     //     longitude: true
//     //   },
//     // },
//     proprietario: {
//       select: {
//         id: true,
//         nome: true,
//         email: true,
//         role: true,
//       },
//     }
    
//   },
//       skip,
//       take, 
//     }, 
//   );
//   }

//   async contarImoveis(filters: any) {
//     return prisma.imovel.count({
//       where: filters,
//     });
//   }

//   async getImoveisByProprietario(proprietarioId: string) {
//     return prisma.imovel.findMany({
//       where: { proprietarioId },
//       include: { alugueis: true },
//     });
//   }

//   async getTotalImoveis() {
//     return prisma.imovel.count();
//   }

//   async getAllAlugueis() {
//     return prisma.aluguel.findMany({
//       include: { imovel: true },
//     });
//   }
// }









import { prisma } from '@/lib/prisma';
import { Imovel } from '@prisma/client';

export class ImovelRepository {
  async criarImovel(data: Omit<Imovel, 'id'>): Promise<Imovel> {
    return await prisma.imovel.create({
      data,
      include: { imagens: true },
    });
  }

  async encontrarImovelPorId(id: string): Promise<Imovel | null> {
    return await prisma.imovel.findUnique({
      where: { id },
      include: {
        imagens: true,
        proprietario: {
          select: {
            id: true,
            nome: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async atualizarImovel(id: string, data: Partial<Omit<Imovel, 'id'>>): Promise<Imovel> {
    return await prisma.imovel.update({
      where: { id },
      data,
      include: {
        imagens: true,
        proprietario: {
          select: {
            id: true,
            nome: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async deletarImovel(id: string): Promise<Imovel> {
    return await prisma.imovel.delete({
      where: { id },
    });
  }

  async listarImoveis(page: number = 1, pageSize: number = 6, userId?: string): Promise<{ imoveis: Imovel[], total: number }> {
    const skip = (page - 1) * pageSize;
    const where = userId ? { proprietarioId: userId } : {};
    const [imoveis, total] = await Promise.all([
      prisma.imovel.findMany({
        where,
        skip,
        take: pageSize,
        include: {
          proprietario: {
            select: {
              id: true,
              nome: true,
              email: true,
              role: true,
            },
          },
          imagens: {
            select: {
              url: true,
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
      }),
      prisma.imovel.count({ where }),
    ]);
    return { imoveis, total };
  }

  async encontrarPrimeiroImovel(): Promise<Imovel | null> {
    return await prisma.imovel.findFirst();
  }

  async buscarImoveis(filters: any, skip: number, take: number) {
    return prisma.imovel.findMany({
      where: filters,
      include: {
        imagens: {
          select: {
            url: true,
          },
        },
        proprietario: {
          select: {
            id: true,
            nome: true,
            email: true,
            role: true,
          },
        },
      },
      skip,
      take,
    });
  }

  async contarImoveis(filters: any) {
    return prisma.imovel.count({
      where: filters,
    });
  }

  async getImoveisByProprietario(proprietarioId: string) {
    return prisma.imovel.findMany({
      where: { proprietarioId },
      include: { alugueis: true },
    });
  }

  async getTotalImoveis() {
    return prisma.imovel.count();
  }

  async getAllAlugueis() {
    return prisma.aluguel.findMany({
      include: { imovel: true },
    });
  }
}