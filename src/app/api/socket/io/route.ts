import Pusher from "pusher";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  console.log("POST request received at /api/pusher:", req.url);

  const { contratoId, userId, message } = await req.json();

  try {
    const newMessage = await prisma.message.create({
      data: {
        contratoId,
        userId,
        content: message,
      },
    });

    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.PUSHER_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: process.env.PUSHER_CLUSTER!,
      useTLS: true,
    });

    await pusher.trigger(contratoId, "message", {
      userId,
      message,
      timestamp: newMessage.criadoEm.toISOString(),
    });

    console.log(`Message sent via Pusher in room ${contratoId}: ${message}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending Pusher message:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to send message" }), { status: 500 });
  }
}