import { Lucia } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { prisma } from './prisma'
import { cookies } from 'next/headers'

const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        name: 'elliott-auth-cookie',
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production'
        }
    }
})

export const getUser = async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
    if (!sessionId) {
        return null;
    }
    
    const { session, user } = await lucia.validateSession(sessionId);
    if (!session) {
        return null;
    }

    const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
            nome: true,
            email: true,
            telefone: true,
            role: true, 
        },
    });

    console.log(dbUser)

    return dbUser;
};
