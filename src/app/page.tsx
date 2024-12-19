"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useChat } from "ai/react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
// import { useEffect } from "react";
import { prisma } from "@/lib/prisma";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Message } from "ai";

export default function Chat({
  initialMessages = [],
  initialConversationId,
}: {
  initialMessages?: Message[];
  initialConversationId?: string;
}) {
  const router = useRouter();
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(initialConversationId || null);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages,
    body: {
      conversationId: currentConversationId,
    },
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("inside handleChatSubmit");
    console.log("messages count", messages.length);
    // If this is the first message, create a new conversation
    if (messages.length === 0) {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: {
            content: input,
            role: "user",
          },
        }),
      });
      const conversation = await response.json();
      setCurrentConversationId(conversation.id);
    }
    handleSubmit(e);
  };

  const [conversations, setConversations] = useState<
    Array<{ id: string; createdAt: Date; title: string }>
  >([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const response = await fetch("/api/conversations");
      const data = await response.json();
      setConversations(data);
    };
    fetchConversations();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Fixed header section */}
          <div className="p-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80"
              >
                <Menu className="h-3 w-3" />
              </button>
              <Link
                href="/"
                className="p-2 rounded-full hover:rounded-full hover:bg-secondary/80"
              >
                <Plus className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Scrollable conversation list */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-2">
              {conversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  href={`/c/${conversation.id}`}
                  className="block p-2 rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <div className="text-sm">
                    {conversation.title}
                    <div className="text-xs text-gray-500">
                      {new Date(conversation.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Fixed footer section */}
          <div className="p-4">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main content wrapper */}
      <div
        className={`flex-1 flex justify-center transition-all duration-200 ease-in-out ${
          isSidebarOpen ? "pl-64" : "pl-0"
        }`}
      >
        {/* Hamburger menu and New Chat */}
        <div className="fixed top-4 left-4 z-40 flex gap-2">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80"
          >
            <Menu className="h-3 w-3" />
          </button>
          <Link
            href="/"
            className="p-2 hover:rounded-full hover:bg-secondary/80"
          >
            <Plus className="h-3 w-3" />
          </Link>
        </div>

        {/* Main content */}
        <main className="w-full max-w-2xl p-4">
          <div className="space-y-4 max-h-[calc(100vh-100px)]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-3xl px-4 py-2 ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {/* Add invisible div for scrolling */}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input form */}
        <div className="fixed bottom-0 w-full bg-background">
          <form onSubmit={handleChatSubmit} className="relative">
            <div className="max-w-2xl mx-auto w-full">
              <div className="flex flex-col m-4 px-2 py-1 bg-secondary rounded-3xl">
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything..."
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleChatSubmit(
                        e as unknown as React.FormEvent<HTMLFormElement>
                      );
                    }
                  }}
                  className="w-full border-none text-foreground placeholder:text-gray-400  resize-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[36px] align-middle shadow-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-gray-300"
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-gray-300"
                    >
                      <Globe className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-gray-300"
                    >
                      <HammerIcon className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:bg-background hover:text-primary rounded-full"
                    >
                      <ArrowUp className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/* <div className="max-w-2xl mx-auto w-full p-4">
            <form onSubmit={handleChatSubmit} className="relative">
              <div className="absolute left-0 right-0 top-3 flex items-center justify-between px-3 z-10">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-gray-400 hover:text-gray-300"
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-gray-400 hover:text-gray-300"
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-400 hover:text-gray-300"
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
              </div>
              <Textarea
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleChatSubmit(
                      e as unknown as React.FormEvent<HTMLFormElement>
                    );
                  }
                }}
                placeholder="Ask me anything..."
                className="w-full pl-20 pr-12 py-3.5 min-h-[75px] bg-secondary border-none text-foreground placeholder:text-gray-400 rounded-2xl resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                rows={1}
              />
            </form>
          </div> */}
        </div>
      </div>
    </div>
  );
}
