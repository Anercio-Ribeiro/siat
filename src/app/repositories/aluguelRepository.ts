// import { prisma } from '@/lib/prisma';
// import { Aluguel } from '@prisma/client';

// export class AluguelRepository {
//   async criarAluguel(data: Omit<Aluguel, 'id' | 'criadoEm' | 'atualizadoEm'>): Promise<Aluguel> {
    
//     return await prisma.aluguel.create({ data });
//   }

//   async buscarAluguelByImovel(imovelId: string): Promise<Aluguel[]> {
//     return await prisma.aluguel.findMany({
//       where: { imovelId },
//       include: { imovel: true, inquilino: true, contrato: true },
//     });
//   }


//   async findRentalsByUserId(
//     inquilinoId: string,
//     page: number = 1,
//     pageSize: number = 10
//   ): Promise<Aluguel[]> {
//     const skip = (page - 1) * pageSize;
//     return await prisma.aluguel.findMany({
//       where: { inquilinoId },
//       include: {
//         imovel: {
//           include: {
//             proprietario: {
//               select: { id: true, nome: true }, // Inclui o proprietário
//             },
//           },
//         },
//         inquilino: true,
//         contrato: true,
//       },
//       take: pageSize,
//       skip,
//     });
//   }




//   async countRentalsByUserId(inquilinoId: string): Promise<number> {
//     return await prisma.aluguel.count({ where: { inquilinoId } });
//   }



//   async obterReservasPorProprietario(
//     proprietarioId: string,
//     page: number = 1,
//     pageSize: number = 10
//   ): Promise<Aluguel[]> {
//     const skip = (page - 1) * pageSize;
//     return await prisma.aluguel.findMany({
//       where: {
//         imovel: {
//           proprietarioId: proprietarioId,
//         },
//         NOT: {
//           inquilinoId: proprietarioId,
//         },
//       },
//       include: {
//         imovel: {
//           include: {
//             proprietario: {
//               select: { id: true, nome: true }, // Inclui o proprietário
//             },
//           },
//         },
//         inquilino: {
//           select: {
//             id: true,
//             nome: true,
//             email: true,
//             telefone: true,
//           },
//         },
//       },
//       take: pageSize,
//       skip,
//     });
//   }

//   async updateRentalStatus(aluguelId: string, status: string): Promise<Aluguel> {
//     return await prisma.aluguel.update({
//       where: { id: aluguelId },
//       data: { status },
//       include: { 
//         imovel: {
//           include: { 
//             proprietario: true, // Inclui os detalhes do proprietário
//             imagens: true, // Inclui as imagens do imóvel
//             proximidades: { include: { proximidade: true } }, // Inclui as proximidades do imóvel
//           }
//         },
//         inquilino: true,
//         contrato: true 
//       },
//     });
//   }

//   async findRentalById(aluguelId: string): Promise<Aluguel | null> {
//     return await prisma.aluguel.findUnique({
//       where: { id: aluguelId },
//       include: {
//         imovel: {
//           include: { 
//             proprietario: {
//               select: { nome: true, telefone: true } // Inclui os detalhes do proprietário
//             },
//             imagens: true, 
//             proximidades: { 
//               include: { 
//                 proximidade: true 
//               } 
//             } 
//           },
//         },
//         inquilino: true,
//         contrato: true,
//       },
//     });
//   }

//   async getAlugueisByProprietario(proprietarioId: string) {
//     return prisma.aluguel.findMany({
//       where: { imovel: { proprietarioId } },
//       include: { imovel: true, contrato: true },
//     });
//   }

//   async getAlugueisByInquilino(inquilinoId: string) {
//     return prisma.aluguel.findMany({
//       where: { inquilinoId },
//       include: { imovel: true, contrato: true },
//     });
//   }

//   async getPendingAlugueis(proprietarioId: string) {
//     return prisma.aluguel.findMany({
//       where: { imovel: { proprietarioId }, status: "pendente" },
//     });
//   }

//   async getAllAlugueis() {
//     return prisma.aluguel.findMany({
//       include: { contrato: true, imovel: true },
//     });
//   }
  
//   async deletarAluguel(aluguelId: string): Promise<Aluguel> {
//     return await prisma.aluguel.delete({
//       where: { id: aluguelId },
//     });
//   }
// }







import { prisma } from '@/lib/prisma';
import { Aluguel, Prisma } from '@prisma/client';
import { RentalFilters } from '../model/type';

export class AluguelRepository {
  async criarAluguel(data: Omit<Aluguel, 'id' | 'criadoEm' | 'atualizadoEm'>): Promise<Aluguel> {
    return await prisma.aluguel.create({ data });
  }

