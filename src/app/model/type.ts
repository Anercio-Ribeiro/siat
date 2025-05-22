import { Aluguel, Imovel, Role, Session } from "@prisma/client";

export type UtilizadorCustom = {
    id: string;
    nome: string;
    username: string;
    email: string;
    telefone: string;
    role: Role;
    //favoritoIds: string[];
    alugueis: Aluguel[];  // Use o tipo correto para 'alugueis'
    imoveis: Imovel[];    // Use o tipo correto para 'imoveis'
    session: Session[];  
    senha: string;   // Use o tipo correto para 'sessao'
  };
  

  export type Utilizador = {
    id: string;
    nome: string;
    username: string;
    email: string;
    senha: string;
    telefone: string;
    role: Role;
    //favoritoIds: string[];
    criadoEm: Date;
    atualizadoEm: Date;
}

// export interface ImovelLDto {
//   imagens: { url: string }[];
//   id: string;
//   titulo: string;
//   preco: number;
//   localizacao: string;
//   bairro: string;
//   provincia: string;
//   tipologia: string;
//   numeroQuarto: number;
//   numeroCasaBanho: number;
//   garagem: number;

// }

export interface ImovelLDto {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  precoMensal?: number;
  tipoAluguel?: string;
  endereco: string;
  provincia: string;
  municipio: string;
  bairro: string;
  numeroQuarto: number;
  numeroCasaBanho: number;
  garagem: number;
  tipologia: string;
  criadoEm: string;
  atualizadoEm: string;
  proprietarioId?: string;
  imagens: { url: string }[];
  latitude: number;
  longitude: number;
  status: boolean;
  proprietario: {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    role: string;
  
  };
  proximidades?: string;
}

export interface Favorite {
  id: string;
  userId: string;
  criadoEm: string;
  atualizadoEm: string;
  imovelId: string;
  countFavoritos: number;
  imovel: ImovelLDto;
  
  // Nested imovel matches ImovelLDto
}


// export interface ImovelLDto {
//     id: string;
//     titulo: string;
//     descricao: string;
//     preco: number;
//     proprietarioId: string;
//     endereco: string;
//     provincia: string;
//     bairro: string;
//     numeroQuarto: number;
//     numeroCasaBanho: number;
//     tipologia: string;
//     criadoEm: Date;
//     atualizadoEm: Date;
//     garagem: number;
//     latitude: number;
//     longitude: number;
//     municipio: string;
//     precoMensal?: number | null;
//     tipoAluguel: 'RESIDENCIAL' | 'TURISTICO';
//     visualizacoes: number;
//     imagens: { id: string; url: string; imovelId: string; criadoEm: Date; atualizadoEm: Date }[];
//     proprietario: { id: string; nome: string; email: string; telefone: string; picture?: string | null; role: 'INQUILINO' | 'PROPRIETARIO' | 'ADMIN'; criadoEm: Date; atualizadoEm: Date };
//   }

export interface FavoriteImovel {
  id: string;
  criadoEm: Date;
  atualizadoEm: Date;
  titulo: string;
  descricao: string;
  preco: number;
  proprietarioId: string;
  endereco: string;
  provincia: string;
  bairro: string;
  numeroQuarto: number;
  numeroCasaBanho: number;
  tipologia: string;
  garagem: number;
  visualizacoes: number;
  imagens?: { url: string }[];
}
export interface Proximidades { 
  nome: string;
  latitude: number;
  longitude: number;
  tipo: string;
  distancia: string;
}[];

// types/User.ts
export interface User {
  nome: string;
  email: string;
  picture?: string;
  id: string;
  role?: string;
  alugueis?: {
    id: string;
    imovelId: string;
    inquilinoId: string;
    periodoAluguel: number;
    checkIn: string;
    checkOut: string;
    status: string;
  }

}


// model Aluguel {
//   id             String    @id @default(uuid())
//   imovelId       String
//   inquilinoId    String
//   periodoAluguel Int
//   contratoUrl    String?
//   criadoEm       DateTime  @default(now())
//   atualizadoEm   DateTime  @updatedAt
//   checkIn        DateTime
//   checkOut       DateTime
//   status         String
//   imovel         Imovel    @relation(fields: [imovelId], references: [id])
//   inquilino      User      @relation(fields: [inquilinoId], references: [id])
//   contrato       Contrato?
// }


export interface PaginationParams {
  skip: number;
  take: number;
}

export interface Favorito {
  id: string;
  userId: string;
  imovelId: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface DashboardStats {
  neighborhoods: {
    name: string;
    rentalCount: number;
  }[];
  avgPrices: {
    neighborhood: string;
    averagePrice: number;
  }[];
  propertyTypes: {
    type: string;
    count: number;
  }[];
}


export interface RentalFilters {
  imovelId?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}
