import { NextResponse } from "next/server";
import { UtilizadorService } from "@/app/services/utilizadorService";
import { hashPassword } from "@/lib/hashPassword";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();

  try {
    const utilizadorService = new UtilizadorService();
    const utilizador = await utilizadorService.encontrarUtilizadorPorId(id);
    
    if (!utilizador) {
      return NextResponse.json({ error: "Utilizador não encontrado", status: 404 });
    }

    // Preparar dados para atualização
    const updatedData = { ...body };
    
    // Se há nova senha, faz o hash da nova senha
    if (body.novaSenha) {
      updatedData.senha = await hashPassword(body.novaSenha);
      delete updatedData.novaSenha; // Remove novaSenha do objeto final
    } else {
      // Se não há nova senha, garante que não tente atualizar a senha
      delete updatedData.novaSenha;
    }

    // Atualiza os dados do utilizador
    const utilizadorAtualizado = await utilizadorService.atualizarUtilizador(id, updatedData);
    
    // Determinar mensagem com base nos campos atualizados
    const mensagem = updatedData.senha 
      ? "Senha atualizada com sucesso" 
      : "Perfil atualizado com sucesso";
    
    return NextResponse.json({ 
      utilizador: utilizadorAtualizado, 
      message: mensagem, 
      status: 200 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao atualizar utilizador", status: 400 });
  }
}