"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Plus } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface ChatSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ChatSidebar({ isOpen, setIsOpen }: ChatSidebarProps) {
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
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
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

        <div className="p-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
