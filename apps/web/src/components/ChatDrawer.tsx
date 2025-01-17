"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, XIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { IndexedDBAdapter } from "@/lib/indexeddb";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

const db = new IndexedDBAdapter();

interface ChatDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatDrawer({ open, onOpenChange }: ChatDrawerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [conversations, setConversations] = useState<
    Array<{ id: string; createdAt: Date; title: string }>
  >([]);

  const fetchConversations = useCallback(async () => {
    const convs = await db.listConversations();
    setConversations(convs);
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await db.deleteConversation(id);
      // If we're currently viewing this conversation, navigate to home
      if (pathname === `/c/${id}`) {
        router.replace("/");
      }
      await fetchConversations();
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  };

  const handleNavigate = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[75vh]">
        <div className="flex flex-col h-full">
          <div className="mx-auto w-[50px]rounded-full bg-muted my-0" />

          <div className="flex items-center justify-between px-4 py-2 bg-background">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-secondary/80 rounded-full"
            >
              <XIcon className="h-6 w-6" />
            </button>
            <h3 className="font-medium text-md text-bold">chats</h3>
            <Link
              href="/"
              onClick={handleNavigate}
              className="p-2 hover:bg-secondary/80 rounded-full"
            >
              <Plus className="h-6 w-6" />
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4 pt-2">
            <div className="rounded-lg bg-secondary/40 overflow-hidden">
              {conversations.map((conversation, index) => (
                <Link
                  key={conversation.id}
                  href={`/c/${conversation.id}`}
                  onClick={handleNavigate}
                  className={`group flex items-center justify-between p-3 hover:bg-secondary/80 transition-colors relative ${
                    index !== conversations.length - 1
                      ? "border-b border-border/50"
                      : ""
                  }`}
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
                    className="p-2 hover:bg-destructive/10 rounded-full transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </button>
                </Link>
              ))}
              {conversations.length === 0 && (
                <div className="p-3 text-sm text-muted-foreground text-center">
                  No conversations yet
                </div>
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
