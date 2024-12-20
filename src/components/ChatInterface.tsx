"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useChat } from "ai/react";
import {
  Menu,
  Paperclip,
  Globe,
  ArrowUp,
  Plus,
  HammerIcon,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { Message } from "ai";
import { useSidebar } from "@/contexts/SidebarContext";
import MoonPhaseIcon, { MOON_PHASES } from "@/components/icons/MoonPhaseIcon";
import { getMoonPhase } from "@/lib/utils";

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

export default function ChatInterface(): JSX.Element {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const router = useRouter();
  const params = useParams();
  const [conversationId, setConversationId] = useState<string | null>(
    params.id as string
  );
  const [conversation, setConversation] = useState<Conversation | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: conversation?.messages || [],
      body: { conversationId },
      id: conversationId || "new",
    });

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (conversationId) {
      console.log("fetching Conversation ID:", conversationId);
      fetchConversation();
      if (input.trim()) {
        const event = new Event(
          "submit"
        ) as unknown as React.FormEvent<HTMLFormElement>;
        handleSubmit(event);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  const fetchConversation = async () => {
    const response = await fetch(`/api/conversations?id=${conversationId}`);
    if (response.ok) {
      const data = await response.json();
      setConversation(data);
    }
  };

  const getCurrentMoonPhase = () => {
    const phase = getMoonPhase();
    switch (phase) {
      case "new":
        return MOON_PHASES.NEW;
      case "waxing-crescent":
        return MOON_PHASES.WAXING_CRESCENT;
      case "first-quarter":
        return MOON_PHASES.FIRST_QUARTER;
      case "waxing-gibbous":
        return MOON_PHASES.WAXING_GIBBOUS;
      case "full":
        return MOON_PHASES.FULL;
      case "waning-gibbous":
        return MOON_PHASES.WANING_GIBBOUS;
      case "last-quarter":
        return MOON_PHASES.LAST_QUARTER;
      case "waning-crescent":
        return MOON_PHASES.WANING_CRESCENT;
      default:
        return MOON_PHASES.NEW;
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!conversationId) {
      try {
        const response = await fetch("/api/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: input.substring(0, 100),
            message: { content: input, role: "user" },
          }),
        });

        if (response.ok) {
          const newConversation = await response.json();
          setConversationId(newConversation.id);
          router.push(`/c/${newConversation.id}`);
          return;
        }
      } catch (error) {
        console.error("Failed to create conversation:", error);
      }
    }
    handleSubmit(e);
  };

  return (
    <div
      className={`flex-1 flex justify-center transition-all duration-200 ease-in-out ${
        isSidebarOpen ? "pl-64" : "pl-0"
      }`}
    >
      <div className="fixed top-0 left-0 right-0 p-4 bg-background border-b text-center">
        <div
          className={`flex items-center transition-all duration-200 ease-in-out ${
            isSidebarOpen ? "ml-64" : "ml-20"
          }`}
        >
          <h1 className="text-md font-bold">{conversation?.title || "chat"}</h1>
        </div>
      </div>

      <div className="fixed top-4 left-4 z-40 flex gap-2">
        <button
          type="button"
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-secondary hover:bg-secondary/80"
        >
          <Menu className="h-3 w-3" />
        </button>
        <Link href="/" className="p-2 hover:rounded-full hover:bg-secondary/80">
          <Plus className="h-3 w-3" />
        </Link>
      </div>

      <main className="w-full max-w-2xl p-4 mt-16 mb-16">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <MoonPhaseIcon
              phase={getCurrentMoonPhase()}
              size={48}
              color="currentColor"
            />
            {/* <p className="mt-4 text-muted-foreground text-sm">
              Start a conversation...
            </p> */}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-3xl px-4 py-2 ${
                    message.role === "user"
                      ? "bg-secondary text-foreground"
                      : "text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap">
                    {message.content}
                    {isLoading &&
                      index === messages.length - 1 &&
                      message.role === "assistant" &&
                      "🌕"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <div className="fixed bottom-0 w-full bg-background">
        <form onSubmit={onSubmit} className="relative">
          <div className="max-w-2xl mx-auto w-full">
            <div className="flex flex-col m-4 px-2 py-1 bg-secondary rounded-3xl">
              <Textarea
                value={input}
                onChange={handleInputChange}
                placeholder="ask me anything..."
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                  }
                }}
                className="w-full border-none text-foreground placeholder:text-gray-400 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[36px] align-middle shadow-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex items-center gap-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <HammerIcon className="h-5 w-5" />
                  </Button>
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                    className="text-gray-400 hover:bg-background hover:text-primary rounded-full"
                  >
                    <ArrowUp className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
