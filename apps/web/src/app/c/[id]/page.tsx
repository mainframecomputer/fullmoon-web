"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChatInterface } from "@/components/ChatInterface";
import { ChatSidebar } from "@/components/ChatSidebar";
import { IndexedDBAdapter } from "@/lib/indexeddb";
import type { Conversation } from "@fullmoon/database";
import type { Message as AiMessage } from "ai";
import { redirect } from "next/navigation";

const db = new IndexedDBAdapter();

interface ConversationWithMessages extends Conversation {
  messages: AiMessage[];
}

export default function ConversationPage() {
  const params = useParams();
  const conversationId = params.id as string;
  const [conversation, setConversation] = useState<
    ConversationWithMessages | undefined
  >();

  useEffect(() => {
    if (!conversationId) return;
    const fetchConversation = async () => {
      const conv = await db.getConversation(conversationId);
      if (conv) {
        const messages = await db.getMessages(conversationId);
        // convert messages to AI Message type
        const aiMessages: AiMessage[] = messages.map((msg) => ({
          id: msg.id,
          content: msg.content,
          role: msg.role,
        }));
        setConversation({ ...conv, messages: aiMessages });
      } else {
        redirect("/");
      }
    };
    fetchConversation();
  }, [conversationId]);

  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <div className="flex-1">
        <ChatInterface convo={conversation} />
      </div>
    </div>
  );
}