  async buscarAluguelByImovel(imovelId: string): Promise<Aluguel[]> {
    return await prisma.aluguel.findMany({
      where: { imovelId },
      include: { imovel: true, inquilino: true, contrato: true },
    });
  }

  async findRentalsByUserId(
    inquilinoId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<Aluguel[]> {
    const skip = (page - 1) * pageSize;
    return await prisma.aluguel.findMany({
      where: { inquilinoId },
      include: {
        imovel: {
          include: {
            proprietario: {
              select: { id: true, nome: true },
            },
          },
        },
        inquilino: true,
        contrato: true,
      },
      take: pageSize,
      skip,
    });
  }

  async countRentalsByUserId(inquilinoId: string): Promise<number> {
    return await prisma.aluguel.count({ where: { inquilinoId } });
  }

  async obterReservasPorProprietario(
    proprietarioId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<Aluguel[]> {
    const skip = (page - 1) * pageSize;
    return await prisma.aluguel.findMany({
      where: {
        imovel: {
          proprietarioId: proprietarioId,
        },
        NOT: {
          inquilinoId: proprietarioId,
        },
      },
      include: {
        imovel: {
          include: {
            proprietario: {
              select: { id: true, nome: true },
            },
          },
        },
        inquilino: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true,
          },
        },
      },
      take: pageSize,
      skip,
    });
  }

  async updateRentalStatus(aluguelId: string, status: string): Promise<Aluguel> {
    return await prisma.aluguel.update({
      where: { id: aluguelId },
      data: { status },
      include: {
        imovel: {
          include: {
            proprietario: true,
            imagens: true,
            proximidades: { include: { proximidade: true } },
          },
        },
        inquilino: true,
        contrato: true,
      },
    });
  }

  async findRentalById(aluguelId: string): Promise<Aluguel | null> {
    return await prisma.aluguel.findUnique({
      where: { id: aluguelId },
      include: {
        imovel: {
          include: {
            proprietario: {
              select: { nome: true, telefone: true },
            },
            imagens: true,
            proximidades: {
              include: {
                proximidade: true,
              },
            },
          },
        },
        inquilino: true,
        contrato: true,
      },
    });
  }

  async getAlugueisByProprietario(proprietarioId: string) {
    return prisma.aluguel.findMany({
      where: { imovel: { proprietarioId } },
      include: { imovel: true, contrato: true },
    });
  }

  async getAlugueisByInquilino(inquilinoId: string) {
    return prisma.aluguel.findMany({
      where: { inquilinoId },
      include: { imovel: true, contrato: true },
    });
  }

  async getPendingAlugueis(proprietarioId: string) {
    return prisma.aluguel.findMany({
      where: { imovel: { proprietarioId }, status: "pendente" },
    });
  }

  async getAllAlugueis() {
    return prisma.aluguel.findMany({
      include: { contrato: true, imovel: true },
    });
  }

  async deletarAluguel(aluguelId: string): Promise<Aluguel> {
    return await prisma.aluguel.delete({
      where: { id: aluguelId },
    });
  }

  async findRentalsByUser(
    userId: string,
    role: "INQUILINO" | "PROPRIETARIO",
    page: number,
    pageSize: number,
    filters: RentalFilters
  ) {
    const where: Prisma.AluguelWhereInput = role === "INQUILINO" ? { inquilinoId: userId } : { imovel: { proprietarioId: userId } };

    if (filters.imovelId) {
      where.imovelId = { contains: filters.imovelId, mode: "insensitive" };
    }
    if (filters.name) {
      if (role === "INQUILINO") {
        where.imovel = {
          ...((where.imovel as Prisma.ImovelWhereInput) || {}),
          proprietario: {
            nome: { contains: filters.name, mode: "insensitive" }
          } as Prisma.UserWhereInput,
        };
      } else {
        where.inquilino = { nome: { contains: filters.name, mode: "insensitive" } };
      }
    }
    if (filters.startDate || filters.endDate) {
      where.OR = [
        {
          checkIn: {
            gte: filters.startDate ? new Date(filters.startDate) : undefined,
            lte: filters.endDate ? new Date(filters.endDate) : undefined,
          },
        },
        {
          checkOut: {
            gte: filters.startDate ? new Date(filters.startDate) : undefined,
            lte: filters.endDate ? new Date(filters.endDate) : undefined,
          },
        },
      ];
    }
    if (filters.status && filters.status !== "all") {
      where.status = filters.status;
    }

    const [rentals, total] = await Promise.all([
      prisma.aluguel.findMany({
        where,
        include: {
          imovel: {
            include: { proprietario: true },
          },
          inquilino: true,
          contrato: true,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.aluguel.count({ where }),
    ]);

    return {
      rentals,
      total,
      totalPages: Math.ceil(total / pageSize),
      currentPage: page,
    };
  }
}