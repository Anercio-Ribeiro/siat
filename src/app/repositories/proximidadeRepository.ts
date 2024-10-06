// src/repositories/proximidadeRepository.ts
import { prisma } from '@/lib/prisma';
import { Proximidade } from '@prisma/client';

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

  async listarProximidades(): Promise<Proximidade[]> {
    return await prisma.proximidade.findMany();
  }
}
