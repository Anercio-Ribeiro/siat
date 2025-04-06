// import { AluguelRepository } from "@/app/repositories/aluguelRepository";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//     try {
//       // const aluguelRepo = new AluguelRepository();
//       const aluguelRepo = new AluguelRepository();
//       const { searchParams } = new URL(request.url);
//       const imovelId = searchParams.get('imovelId');
//       console.log(imovelId);
      
//       if (!imovelId) {
//         return NextResponse.json({ error: 'ImovelId é obrigatório' }, { status: 400 });
//       }
  
//       const alugueis = await aluguelRepo.buscarAluguelByImovel(imovelId);
//       return NextResponse.json(alugueis);
//     } catch (error) {
//       return NextResponse.json({ error: 'Erro ao buscar alugueis' }, { status: 500 });
//     }
//   }  




import { AluguelRepository } from "@/app/repositories/aluguelRepository";
import { RentalService } from "@/app/services/aluguelService";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
      // const aluguelRepo = new AluguelRepository();
      const aluguelRepo = new RentalService();
      const { searchParams } = new URL(request.url);
      const imovelId = searchParams.get('imovelId');
      //TODO: Remover logs em produção
      //console.log(imovelId);
      
      if (!imovelId) {
        return NextResponse.json({ error: 'ImovelId é obrigatório' }, { status: 400 });
      }
  
      const alugueis = await aluguelRepo.getRentalsByProperty(imovelId);
      return NextResponse.json(alugueis);
    } catch (error) {
      return NextResponse.json({ error: 'Erro ao buscar alugueis' }, { status: 500 });
    }
  }  