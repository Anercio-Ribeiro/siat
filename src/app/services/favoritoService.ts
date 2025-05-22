import { ImovelLDto } from '../model/type';
import { FavoritosRepository } from '../repositories/favoritosRepository';

export class FavoritosService {

  private favoritoRepo = new FavoritosRepository();


  // async toggleFavorite(userId: string, imovelId: string) {
  //   const isFavorite = await this.favoritoRepo.checkIsFavorite(userId, imovelId);
    
  //   if (isFavorite) {
  //     await this.favoritoRepo.removeFromFavorites(userId, imovelId);
  //     return false;
  //   } else {
  //     await this.favoritoRepo.addToFavorites(userId, imovelId);
  //     return true;
  //   }
  // }



  async toggleFavorite(userId: string, imovelId: string) {
    // Verificar se o imóvel existe e obter o proprietarioId
    const imovel = await this.favoritoRepo.getImovelById(imovelId);
  
    if (!imovel) {
      throw new Error("Imóvel não encontrado.");
    }
  
    // Verificar se o usuário é o proprietário do imóvel
    if (imovel.proprietarioId === userId) {
      throw new Error("Você não pode adicionar seu próprio imóvel aos favoritos.");
    }
  
    const isFavorite = await this.favoritoRepo.checkIsFavorite(userId, imovelId);
  
    if (isFavorite) {
      await this.favoritoRepo.removeFromFavorites(userId, imovelId);
      return false;
    } else {
      await this.favoritoRepo.addToFavorites(userId, imovelId);
      return true;
    }
  }


  async getUserFavorites(userId: string) {
    return await this.favoritoRepo.getFavoritesByUser(userId);
  }

  async checkIsFavorite(userId: string, imovelId: string) {
    return await this.favoritoRepo.checkIsFavorite(userId, imovelId);
  }

  async getFavoritesByUser(userId: string): Promise<ImovelLDto[]> {
    const role = await this.favoritoRepo.checkUserRole(userId);
    if (role !== "INQUILINO") {
      throw new Error("Apenas usuários com o papel INQUILINO podem acessar favoritos.");
    }

    const favorites = await this.favoritoRepo.getUserFavorites(userId);
    return favorites.map((fav) => ({
      id: fav.imovel.id,
      titulo: fav.imovel.titulo,
      preco: fav.imovel.preco || 0,
      provincia: fav.imovel.provincia,
      bairro: fav.imovel.bairro,
      numeroQuarto: fav.imovel.numeroQuarto,
      numeroCasaBanho: fav.imovel.numeroCasaBanho,
      tipologia: fav.imovel.tipologia,
      garagem: fav.imovel.garagem,
      status: fav.imovel.status ? fav.imovel.status : true,
      imagens: fav.imovel.imagens?.map((img: { url: string }) => ({ url: img.url })) || [],
      descricao: fav.imovel.descricao || "Descrição não disponível",
      endereco: fav.imovel.endereco || "Endereço não disponível",
      municipio: fav.imovel.municipio || "Município não disponível",
      criadoEm: fav.imovel.criadoEm instanceof Date
        ? fav.imovel.criadoEm.toISOString()
        : fav.imovel.criadoEm || new Date().toISOString(), // Convert Date to string
      atualizadoEm: fav.imovel.atualizadoEm instanceof Date
        ? fav.imovel.atualizadoEm.toISOString()
        : fav.imovel.atualizadoEm || new Date().toISOString(), // Convert Date to string
      latitude: fav.imovel.latitude || 0, // Default to 0 if null
      longitude: fav.imovel.longitude || 0, // Default to 0 if null
      proprietario: {
        id: fav.imovel.proprietario.id,
        nome: fav.imovel.proprietario.nome,
        email: fav.imovel.proprietario.email,
        role: fav.imovel.proprietario.role,
        telefone: fav.imovel.proprietario.telefone || "Telefone não disponível",
      },
    }));
  }
}
