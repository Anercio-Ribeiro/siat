import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { lucia } from "@/lib/lucia";
import { FavoritosService } from "@/app/services/favoritoService";
const favoritosService = new FavoritosService();

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
      const sessionId = cookies().get(lucia.sessionCookieName)?.value;
      if (!sessionId) {
        return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
      }
  
      const { session, user } = await lucia.validateSession(sessionId);
      if (!session) {
        cookies().delete(lucia.sessionCookieName);
        return NextResponse.json({ error: "Sessão inválida" }, { status: 401 });
      }
  
      const favorites = await favoritosService.getUserFavorites(user.id);
      return NextResponse.json({ favorites }, { status: 200 });
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Erro interno do servidor" },
        { status: 500 }
      );
    }
  }