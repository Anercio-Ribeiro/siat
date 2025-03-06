import { ImovelRepository } from '../repositories/imovelRepository';
import { Imovel } from '@prisma/client';


export class ImovelService {

  private imovelRepo: ImovelRepository;

  constructor() {
    this.imovelRepo = new ImovelRepository();
  }
  async criarImovel(data: Omit<Imovel, 'id'>): Promise<Imovel> {

    return await this.imovelRepo.criarImovel(data);
  }

  async encontrarImovelPorId(id: string): Promise<Imovel | null> {
    return await this.imovelRepo.encontrarImovelPorId(id);
  }

  async atualizarImovel(id: string, data: Partial<Omit<Imovel, 'id'>>): Promise<Imovel> {
    return await this.imovelRepo.atualizarImovel(id, data);
  }

  async deletarImovel(id: string): Promise<Imovel> {
    return await this.imovelRepo.deletarImovel(id);
  }

  // async listarImoveis(): Promise<Imovel[]> {
  //   return await this.imovelRepo.listarImoveis();
  // }

  async listarImoveis(page: number = 1, pageSize: number = 6, userId?: string): Promise<{ imoveis: Imovel[], total: number, totalPages: number }> {
    const { imoveis, total } = await this.imovelRepo.listarImoveis(page, pageSize, userId);
    const totalPages = Math.ceil(total / pageSize);
    
    return { imoveis, total, totalPages };
  }


  async buscarImoveisBy(filters: any, skip: number, take: number) {
    try {
      return await this.imovelRepo.buscarImoveis(filters, skip, take);
    } catch (error) {
      throw new Error('Erro ao buscar imóveis: ' + error);
    }
  }

  // Método para contar o total de imóveis que atendem aos filtros
  async contarImoveis(filters: any) {
    try {
      return await this.imovelRepo.contarImoveis(filters);
    } catch (error) {
      throw new Error('Erro ao contar imóveis: ' + error);
    }
  }

}

