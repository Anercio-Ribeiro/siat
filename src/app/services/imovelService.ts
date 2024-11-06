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

  async listarImoveis(): Promise<Imovel[]> {
    return await this.imovelRepo.listarImoveis();
  }

  async encontrarPrimeiroImovel(): Promise<Imovel | null> {
    return await this.imovelRepo.encontrarPrimeiroImovel();
  }

  // async getAllImoveis(precoMin?: string, precoMax?: string, localizacao?: string, tipologia?: string, page: string = "1") {
  //   const pageSize = 10;
  //   const pageNumber = parseInt(page) || 1;
  //   const filters: any = {};

  //   if (precoMin) filters.preco = { gte: parseFloat(precoMin) };
  //   if (precoMax) filters.preco = { ...filters.preco, lte: parseFloat(precoMax) };
  //   if (localizacao) filters.bairro = { contains: localizacao, mode: "insensitive" };
  //   if (tipologia) filters.tipologia = { equals: tipologia };

  //   const imoveis = await this.imovelRepo.buscaImovelPor(filters, (pageNumber - 1) * pageSize, pageSize);
  //   const totalImoveis = await this.imovelRepo.count(filters);
  //   const totalPages = Math.ceil(totalImoveis / pageSize);

  //   return { imoveis, totalPages, pageNumber };
  // }

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

