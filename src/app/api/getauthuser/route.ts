// app/api/get-user/route.js
import { cookies } from 'next/headers';
import { lucia } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';
import { UtilizadorService } from '@/app/services/utilizadorService';


export async function GET() {

const utilizadorService = new UtilizadorService();
    const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
    if (!sessionId) {
        return null;
    }
    
    const { session, user } = await lucia.validateSession(sessionId);
    if (!session) {
        return null;
    }

    const dbUser = await await utilizadorService.encontrarUtilizadorPorId(user.id);

    console.log(dbUser?.username)
    const userLogged  = dbUser?.nome

    //return dbUser;
    return new Response(JSON.stringify(dbUser), { status: 200 });
};

