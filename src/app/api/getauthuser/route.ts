// app/api/get-user/route.js
import { cookies } from 'next/headers';
import { lucia } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';
import { UtilizadorService } from '@/app/services/utilizadorService';


export async function GET() {
//   const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
//   const utilizadorService = new UtilizadorService();
//   if (!sessionId) {
//     return new Response(JSON.stringify(null), { status: 401 });
//   }

//   const { session, user } = await lucia.validateSession(sessionId);
//   if (!session) {
//     return new Response(JSON.stringify(null), { status: 401 });
//   }

//   //const dbUser = await utilizadorService.encontrarUtilizadorPorId(user.id);

// const dbUser = prisma.user.findUnique({
//     where: { id: user.id },
//     select: {
//       nome: true,
//       email: true,
//       username: true,
//       //picture: true,
//       role: true,
//      },
//   });

//   console.log(dbUser);


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
            ///picture: true,
            role: true, // Ensure role is included
        },
    });

    console.log(dbUser)

    //return dbUser;
    return new Response(JSON.stringify(dbUser), { status: 200 });
};

