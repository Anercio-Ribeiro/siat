import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const proprietarioId = searchParams.get("proprietarioId");
  const inquilinoId = searchParams.get("inquilinoId");

  if (!proprietarioId || !inquilinoId) {
    return new NextResponse(JSON.stringify({ error: "proprietarioId and inquilinoId are required" }), { status: 400 });
  }

  try {
    const [proprietario, inquilino] = await Promise.all([
      prisma.user.findUnique({
        where: { id: proprietarioId },
        select: { id: true, nome: true },
      }),
      prisma.user.findUnique({
        where: { id: inquilinoId },
        select: { id: true, nome: true },
      }),
    ]);

    console.log("Fetched user names:", { proprietario, inquilino });
    return NextResponse.json({
      proprietario: proprietario ? { id: proprietario.id, name: proprietario.nome } : null,
      inquilino: inquilino ? { id: inquilino.id, name: inquilino.nome } : null,
    });
  } catch (error) {
    console.error("Error fetching user names:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch user names" }), { status: 500 });
  }
}