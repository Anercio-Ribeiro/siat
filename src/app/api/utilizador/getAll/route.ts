// import { UtilizadorService } from '@/app/services/utilizadorService';
// import { NextResponse } from 'next/server';


// export async function GET() {

//   const utilizadorService = new UtilizadorService();
//   try {
//     const utilizadores = await utilizadorService.listarUtilizadores();
//     return NextResponse.json({ utilizadores, status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Erro ao listar utilizadores', status: 500 });
//   }
// }





// import { NextResponse } from "next/server";
// import { UtilizadorService } from "@/app/services/utilizadorService";
// import { getServerSession } from "next-auth"; // Assuming you're using next-auth for authentication
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function GET(req: Request) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return NextResponse.json({ error: "Sessão inválida ou não autenticada", status: 401 });
//   }

//   const { searchParams } = new URL(req.url);
//   const page = parseInt(searchParams.get("page") || "1");
//   const pageSize = parseInt(searchParams.get("pageSize") || "10");
//   const nome = searchParams.get("nome") || undefined;
//   const role = searchParams.get("role") || undefined;
//   const estado = searchParams.get("estado") || undefined;

//   const utilizadorService = new UtilizadorService();

//   try {
//     const { utilizadores, total } = await utilizadorService.listarUtilizadores({
//       page,
//       pageSize,
//       filters: { nome, role, estado },
//     });

//     return NextResponse.json({
//       utilizadores,
//       total,
//       totalPages: Math.ceil(total / pageSize),
//       currentPage: page,
//       status: 200,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Erro ao listar utilizadores", status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { Role } from '@prisma/client';
import { UtilizadorService } from '@/app/services/utilizadorService';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  const name = searchParams.get('name') || undefined;
  const role = searchParams.get('role') as Role | undefined;
  const status = searchParams.get('status') ? searchParams.get('status') === 'true' : undefined;

  const utilizadorService = new UtilizadorService();

  try {
    const result = await utilizadorService.listarUtilizadores({
      page,
      pageSize,
      name,
      role,
      status,
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao listar utilizadores' }, { status: 500 });
  }
}