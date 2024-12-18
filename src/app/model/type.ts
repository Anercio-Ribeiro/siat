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

export interface ImovelLDto {
  imagens: { url: string }[];
  id: string;
  titulo: string;
  preco: number;
  localizacao: string;
  bairro: string;
  provincia: string;
  tipologia: string;
  numeroQuarto: number;
  numeroCasaBanho: number;
  garagem: number;

}

// types/User.ts
export interface User {
  nome: string;
  email: string;
  picture?: string;
}
