// import { cookies } from 'next/headers';
// import { lucia } from '@/lib/lucia';
// import { RentalService } from '@/app/services/aluguelService';

// export const dynamic = 'force-dynamic';

// export async function GET(request: Request) {
//   try {
//     // Extract page and pageSize from query parameters
//     const { searchParams } = new URL(request.url);
//     const page = parseInt(searchParams.get('page') || '1', 10);
//     const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

//     // Validate session
//     const sessionId = cookies().get(lucia.sessionCookieName)?.value;
//     if (!sessionId) {
//       return new Response(null, { status: 401 });
//     }

//     const { session, user } = await lucia.validateSession(sessionId);
//     if (!session) {
//       cookies().delete(lucia.sessionCookieName);
//       return new Response(null, { status: 401 });
//     }

//     // Use rental service
//     const rentalService = new RentalService();
//     const rentals = await rentalService.getRentalsByUserId(user.id, page, pageSize);
//     const total = await rentalService.getTotalRentalsByUserId(user.id);
//     const totalPages = Math.ceil(total / pageSize);

//     const response = {
//       rentals,
//       total,
//       totalPages,
//       currentPage: page,
//     };

//     return new Response(JSON.stringify(response), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (error) {
//     console.error('Error retrieving user rentals:', error);
//     return new Response(null, { status: 500 });
//   }
// }








import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { lucia } from "@/lib/lucia";
import { RentalService } from "@/app/services/aluguelService";


export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const imovelId = searchParams.get("imovelId") || undefined;
    const name = searchParams.get("name") || undefined;
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;
    const status = searchParams.get("status") || undefined;

    // Validate session
    const sessionId = cookies().get(lucia.sessionCookieName)?.value;
    if (!sessionId) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (!session) {
      cookies().delete(lucia.sessionCookieName);
      return NextResponse.json({ error: "Sessão inválida" }, { status: 401 });
    }

    const aluguelService = new RentalService();
    const result = await aluguelService.getRentals(user.id, "INQUILINO", page, pageSize, {
      imovelId,
      name,
      startDate,
      endDate,
      status,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao obter aluguéis do inquilino:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro interno do servidor" },
      { status: error instanceof Error && error.message.includes("não autenticado") ? 401 : 500 }
    );
  }
}