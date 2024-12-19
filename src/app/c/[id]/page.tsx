import Chat from "../../page";
import { prisma } from "@/lib/prisma";
import type { Message } from "ai";

export default async function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  // Ensure params is awaited if necessary
  const { id } = await params;
  const conversation = await prisma.conversation.findUnique({
    where: {
      id: id,
    },
    include: {
      messages: true,
    },
  });

  if (!conversation) {
    return <div>Conversation not found</div>;
  }

  // Convert database messages to the format expected by useChat
  const initialMessages: Message[] = conversation.messages.map((msg) => ({
    id: msg.id,
    content: msg.content,
    role: msg.role as "user" | "assistant",
  }));

  return (
    <Chat
      initialMessages={initialMessages}
      initialConversationId={conversation.id}
    />
  );
}
