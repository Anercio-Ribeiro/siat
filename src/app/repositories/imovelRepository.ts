import { prisma } from '@/lib/prisma';
import { Imovel } from '@prisma/client';

export class ImovelRepository {

  async criarImovel(data: Omit<Imovel, 'id'>): Promise<Imovel> {
    return await prisma.imovel.create({
      data,
      include: { imagens: true, proximidades: true }, // Inclui as relações criadas
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
        imagens: {
          select: {
            url: true,
          }
        }
      }
    }
    );
  }

  async encontrarPrimeiroImovel(): Promise<Imovel | null> {
    return await prisma.imovel.findFirst();
  }


  async buscarImoveis(filters: any, skip: number, take: number) {
    return prisma.imovel.findMany({
      where: filters,
      skip,
      take,
    });
  }

  async contarImoveis(filters: any) {
    return prisma.imovel.count({
      where: filters,
    });
  }
}

