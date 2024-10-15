import { Aluguel, Imovel, Role, Session } from "@prisma/client";

export type UtilizadorCustom = {
    id: string;
    nome: string;
    username: string;
    email: string;
    telefone: string;
    role: Role;
    favoritoIds: string[];
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
    favoritoIds: string[];
    criadoEm: Date;
    atualizadoEm: Date;
}