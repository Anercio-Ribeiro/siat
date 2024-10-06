// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req });
  
//   // Se o usuário não estiver autenticado, redirecione para a página de login
//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   // Verifica o papel do usuário
//   const role = token.role;

//   if (req.nextUrl.pathname === "/") {
//     // Redireciona com base no papel do usuário
//     if (role === "student") {
//       return NextResponse.redirect(new URL("/student", req.url));
//     } else if (role === "teacher") {
//       return NextResponse.redirect(new URL("/teacher", req.url));
//     } else if (role === "admin") {
//       return NextResponse.redirect(new URL("/admin", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/", "/student", "/teacher", "/admin"], // Páginas que você quer proteger com o middleware
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  // Redirect to login page if not authenticated and trying to access a protected route
  if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  // Redirect to dashboard if authenticated and trying to access login page
  if (token && req.nextUrl.pathname === '/auth') {
    const { role } = token as { role: string };
    if (role === 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/auth'],
};
