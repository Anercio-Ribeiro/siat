// src/repositories/utilizadorRepository.ts
import { prisma } from '@/lib/prisma';
import { Role, User } from '@prisma/client';
import { UtilizadorCustom } from '../model/type';

export class UtilizadorRepository {

  async criarUtilizador(data: Omit<User, 'id'>): Promise<User> {
    const currentDate = new Date();
    const utilizadorData = {
      ...data,
      criadoEm: currentDate,
      atualizadoEm: currentDate
    };
    return await prisma.user.create({
      data: utilizadorData,
    });
  }

  // async criarBulkUtilizador(data: Omit<User, 'id'>): Promise<User> {
  //   const currentDate = new Date();
  //   const utilizadorData = {
  //     ...data,
  //     criadoEm: currentDate,
  //     atualizadoEm: currentDate
  //   };
  //   return await prisma.user.createMany({
  //     data: utilizadorData,
  //   });
  // }

  async criarBulkUtilizador(data: Omit<User, 'id'>[]): Promise<void> {
    await prisma.user.createMany({
      data: data,
      skipDuplicates: true, // Evita erro se algum usuário duplicado passar pela validação
    });
  }

  async encontrarUtilizadorPorId(id: string): Promise<UtilizadorCustom | null> {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        nome: true,
        username: true,
        email: true,
        telefone: true,
        role: true,
        picture: true,
        //favoritoIds: true,
        alugueis: true,
        imoveis: true,
        session: true,
        senha: true,
        id: true,
      },
    });
  }

  async encontrarUtilizadorPorUsername(username: string): Promise<UtilizadorCustom | null> {
    return await prisma.user.findFirst({
      where: { username: username },
      select: {
        nome: true,
        username: true,
        email: true,
        telefone: true,
        role: true,
        //favoritoIds: true,
        alugueis: true,
        imoveis: true,
        session: true,
        senha: true,
        id: true,
      },
    });
  }

  async atualizarUtilizador(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async deletarUtilizador(id: string): Promise<User> {
    return await prisma.user.delete({
      where: { id },
    });
  }

  async listarUtilizadores(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  // async encontrarPrimeiroUtilizador(): Promise<Utilizador | null> {
  //   const utilizador = prisma.utilizador.findFirst()
     
  //   return utilizador;
  // }
  async encontrarPrimeiroUtilizador(): Promise<string | null> {
    return prisma.user.findFirst({
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
