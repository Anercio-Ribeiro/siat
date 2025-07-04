import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const aluguelId = searchParams.get("aluguelId");

  console.log("GET request received at /api/messages:", req.url);

  if (!aluguelId) {
    return new NextResponse(JSON.stringify({ error: "contratoId is required" }), { status: 400 });
  }

  try {
    const messages = await prisma.message.findMany({
      where: { aluguelId },
      orderBy: { criadoEm: "asc" },
      select: {
        userId: true,
        content: true,
        criadoEm: true,
      },
    });

    console.log(`Loaded ${messages.length} messages for contratoId ${aluguelId}`);
    return NextResponse.json(
      messages.map((msg) => ({
        userId: msg.userId,
        message: msg.content,
        timestamp: msg.criadoEm.toISOString(),
      }))
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch messages" }), { status: 500 });
  }
}