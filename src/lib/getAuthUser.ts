// utils/getAuthenticatedUser.ts
import { cookies } from 'next/headers';
import { lucia } from '@/lib/lucia';
import { UtilizadorService } from '@/app/services/utilizadorService';
import { NextResponse } from 'next/server';

export async function getAuthenticatedUser() {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;

    if (!sessionId) {
        return null;
        
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (!session) {
        throw new Error("Sessão inválida");
    }

    const utilizadorService = new UtilizadorService();
    const dbUser = await utilizadorService.encontrarUtilizadorPorId(user.id);

    if (!dbUser) {
        throw new Error("Proprietário não encontrado");
    }
//TODO: Remover logs em produção
    //console.log(dbUser);
    return dbUser; // Retorna o usuário completo do banco de dados
}
