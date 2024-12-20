import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    // Fetch a single conversation with all messages
    const conversation = await prisma.conversation.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return conversation
      ? NextResponse.json(conversation)
      : NextResponse.json({ error: "Conversation not found" }, { status: 404 });
  }
  // Fetch all conversations without messages for efficiency
  const conversations = await prisma.conversation.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  });

  return NextResponse.json(conversations);
}

export async function POST(request: Request) {
  const { message } = await request.json();
  const title = message.content.trim().slice(0, 80);

  const conversation = await prisma.conversation.create({
    data: {
      title,
      messages: {
        create: {
          content: message.content,
          role: "user",
        },
      },
    },
    include: { messages: true },
  });

  return NextResponse.json(conversation);
}
