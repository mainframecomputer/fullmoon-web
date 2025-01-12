import { IndexedDBAdapter } from "@/lib/indexeddb";
import { NextResponse } from "next/server";

const db = new IndexedDBAdapter();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    // Fetch a single conversation
    const conversation = await db.getConversation(id);
    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    // Fetch messages for the conversation
    const messages = await db.getMessages(id);
    return NextResponse.json({ ...conversation, messages });
  }

  // Fetch all conversations
  const conversations = await db.listConversations();
  return NextResponse.json(conversations);
}

export async function POST(request: Request) {
  const { message } = await request.json();
  const title = message.content.trim().slice(0, 80);

  const conversation = await db.createConversation({
    title,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return NextResponse.json(conversation);
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const deleteAll = searchParams.get("deleteAll");

    if (deleteAll === "true") {
      // Delete all conversations
      const conversations = await db.listConversations();
      await Promise.all(conversations.map(conv => db.deleteConversation(conv.id)));
      return NextResponse.json({ success: true });
    }

    if (!id) {
      return NextResponse.json(
        { error: "Conversation ID is required" },
        { status: 400 }
      );
    }

    // Delete single conversation
    await db.deleteConversation(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete conversation" },
      { status: 500 }
    );
  }
} 