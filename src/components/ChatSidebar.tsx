"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, Plus, Trash2 } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

export default function ChatSidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [conversations, setConversations] = useState<
    Array<{ id: string; createdAt: Date; title: string }>
  >([]);

  const fetchConversations = useCallback(async () => {
    const response = await fetch("/api/conversations");
    const data = await response.json();
    setConversations(data);
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/conversations?id=${id}`, {
        method: "DELETE",
      });
      console.log(response);
      if (response.ok) {
        await fetchConversations();
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
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

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            {conversations.map((conversation) => (
              <Link
                key={conversation.id}
                href={`/c/${conversation.id}`}
                className="group block p-2 rounded-lg hover:bg-secondary/80 transition-colors relative"
              >
                <div className="text-sm">
                  {conversation.title}
                  <div className="text-xs text-gray-500">
                    {new Date(conversation.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleDelete(conversation.id, e)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded transition-opacity"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
