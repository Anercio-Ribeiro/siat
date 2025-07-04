import { UtilizadorCustom } from '../model/type';
import { UtilizadorRepository } from '../repositories/utilizadorRepository';
import { Role, User } from '@prisma/client';

const utilizadorRepo = new UtilizadorRepository();

export class UtilizadorService {
  async criarUtilizador(data: Omit<User, 'id'>): Promise<User> {
    return await utilizadorRepo.criarUtilizador(data);
  }

  async encontrarUtilizadorPorId(id: string): Promise<UtilizadorCustom | null> {
    return await utilizadorRepo.encontrarUtilizadorPorId(id);
  }

  async encontrarUtilizadorPorUsername(username: string): Promise<UtilizadorCustom | null> {
    return await utilizadorRepo.encontrarUtilizadorPorUsername(username);
  }

   async encontrarUtilizadorPorEmail(email: string): Promise<UtilizadorCustom | null> {
    return await utilizadorRepo.encontrarUtilizadorPorEmail(email);
  }

     async encontrarUtilizadorPorTelefone(telefone: string): Promise<UtilizadorCustom | null> {
    return await utilizadorRepo.encontrarUtilizadorPorTelefone(telefone);
  }

  async atualizarUtilizador(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
    return await utilizadorRepo.atualizarUtilizador(id, data);
  }

  async deletarUtilizador(id: string): Promise<User> {
    return await utilizadorRepo.deletarUtilizador(id);
  }

  // async listarUtilizadores(): Promise<User[]> {
  //   return await utilizadorRepo.listarUtilizadores();
  // }


  async listarUtilizadores({
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
    return utilizadorRepo.findAll({ page, pageSize, name, role, status });
  }

  // async encontrarUtilizadorPorId(id: string): Promise<User | null> {
  //   return utilizadorRepo.findById(id);
  // }

  // async atualizarUtilizador(id: string, data: Partial<User>): Promise<User> {
  //   return this.utilizadorRepository.update(id, data);
  // }

  async encontrarPrimeiroUtilizadorId(): Promise<string | null> {
    try {
      const id = await utilizadorRepo.encontrarPrimeiroUtilizador();
      return id;
    } catch (error) {
      console.error("Error in service:", error);
      return null;
    }
};

async criarBulkUtilizador(data: Omit<User, 'id'>[]): Promise<void> {
  await utilizadorRepo.criarBulkUtilizador(data);
}

}
