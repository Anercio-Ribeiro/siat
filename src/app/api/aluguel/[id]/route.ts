// import { AluguelRepository } from "@/app/repositories/aluguelRepository";
// import { RentalService } from "@/app/services/aluguelService";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//     try {
//       // const aluguelRepo = new AluguelRepository();
//       const aluguelRepo = new RentalService();
//       const { searchParams } = new URL(request.url);
//       const imovelId = searchParams.get('imovelId');
//       //TODO: Remover logs em produção
//       //console.log(imovelId);
      
//       if (!imovelId) {
//         return NextResponse.json({ error: 'ImovelId é obrigatório' }, { status: 400 });
//       }
  
//       const alugueis = await aluguelRepo.getRentalsByProperty(imovelId);
//       return NextResponse.json(alugueis);
//     } catch (error) {
//       return NextResponse.json({ error: 'Erro ao buscar alugueis' }, { status: 500 });
//     }
//   }  













// import { NextResponse } from "next/server";
// import { RentalService } from "@/app/services/aluguelService";
// import { getServerSession } from "next-auth"; // Assuming you're using next-auth for authentication

// export async function GET(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const rentalService = new RentalService();
//     const rental = await rentalService.getRentalDetails(params.id);
//     return NextResponse.json(rental);
//   } catch (error) {
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "Erro ao buscar detalhes do aluguel" },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const session = await getServerSession(); // Adjust based on your auth setup
//     if (!session?.user) {
//       return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
//     }

//     const { status } = await request.json();
//     const rentalService = new RentalService();
//     const updatedRental = await rentalService.updateRentalStatus(
//       params.id,
//       status,
//       session.user.role, // Adjust based on your session structure
//       session.user.id
//     );
//     return NextResponse.json(updatedRental);
//   } catch (error) {
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "Erro ao atualizar status" },
//       { status: 500 }
//     );
//   }
// }






import { NextResponse } from "next/server";
import { RentalService } from "@/app/services/aluguelService";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const rentalService = new RentalService();
    const rental = await rentalService.getRentalDetails(params.id);
    return NextResponse.json(rental);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao buscar detalhes do aluguel" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json();
    const rentalService = new RentalService();
    const updatedRental = await rentalService.updateRentalStatus(params.id, status);
    return NextResponse.json(updatedRental);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao atualizar status" },
      { status: 500 }
    );
  }
}