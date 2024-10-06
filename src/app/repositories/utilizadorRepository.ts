// src/repositories/utilizadorRepository.ts
import { prisma } from '@/lib/prisma';
import { Utilizador } from '@prisma/client';

export class UtilizadorRepository {
  async criarUtilizador(data: Omit<Utilizador, 'id'>): Promise<Utilizador> {
    return await prisma.utilizador.create({
      data,
    });
  }

  async encontrarUtilizadorPorId(id: string): Promise<Utilizador | null> {
    return await prisma.utilizador.findUnique({
      where: { id },
    });
  }

  async atualizarUtilizador(id: string, data: Partial<Omit<Utilizador, 'id'>>): Promise<Utilizador> {
    return await prisma.utilizador.update({
      where: { id },
      data,
    });
  }

  async deletarUtilizador(id: string): Promise<Utilizador> {
    return await prisma.utilizador.delete({
      where: { id },
    });
  }

  async listarUtilizadores(): Promise<Utilizador[]> {
    return await prisma.utilizador.findMany();
  }

  // async encontrarPrimeiroUtilizador(): Promise<Utilizador | null> {
  //   const utilizador = prisma.utilizador.findFirst()
     
  //   return utilizador;
  // }
  async encontrarPrimeiroUtilizador(): Promise<string | null> {
    return prisma.utilizador.findFirst({
      select: {
        id: true, // Seleciona apenas o campo 'id'
      },
    })
    .then(utilizador => {
      if (utilizador) {
        return utilizador.id; // Retorna o 'id' se o utilizador existir
      } else {
        return null; // Retorna 'null' se nenhum utilizador for encontrado
      }
    })
    .catch(error => {
      console.error("Erro ao buscar o primeiro utilizador:", error);
      return null; // Retorna 'null' se houver erro
    })
    .finally(() => {
      console.log("Operação concluída"); // Executado sempre após a Promise ser resolvida
    });
  }
  
  
}
