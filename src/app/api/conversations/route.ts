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
    },
  });

  return NextResponse.json(conversation);
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const deleteAll = searchParams.get("deleteAll");

    if (deleteAll === "true") {
      // Delete all conversations (cascade delete will handle messages)
      await prisma.conversation.deleteMany();
      return NextResponse.json({ success: true });
    }

    if (!id) {
      return NextResponse.json(
        { error: "Conversation ID is required" },
        { status: 400 }
      );
    }

    // Delete single conversation - messages will be automatically deleted due to onDelete: Cascade
    await prisma.conversation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete conversation" },
      { status: 500 }
    );
  }
}
