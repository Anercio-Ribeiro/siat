// import { NextResponse } from "next/server";
// import { ContractService } from '@/app/services/contratoService';



// export async function GET(request: Request) {

//   const contratosService = new ContractService();  
//   const { searchParams } = new URL(request.url);
//   const inquilinoId = searchParams.get("inquilinoId");
//   const proprietarioId = searchParams.get("proprietarioId");

//   try {
//     if (inquilinoId) {
//       const contratos = await contratosService.getContratosByInquilinoId(inquilinoId);
//       return NextResponse.json(contratos);
//     } else if (proprietarioId) {
//       const contratos = await contratosService.getContratosByProprietarioId(proprietarioId);
//       return NextResponse.json(contratos);
//     } else {
//       return NextResponse.json({ error: "Parâmetro inquilinoId ou proprietarioId é obrigatório" }, { status: 400 });
//     }
//   } catch (error) {
//     console.error("Erro ao buscar contratos:", error);
//     return NextResponse.json({ error: "Erro ao processar solicitação" }, { status: 500 });
//   }
// }




// import { NextResponse } from "next/server";
// import { ContractService } from '@/app/services/contratoService';

// const contratosService = new ContractService();

// export async function GET(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const contrato = await contratosService.getContratoById(params.id);
//     return NextResponse.json(contrato);
//   } catch (error: any) {
//     if (error.message === "Contrato não encontrado") {
//       return NextResponse.json({ error: "Contrato não encontrado" }, { status: 404 });
//     }
//     console.error("Erro ao buscar contrato:", error);
//     return NextResponse.json({ error: "Erro ao processar solicitação" }, { status: 500 });
//   }
// }




import { NextResponse } from "next/server";
import { ContratosService } from '@/app/services/contratoService';

const contratosService = new ContratosService();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const contrato = await contratosService.getContratoById(params.id);
    return NextResponse.json(contrato);
  } catch (error: any) {
    if (error.message === "Contrato não encontrado") {
      return NextResponse.json({ error: "Contrato não encontrado" }, { status: 404 });
    }
    console.error("Erro ao buscar contrato:", error);
    return NextResponse.json({ error: "Erro ao processar solicitação" }, { status: 500 });
  }
}