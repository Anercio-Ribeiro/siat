import { prisma } from "@/lib/prisma";

export class FavoritosRepository {
    async addToFavorites(userId: string, imovelId: string) {
      var countFavoritos  = 0;
      countFavoritos = countFavoritos +1 ;
      return await prisma.favoritos.create({
        data: {
          userId,
          imovelId,
          countFavoritos
          
        },
      });
    }
  
    async removeFromFavorites(userId: string, imovelId: string) {
      return await prisma.favoritos.delete({
        where: {
          userId_imovelId: {
            userId,
            imovelId,
          },
        },
      });
    }
  
    async getFavoritesByUser(userId: string) {
      return await prisma.favoritos.findMany({
        where: {
          userId,
        },
        include: {
          imovel: {
            include: { imagens: true },
          }
        },
      });
    }
  
    async checkIsFavorite(userId: string, imovelId: string) {
      const favorite = await prisma.favoritos.findUnique({
        where: {
          userId_imovelId: {
            userId,
            imovelId,
          },
        },
      });
      return !!favorite;
    }


      // async getUserFavorites(userId: string) {
      //   return await prisma.favoritos.findMany({
      //     where: {
      //       userId,
      //     },
      //     include: {
      //       imovel: {
      //         include: {
      //           imagens: true, // Include property images
      //         },
      //       },
      //     },
      //   });
      // }
      // async checkUserRole(userId: string): Promise<string | null> {
      //   const user = await prisma.user.findUnique({
      //     where: { id: userId },
      //     select: { role: true },
      //   });
      //   return user?.role ?? null;
      // }


      async getUserFavorites(userId: string) {
        const favorites = await prisma.favoritos.findMany({
          where: { userId },
          include: {
            imovel: {
              include: {
                imagens: true,
                proprietario: {
                  select: {
                    id: true,
                    nome: true,
                    email: true,
                    role: true,
                  }
                }
              }
            },
          },
        });
        return favorites;
      }
    
      async checkUserRole(userId: string): Promise<string | null> {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { role: true },
        });
        return user?.role ?? null;
      }
    }
  