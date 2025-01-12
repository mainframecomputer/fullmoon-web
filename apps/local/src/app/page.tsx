import ChatSidebar from "@/components/ChatSidebar";
import ChatInterface from "@/components/ChatInterface";

export default function Chat() {
  return (
    <div className="flex min-h-screen">
      <ChatSidebar />
      <ChatInterface />
    </div>
  );
}
