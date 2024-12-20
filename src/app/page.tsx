"use client";

import ChatSidebar from "@/components/ChatSidebar";
import ChatInterface from "@/components/ChatInterface";
import { useState } from "react";
import type { Message } from "ai";

export default function Chat({
  initialMessages = [],
  initialConversationId,
}: {
  initialMessages?: Message[];
  initialConversationId?: string;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <ChatSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <ChatInterface
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        initialMessages={initialMessages}
        initialConversationId={initialConversationId}
      />
    </div>
  );
}
