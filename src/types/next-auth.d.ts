// src/types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      role: string; // Adiciona o campo `role` como string
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string; // Adiciona o campo `role` como string
  }

  interface JWT {
    role: string; // Adiciona o campo `role` ao token JWT
  }
}
