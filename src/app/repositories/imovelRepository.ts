import { prisma } from '@/lib/prisma';
import { Imovel } from '@prisma/client';

export class ImovelRepository {
  async criarImovel(data: Omit<Imovel, 'id'>): Promise<Imovel> {
    return await prisma.imovel.create({
      data,
    });
  }

  // async encontrarImovelPorId(id: string): Promise<Imovel | null> {
  //   return await prisma.imovel.findUnique({
  //     where: { id },
  //     include: { proximidades: true, proprietario: true }, // Incluindo proximidades se necessário
  //   });
  // }

  async encontrarImovelPorId(id: string): Promise<Imovel | null> {
    return await prisma.imovel.findUnique({
      where: { id },
      include: {
        proximidades: true,
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
    });
  }

  async deletarImovel(id: string): Promise<Imovel> {
    return await prisma.imovel.delete({
      where: { id },
    });
  }

  async listarImoveis(): Promise<Imovel[]> {
    return await prisma.imovel.findMany({
      include: {
        proximidades: true,
        proprietario: {
          select: {
            id: true,
            nome: true,
            email: true,
            role: true,
          },
        },
      }
    }
    );
  }

  async encontrarPrimeiroImovel(): Promise<Imovel | null> {
    return await prisma.imovel.findFirst();
  }
}
