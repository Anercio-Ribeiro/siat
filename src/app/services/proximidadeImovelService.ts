// // src/app/services/proximidadeService.ts
// import { Proximidade, ProximidadeImovel } from "@prisma/client";
// import { ProximidadeRepository } from "../repositories/proximidadeRepository";
// import { ProximidadeImovelRepository } from "../repositories/proximidadeImovelRepository";

// export class ProximidadeImovelService {
//   private proximidadeRepository: ProximidadeImovelRepository;

//   constructor() {
//     this.proximidadeRepository = new ProximidadeImovelRepository();
//   }

//   async getProximidadesByTipo(tipo: string): Promise<{ Proximidade: ProximidadeImovel[] }> {
//     const proximidades = await this.proximidadeRepository.findByTipo(tipo);

//     // Format the response to match the desired structure
//     return {
//       Proximidade: proximidades,
//     };
//   }
// }







import { ProximidadeImovel } from "@prisma/client";
import { ProximidadeImovelRepository } from "../repositories/proximidadeImovelRepository";

export class ProximidadeImovelService {
  private proximidadeRepository: ProximidadeImovelRepository;

  constructor() {
    this.proximidadeRepository = new ProximidadeImovelRepository();
  }

  async getProximidadesByTipo(
    tipo: string,
    page: number = 1,
    pageSize: number = 8
  ): Promise<{ Proximidade: any[] }> {
    const proximidades = await this.proximidadeRepository.findByTipo(
      tipo,
      page,
      pageSize
    );

    return {
      Proximidade: proximidades,
    };
  }
}