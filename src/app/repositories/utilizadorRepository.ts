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

  async criarBulkUtilizador(data: Omit<User, 'id'>[]): Promise<void> {
    await prisma.user.createMany({
      data: data,
      skipDuplicates: true, // Evita erro se algum usuário duplicado passar pela validação
    });
  }

  async encontrarUtilizadorPorId(id: string): Promise<UtilizadorCustom | null> {
    const user = await prisma.user.findUnique({
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
        estado: true,
      },
    });
    if (user) {
      return {
        ...user,
        estado: user.estado ?? false, // Ensure 'estado' is boolean
      };
    }
    return null;
  }

  async encontrarUtilizadorPorUsername(username: string): Promise<UtilizadorCustom | null> {
    const user = await prisma.user.findFirst({
      where: { username: username },
      select: {
        nome: true,
        username: true,
        email: true,
        telefone: true,
        role: true,
        estado: true,
        alugueis: true,
        imoveis: true,
        session: true,
        senha: true,
        id: true,
      },
    });
    if (user) {
      return {
        ...user,
        estado: user.estado ?? false, // Ensure 'estado' is boolean
      };
    }
    return null;
  }

  async encontrarUtilizadorPorEmail(email: string): Promise<UtilizadorCustom | null> {
    const user = await prisma.user.findFirst({
      where: { email: email },
      select: {
        nome: true,
        username: true,
        email: true,
        telefone: true,
        role: true,
        alugueis: true,
        imoveis: true,
        session: true,
        senha: true,
        id: true,
        estado: true,
      },
    });
    if (user) {
      return {
        ...user,
        estado: user.estado ?? false, // Ensure 'estado' is boolean
      };
    }
    return null;
  }

    async encontrarUtilizadorPorTelefone(telefone: string): Promise<UtilizadorCustom | null> {
    const user = await prisma.user.findFirst({
      where: { telefone: telefone },
      select: {
        nome: true,
        username: true,
        email: true,
        telefone: true,
        role: true,
        alugueis: true,
        imoveis: true,
        session: true,
        senha: true,
        id: true,
        estado: true,
      },
    });
    if (user) {
      return {
        ...user,
        estado: user.estado ?? false, // Ensure 'estado' is boolean
      };
    }
    return null;
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

async findAll({
    page = 1,
    pageSize = 10,
    name,
    role,
    status,
  }: {
    page?: number;
    pageSize?: number;
    name?: string;
    role?: Role;
    status?: boolean;
  }): Promise<{ users: User[]; total: number; totalPages: number; currentPage: number }> {
    const skip = (page - 1) * pageSize;
    const where: any = {};

    if (name) {
      where.nome = { contains: name, mode: 'insensitive' };
    }
    if (role) {
      where.role = role;
    }
    if (status !== undefined) {
      where.estado = status;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { criadoEm: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users,
      total,
      totalPages: Math.ceil(total / pageSize),
      currentPage: page,
    };
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

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
