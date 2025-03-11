

// // app/api/aluguel/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { AluguelRepository } from '@/app/repositories/aluguelRepository';
// import { z } from 'zod';
// import { getAuthenticatedUser } from '@/lib/getAuthUser';

// const aluguelSchema = z.object({
//   imovelId: z.string().min(1, "ID do imóvel é obrigatório"),
//   checkIn: z.string().transform((date) => new Date(date)),
//   checkOut: z.string().transform((date) => new Date(date)),
//   periodoAluguel: z.number().min(1, "Período mínimo de 1 dia"),
//   status: z.enum(['pendente', 'aprovado', 'rejeitado', 'cancelado']),
//   contratoUrl: z.string().url().optional(),
// });

// const rentalService = new AluguelRepository();

// export async function POST(req: NextRequest) {
//   try {
//     // Obtém o usuário autenticado
//     const user = await getAuthenticatedUser();
    
//     if (!user) {
//       return NextResponse.json(
//         { error: 'Usuário não autenticado' },
//         { status: 401 }
//       );
//     }

//     // Parse e valida o corpo da requisição
//     const body = await req.json();
//     const validationResult = aluguelSchema.safeParse(body);

//     if (!validationResult.success) {
//       return NextResponse.json(
//         { 
//           error: 'Dados inválidos',
//           details: validationResult.error.flatten()
//         },
//         { status: 400 }
//       );
//     }

//     const validatedData = validationResult.data;

//     // Cria o objeto de aluguel com os dados validados
//     const aluguel = {
//       imovelId: validatedData.imovelId,
//       inquilinoId: user.id,
//       checkIn: validatedData.checkIn,
//       checkOut: validatedData.checkOut,
//       periodoAluguel: validatedData.periodoAluguel,
//       status: validatedData.status,
//       contratoUrl: validatedData.contratoUrl ?? null,
//     };

//     // Cria o aluguel no banco de dados
//     const rental = await rentalService.criarAluguel(aluguel);

//     return NextResponse.json(
//       { rental },
//       { status: 201 }
//     );

//   } catch (error) {
//     console.error('Erro ao criar aluguel:', error);
    
//     if (error instanceof Error) {
//       return NextResponse.json(
//         { error: error.message },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       { error: 'Erro interno do servidor' },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req: NextRequest) {
//   try {
//     const searchParams = req.nextUrl.searchParams;
//     const imovelId = searchParams.get('imovelId');
//     //console.log("Imovel ID: "+imovelId);

//     if (!imovelId) {
//       return NextResponse.json(
//         { error: 'ID do imóvel não fornecido' },
//         { status: 400 }
//       );
//     }

//     const alugueis = await rentalService.buscarAluguelByImovel(imovelId);
//     return NextResponse.json(alugueis);

//   } catch (error) {
//     console.error('Erro ao buscar aluguéis:', error);
//     return NextResponse.json(
//       { error: 'Erro ao buscar aluguéis' },
//       { status: 500 }
//     );
//   }
// }



import { NextRequest, NextResponse } from "next/server";
import { RentalService } from "@/app/services/aluguelService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      imovelId,
      inquilinoId,
      checkIn,
      checkOut,
      periodoAluguel,
      status,
    } = body;

    if (!imovelId || !inquilinoId || !checkIn || !checkOut) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 });
    }

    const rentalService = new RentalService();
    const aluguel = await rentalService.createRental({
      imovelId,
      inquilinoId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      periodoAluguel,
      status,
      contratoUrl: null,
    });

    return NextResponse.json(aluguel, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar aluguel:", error);
    return NextResponse.json({ error: "Erro ao criar aluguel" }, { status: 500 });
  }
}

// Mantém o GET existente
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imovelId = searchParams.get("imovelId");

    if (!imovelId) {
      return NextResponse.json({ error: "ImovelId é obrigatório" }, { status: 400 });
    }

    const rentalService = new RentalService();
    const alugueis = await rentalService.getRentalsByProperty(imovelId);
    return NextResponse.json(alugueis);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar alugueis" }, { status: 500 });
  }
}