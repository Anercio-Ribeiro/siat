
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



export const dynamic = 'force-dynamic';

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