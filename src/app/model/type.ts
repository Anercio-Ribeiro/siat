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
  imagens: { url: string }[];
  latitude: number;
  longitude: number;
  proprietario: {
    id: string;
    nome: string;
    email: string;
    role: string;
  
  };
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
}
