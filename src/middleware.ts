// // import { NextResponse } from 'next/server'
// // import type { NextRequest } from 'next/server'

// import { NextRequest, NextResponse } from "next/server";
// import { User } from "./app/model/type";

// async function getAuthUser(): Promise<User | null> {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getauthuser`, {
//       credentials: 'include', // Inclui cookies na requisição
//       headers: {
//         'Accept': 'application/json',
//       },
//     });
    
//     // Trata erro de autenticação
//     if (!response.ok) {
//       if (response.status === 401) {
//         console.log('Usuário não autenticado');
//         return null;
//       }
//       throw new Error(`Erro HTTP: ${response.status}`);
//     }
    
//     // Valida e retorna dados do usuário
//     const data = await response.json();
//     if (!data?.id || !data?.role) {
//       throw new Error('Dados de usuário inválidos');
//     }
    
//     return data as User;
//   } catch (error) {
//     console.error('Erro ao buscar usuário no middleware:', error);
//     return null;
//   }
// }

// export async function middleware(request: NextRequest) {
//   const user = await getAuthUser();
//   const pathname = request.nextUrl.pathname;
//   const protectedRoutes = ['/agendamentos', '/dashboard', '/proximidades', '/imovel'];

//   // Verifica se é uma rota protegida
//   const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

//   // Redireciona se não estiver autenticado e tentar acessar rota protegida
//   if (!user && isProtectedRoute) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   if (user) {
//     // Restrições para PROPRIETARIO
//     if (user.role === 'PROPRIETARIO' && pathname.startsWith('/proximidades')) {
//       return NextResponse.redirect(new URL('/', request.url));
//     }

//     // Restrições para INQUILINO
//     if (user.role === 'INQUILINO') {
//       if (pathname.startsWith('/proximidades') || pathname.startsWith('/imovel')) {
//         return NextResponse.redirect(new URL('/', request.url));
//       }
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/agendamentos/:path*',
//     '/dashboard/:path*',
//     '/proximidades/:path*',
//     '/imovel/:path*'
//   ],
// };




import { NextRequest, NextResponse } from "next/server";
import { User } from "./app/model/type";

async function getAuthUser(request: NextRequest): Promise<User | null> {
  try {
    const cookies = request.cookies.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
    console.log('Cookies enviados para API:', cookies);
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getauthuser`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Cookie': cookies,
      },
    });
    
    console.log('Status da resposta da API:', response.status);
    if (!response.ok) {
      if (response.status === 401) {
        console.log('Usuário não autenticado');
        return null;
      }
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Dados retornados:', data);
    if (!data?.id || !data?.role) {
      throw new Error('Dados de usuário inválidos');
    }
    
    return data as User;
  } catch (error) {
    console.error('Erro ao buscar usuário no middleware:', error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  console.log('Rota acessada:', request.nextUrl.pathname);
  const user = await getAuthUser(request);
  const pathname = request.nextUrl.pathname;
  const protectedRoutes = ['/agendamentos', '/dashboard', '/proximidades', '/imovel'];

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  console.log('Usuário:', user);
  console.log('É rota protegida?', isProtectedRoute);

  if (!user && isProtectedRoute) {
    console.log('Redirecionando para / por falta de autenticação');
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (user) {
    if (user.role === 'PROPRIETARIO' && pathname.startsWith('/proximidades')) {
      console.log('Redirecionando PROPRIETARIO de /proximidades');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (user.role === 'INQUILINO') {
      if (pathname.startsWith('/proximidades') || pathname.startsWith('/imovel')) {
        console.log('Redirecionando INQUILINO de rota restrita');
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/agendamentos/:path*',
    '/dashboard/:path*',
    '/proximidades/:path*',
    '/imovel/:path*'
  ],
};