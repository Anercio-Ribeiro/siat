// // app/api/get-user/route.js
// import { cookies } from 'next/headers';
// import { lucia } from '@/lib/lucia';
// import { prisma } from '@/lib/prisma';
// import { UtilizadorService } from '@/app/services/utilizadorService';


// export async function GET() {

// const utilizadorService = new UtilizadorService();
//     const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
//     if (!sessionId) {
//         return null;
//     }
    
//     const { session, user } = await lucia.validateSession(sessionId);
//     if (!session) {
//         return null;
//     }

//     const dbUser = await await utilizadorService.encontrarUtilizadorPorId(user.id);

//     console.log(dbUser?.username)
//     const userLogged  = dbUser?.nome

//     //return dbUser;
//     return new Response(JSON.stringify(dbUser), { status: 200 });
// };



// import { cookies } from 'next/headers';
// import { lucia } from '@/lib/lucia';
// import { UtilizadorService } from '@/app/services/utilizadorService';

// export async function GET() {
//   const utilizadorService = new UtilizadorService();
  
//   // Verifica o cookie de sessão
//   const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  
//   // Se não houver um sessionId, retorna 401 (não autenticado)
//   if (!sessionId) {
//     return new Response(
//       JSON.stringify({ message: 'Usuário não autenticado' }), 
//       { status: 401 }
//     );
//   }

//   // Valida a sessão
//   const { session, user } = await lucia.validateSession(sessionId);

//   // Se a sessão for inválida, retorna 401 (não autenticado)
//   if (!session) {
//     return new Response(
//       JSON.stringify({ message: 'Sessão inválida' }), 
//       { status: 401 }
//     );
//   }

//   // Se a sessão for válida, busca o usuário no banco de dados
//   const dbUser = await utilizadorService.encontrarUtilizadorPorId(user.id);

//   // Caso o usuário não seja encontrado no banco de dados
//   if (!dbUser) {
//     return new Response(
//       JSON.stringify({ message: 'Usuário não encontrado' }), 
//       { status: 404 }
//     );
//   }

//   // Retorna os dados do usuário com status 200
//   return new Response(JSON.stringify(dbUser), { status: 200 });
// };





// // api/getauthuser/route.ts
// import { cookies } from 'next/headers';
// import { lucia } from '@/lib/lucia';
// import { UtilizadorService } from '@/app/services/utilizadorService';

// export async function GET() {
//   try {
//     const utilizadorService = new UtilizadorService();
//     const sessionId = cookies().get(lucia.sessionCookieName)?.value;

//     if (!sessionId) {
//       return new Response(null, { status: 401 });
//     }

//     const { session, user } = await lucia.validateSession(sessionId);

//     if (!session) {
//       // Limpa o cookie se a sessão for inválida
//       cookies().delete(lucia.sessionCookieName);
//       return new Response(null, { status: 401 });
//     }

//     const dbUser = await utilizadorService.encontrarUtilizadorPorId(user.id);

//     if (!dbUser) {
//       return new Response(null, { status: 401 });
//     }

//     return new Response(JSON.stringify(dbUser), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (error) {
//     console.error('Erro ao validar sessão:', error);
//     return new Response(null, { status: 401 });
//   }
// }



// import { cookies } from 'next/headers';
// import { lucia } from '@/lib/lucia';
// import { UtilizadorService } from '@/app/services/utilizadorService';

// export async function GET() {
//   try {
//     const utilizadorService = new UtilizadorService();
//     const sessionId = cookies().get(lucia.sessionCookieName)?.value;

//     if (!sessionId) {
//       return new Response(JSON.stringify({ error: "Não autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
//     }

//     const { session, user } = await lucia.validateSession(sessionId);

//     if (!session) {
//       // Limpa o cookie se a sessão for inválida
//       cookies().delete(lucia.sessionCookieName);
//       return new Response(JSON.stringify({ error: "Sessão inválida" }), { status: 401, headers: { "Content-Type": "application/json" } });
//     }

//     return new Response(JSON.stringify(user), { status: 200, headers: { "Content-Type": "application/json" } });

//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Erro interno" }), { status: 500, headers: { "Content-Type": "application/json" } });
//   }
// }


import { cookies } from 'next/headers';
import { lucia } from '@/lib/lucia';
import { UtilizadorService } from '@/app/services/utilizadorService';

export async function GET() {
  try {
    const utilizadorService = new UtilizadorService();
    const sessionId = cookies().get(lucia.sessionCookieName)?.value;

    if (!sessionId) {
      return new Response(null, { status: 401 });
    }

    const { session, user } = await lucia.validateSession(sessionId);

    if (!session) {
      // Limpa o cookie se a sessão for inválida
      cookies().delete(lucia.sessionCookieName);
      return new Response(null, { status: 401 });
    }

    const dbUser = await utilizadorService.encontrarUtilizadorPorId(user.id);

    if (!dbUser) {
      return new Response(null, { status: 401 });
    }

    return new Response(JSON.stringify(dbUser), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao validar sessão:', error);
    return new Response(null, { status: 401 });
  }
}