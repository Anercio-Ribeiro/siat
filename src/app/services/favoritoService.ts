import { FavoritosRepository } from '../repositories/favoritosRepository';

export class FavoritosService {

  private favoritoRepo = new FavoritosRepository();


  async toggleFavorite(userId: string, imovelId: string) {
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
}
