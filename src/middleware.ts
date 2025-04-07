import { NextRequest, NextResponse } from "next/server";
import { User } from "./app/model/type";

export async function getAuthUser(request: NextRequest): Promise<User | null> {
  try {
    const cookies = request.cookies.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
    
    //TODO: Remover logs em produção
    // console.log('Cookies enviados para API:', cookies);
    // console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);

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
  //TODO: Remover logs em produção
  // console.log('Rota acessada:', request.nextUrl.pathname);
  const user = await getAuthUser(request);
  const pathname = request.nextUrl.pathname;
  const protectedRoutes = ['/agendamentos', '/dashboard', '/proximidades', '/imovel'];

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
 
 //TODO: Remover logs em produção
  // console.log('Usuário:', user);
  // console.log('É rota protegida?', isProtectedRoute);

  if (!user && isProtectedRoute) {
    //TODO: Remover logs em produção
    // console.log('Redirecionando para / por falta de autenticação');
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (user) {
    if (user.role === 'PROPRIETARIO' && pathname.startsWith('/proximidades') || pathname.startsWith('/utilizadores')) {
    
    //TODO: Remover logs em produção
      // console.log('Redirecionando PROPRIETARIO de /proximidades');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (user.role === 'INQUILINO') {
      if (pathname.startsWith('/proximidades') || pathname.startsWith('/imovel') || pathname.startsWith('/utilizadores')) {
        
        //TODO: Remover logs em produção
        // console.log('Redirecionando INQUILINO de rota restrita');
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    if (user.role === "ADMIN") {
      if (pathname.startsWith('/agendamentos') || pathname.startsWith('/imovel')) {
        
        //TODO: Remover logs em produção
        // console.log('Redirecionando INQUILINO de rota restrita');
        return NextResponse.redirect(new URL('/dashboard', request.url));
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
    '/imovel/:path*',
    '/utilizadores/:path*'
  ],
};