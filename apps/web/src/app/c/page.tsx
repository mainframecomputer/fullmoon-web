import { ChatInterface } from "@/components/ChatInterface";
import { ChatSidebar } from "@/components/ChatSidebar";

export default function ConversationsPage() {
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  );
} 