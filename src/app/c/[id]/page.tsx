import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ChatSidebar from "@/components/ChatSidebar";
import ChatInterface from "@/components/ChatInterface";
import type { Message } from "ai";

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

// Client wrapper component
const ClientWrapper = ({ conversation }: { conversation: Conversation }) => {
  "use client";

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar />
      <ChatInterface convo={conversation} />
    </div>
  );
};

export default async function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params; // https://nextjs.org/docs/messages/sync-dynamic-apis
  const dbConversation = await prisma.conversation.findUnique({
    where: { id },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!dbConversation) {
    redirect("/");
  }

  // Map database messages to AI Message type
  const conversation: Conversation = {
    id: dbConversation.id,
    title: dbConversation.title,
    messages: dbConversation.messages.map((msg) => ({
      id: msg.id,
      content: msg.content,
      role: msg.role as Message["role"],
    })),
  };

  return <ClientWrapper conversation={conversation} />;
}
