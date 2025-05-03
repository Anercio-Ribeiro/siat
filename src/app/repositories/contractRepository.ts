import { prisma } from "@/lib/prisma";
import { PrismaClient, Contrato, Aluguel } from "@prisma/client";

export class ContractRepository {
  // Criar um contrato
  async createContract(data: {
    aluguelId: string;
    dataInicio: Date;
    dataFim: Date;
    valorTotal: number;
    termosContrato: string;
    urlDocumento?: string;
  }): Promise<Contrato> {
    return await prisma.contrato.create({
      data,
    });
  }

  // Buscar contrato por ID
  async findContractById(id: string): Promise<Contrato | null> {
    return await prisma.contrato.findUnique({
      where: { id },
    });
  }

  // Buscar contrato por aluguelId
  async findContractByAluguelId(aluguelId: string): Promise<Contrato | null> {
    return await prisma.contrato.findUnique({
      where: { aluguelId },
    });
  }

  // Atualizar contrato
  async updateContract(
    id: string,
    data: {
      dataInicio?: Date;
      dataFim?: Date;
      valorTotal?: number;
      termosContrato?: string;
      urlDocumento?: string;
    }
  ): Promise<Contrato> {
    return await prisma.contrato.update({
      where: { id },
      data,
    });
  }

  // Deletar contrato
  async deleteContract(id: string): Promise<Contrato> {
    return await prisma.contrato.delete({
      where: { id },
    });
  }

  // Atualizar status do aluguel (mantido para integração)
  async updateRentalStatus(aluguelId: string, status: string): Promise<Aluguel> {
    return await prisma.aluguel.update({
      where: { id: aluguelId },
      data: { status },
      include: { imovel: true, inquilino: true, contrato: true },
    });
  }

  // Buscar aluguel por ID
  async findRentalById(aluguelId: string): Promise<Aluguel | null> {
    return await prisma.aluguel.findUnique({
      where: { id: aluguelId },
      include: { imovel: true, inquilino: true, contrato: true },
    });
  }


//   async getContratosByInquilinoId(inquilinoId: string) {
//     return prisma.contrato.findMany({
//       where: {
//         aluguel: {
//           inquilinoId,
//           status: "Concluído",
//         },
//       },
//       include: {
//         aluguel: {
//           include: {
//             imovel: {
//               include: {
//                 proprietario: {
//                   select: {
//                     id: true,
//                     nome: true,
//                     email: true,
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     });
//   }

//   async getContratosByProprietarioId(proprietarioId: string) {
//     return prisma.contrato.findMany({
//       where: {
//         aluguel: {
//           imovel: {
//             proprietarioId,
//           },
//           status: "Concluído",
//         },
//       },
//       include: {
//         aluguel: {
//           include: {
//             imovel: {
//               select: {
//                 id: true,
//                 titulo: true,
//                 endereco: true,
//                 bairro: true,
//                 provincia: true,
//               },
//             },
//             inquilino: {
//               select: {
//                 id: true,
//                 nome: true,
//                 email: true,
//               },
//             },
//           },
//         },
//       },
//     });
//   }

//   async getContratoById(id: string) {
//     return prisma.contrato.findUnique({
//       where: { id },
//       include: {
//         aluguel: {
//           include: {
//             imovel: {
//               include: {
//                 proprietario: {
//                   select: {
//                     id: true,
//                     nome: true,
//                     email: true,
//                   },
//                 },
//               },
//             },
//             inquilino: {
//               select: {
//                 id: true,
//                 nome: true,
//                 email: true,
//               },
//             },
//           },
//         },
//       },
//     });
//   }
// }


  async getContratosByInquilinoId(
    inquilinoId: string,
    page: number = 1,
    pageSize: number = 10
  ) {
    const skip = (page - 1) * pageSize;
    return prisma.contrato.findMany({
      where: {
        aluguel: {
          inquilinoId,
          status: "Concluído",
        },
      },
      include: {
        aluguel: {
          include: {
            imovel: {
              include: {
                proprietario: {
                  select: {
                    id: true,
                    nome: true,
                    email: true,
                  },
                },
              },
            },
            inquilino: {
              select: {
                id: true,
                nome: true,
                email: true,
              },
            },
          },
        },
      },
      take: pageSize,
      skip,
    });
  }

  async countContratosByInquilinoId(inquilinoId: string) {
    return prisma.contrato.count({
      where: {
        aluguel: {
          inquilinoId,
          status: "Concluído",
        },
      },
    });
  }

  async getContratosByProprietarioId(
    proprietarioId: string,
    page: number = 1,
    pageSize: number = 10
  ) {
    const skip = (page - 1) * pageSize;
    return prisma.contrato.findMany({
      where: {
        aluguel: {
          imovel: {
            proprietarioId,
          },
        },
      },
      include: {
        aluguel: {
          include: {
            imovel: {
              include: {
                proprietario: {
                  select: {
                    id: true,
                    nome: true,
                    email: true,
                  },
                },
              },
            },
            inquilino: {
              select: {
                id: true,
                nome: true,
                email: true,
              },
            },
          },
        },
      },
      take: pageSize,
      skip,
    });
  }

  async countContratosByProprietarioId(proprietarioId: string) {
    return prisma.contrato.count({
      where: {
        aluguel: {
          imovel: {
            proprietarioId,
          },
        },
      },
    });
  }

  async getContratoById(id: string) {
    return prisma.contrato.findUnique({
      where: { id },
      include: {
        aluguel: {
          include: {
            imovel: {
              include: {
                proprietario: {
                  select: {
                    id: true,
                    nome: true,
                    email: true,
                  },
                },
              },
            },
            inquilino: {
              select: {
                id: true,
                nome: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }
};









