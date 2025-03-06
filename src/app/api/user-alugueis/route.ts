// import { AluguelRepository } from "@/app/repositories/aluguelRepository";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//     try {
//       const aluguelRepo = new AluguelRepository();
//       // const { searchParams } = new URL(request.url);
//       // const imovelId = searchParams.get('imovelId');
//       // console.log(imovelId);
      
//       if (!imovelId) {
//         return NextResponse.json({ error: 'ImovelId é obrigatório' }, { status: 400 });
//       }
  
//       const alugueis = await aluguelRepo.buscarAluguelByImovel(imovelId);
//       return NextResponse.json(alugueis);
//     } catch (error) {
//       return NextResponse.json({ error: 'Erro ao buscar alugueis' }, { status: 500 });
//     }
//   }  



// import { AluguelRepository } from "@/app/repositories/aluguelRepository";
// import { RentalService } from "@/app/services/aluguelService";
// import { getAuthenticatedUser } from "@/lib/getAuthUser";
// import { NextRequest, NextResponse } from "next/server";
  
//   export async function GET(request: NextRequest) {
//     const aluguelService = new RentalService();
//     try {
      
      
//       // Get pagination parameters from URL
//       const searchParams = request.nextUrl.searchParams;
//       const page = parseInt(searchParams.get('page') || '1');
//       const pageSize = parseInt(searchParams.get('pageSize') || '6');
      
//       // Get paginated imoveis with user filter if needed
//       //const userId = user ? user.id : undefined;
//       const user = await getAuthenticatedUser();
//       if (!user) {
//         return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 }); 
//       }
//       const  alugueis = await aluguelService.getRentalsByUserId(user?.id);
//       //.listarImoveis(page, pageSize, userId);
      
//       // Return imoveis with pagination metadata
//       return NextResponse.json({
//         imoveis,
//         total,
//         totalPages,
//         currentPage: page
//       }, { status: 200 });
//     } catch (error) {
//       console.error("Erro ao buscar imóveis:", error);
//       return NextResponse.json(
//         { error: error instanceof Error ? error.message : "Erro ao buscar imóveis" },
//         { status: 500 }
//       );
//     }
//   }


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
//       // Clear the cookie if the session is invalid
//       cookies().delete(lucia.sessionCookieName);
//       return new Response(null, { status: 401 });
//     }

//     // Create rental service and fetch rentals for the logged-in user
//     const rentalService = new RentalService();
//     const rentals = await rentalService.getRentalsByUserId(user.id, page, pageSize);
//     console.log(rentals);

//     return new Response(JSON.stringify(rentals), {
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





// import { cookies } from 'next/headers';
// import { lucia } from '@/lib/lucia';
// import { RentalService } from '@/app/services/aluguelService';
// import { prisma } from '@/lib/prisma';

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
//       // Clear the cookie if the session is invalid
//       cookies().delete(lucia.sessionCookieName);
//       return new Response(null, { status: 401 });
//     }

//     // Create rental service and fetch rentals for the logged-in user
//     const rentalService = new RentalService();
//     const rentals = await rentalService.getRentalsByUserId(user.id, page, pageSize);
    
//     // Contar o total de aluguéis para o usuário
//     const total = await prisma.aluguel.count({ where: { inquilinoId: user.id } });
//     const totalPages = Math.ceil(total / pageSize);

//     // Montar a resposta no formato esperado pelo frontend
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




// // src/app/api/user-alugueis/route.ts
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




// src/app/api/user-alugueis/route.ts
import { cookies } from 'next/headers';
import { lucia } from '@/lib/lucia';
import { RentalService } from '@/app/services/aluguelService';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Extract page and pageSize from query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    // Validate session
    const sessionId = cookies().get(lucia.sessionCookieName)?.value;
    if (!sessionId) {
      return new Response(null, { status: 401 });
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (!session) {
      cookies().delete(lucia.sessionCookieName);
      return new Response(null, { status: 401 });
    }

    // Use rental service
    const rentalService = new RentalService();
    const rentals = await rentalService.getRentalsByUserId(user.id, page, pageSize);
    const total = await rentalService.getTotalRentalsByUserId(user.id);
    const totalPages = Math.ceil(total / pageSize);

    const response = {
      rentals,
      total,
      totalPages,
      currentPage: page,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error retrieving user rentals:', error);
    return new Response(null, { status: 500 });
  }
}