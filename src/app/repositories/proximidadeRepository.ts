import { prisma } from '@/lib/prisma';
import { Proximidade } from '@prisma/client';
import { PaginationParams } from '../model/type';

export class ProximidadeRepository {
  async criarProximidade(data: Omit<Proximidade, 'id'>): Promise<Proximidade> {
    return await prisma.proximidade.create({
      data,
    });
  }

  async encontrarProximidadePorId(id: string): Promise<Proximidade | null> {
    return await prisma.proximidade.findUnique({
      where: { id },
    });
  }

  async atualizarProximidade(id: string, data: Partial<Omit<Proximidade, 'id'>>): Promise<Proximidade> {
    return await prisma.proximidade.update({
      where: { id },
      data,
    });
  }

  async deletarProximidade(id: string): Promise<Proximidade> {
    return await prisma.proximidade.delete({
      where: { id },
    });
  }


  async listarProximidades({ skip, take }: PaginationParams) {
    // Update your database query to include skip/take
    return await prisma.proximidade.findMany({
      skip,
      take,
      orderBy: { /* your ordering */ }
    });
  }

  async countProximidades() {
    return await prisma.proximidade.count();
  }
}
