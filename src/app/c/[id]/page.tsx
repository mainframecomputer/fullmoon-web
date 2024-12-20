"use client";

import ChatSidebar from "@/components/ChatSidebar";
import ChatInterface from "@/components/ChatInterface";

export default function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar isOpen={true} setIsOpen={() => {}} />
      <ChatInterface isSidebarOpen={true} setIsSidebarOpen={() => {}} />
    </div>
  );
}
