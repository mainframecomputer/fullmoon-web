"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useChat } from "ai/react";
import {
  Menu,
  Paperclip,
  ArrowUp,
  Plus,
  Cog,
  MessageCircleWarning,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Conversation } from "@fullmoon/database";
import { useSidebar } from "@/contexts/SidebarContext";
import MoonPhaseIcon from "@/components/icons/MoonPhaseIcon";
import { getCurrentMoonPhase } from "@/lib/utils";
import SettingsDialog from "@/components/SettingsDialog";
import { IndexedDBAdapter } from "@/lib/indexeddb";
import type { Message as AiMessage } from "ai";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import readPDFText from "react-pdftotext";
import { ChatDrawer } from "@/components/ChatDrawer";

const db = new IndexedDBAdapter();

interface ConversationWithMessages extends Conversation {
  messages: AiMessage[];
}

interface ChatInterfaceProps {
  convo?: ConversationWithMessages;
}

const MAX_FILE_SIZE = 100 * 1024; // 100KB
const ALLOWED_FILE_TYPES = [
  "text/plain",
  "text/markdown",
  "application/json",
  "text/csv",
  "text/html",
  "text/javascript",
  "text/typescript",
  "text/css",
  "application/pdf",
];

export function ChatInterface({ convo }: ChatInterfaceProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showSettingsAlert, setShowSettingsAlert] = useState(false);
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const router = useRouter();
  const [conversationId, setConversationId] = useState<string | null>(
    convo?.id || null
  );
  const [, setConversation] = useState<ConversationWithMessages | null>(
    convo || null
  );
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  const [customEndpointSettings, setCustomEndpointSettings] = useState<
    | {
        endpoint?: string;
        modelName?: string;
        apiKey?: string;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    db.getCustomEndpoint().then((endpointSettings) => {
      setCustomEndpointSettings(endpointSettings);
      setShowSettingsAlert(
        !endpointSettings?.endpoint || !endpointSettings?.modelName
      );
    });
  }, []);

  useEffect(() => {
    setShowSettingsAlert(
      !customEndpointSettings?.endpoint || !customEndpointSettings?.modelName
    );
  }, [customEndpointSettings]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update conversationId when convo changes
  useEffect(() => {
    if (convo?.id) {
      setConversationId(convo.id);
      setConversation(convo);
    }
  }, [convo]);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: convo?.messages || [],
      body: {
        conversationId,
        customEndpointSettings,
      },
      id: conversationId || "new",
      onFinish: async (message) => {
        if (!conversationId) return;
        try {
          await db.createMessage({
            content: message.content,
            role: "assistant",
            conversationId: conversationId,
            createdAt: new Date(),
          });
        } catch (error) {
          console.error("Failed to save assistant message:", error);
        }
      },
    });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      alert("File size must be less than 100KB");
      return;
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      alert("Invalid file type. Only text and PDF files are allowed.");
      return;
    }

    try {
      let content: string;
      if (file.type === "application/pdf") {
        content = await readPDFText(file);
      } else {
        content = await file.text();
      }

      // Append the file content to the input
      const fileContent = input
        ? `${input}\n\nFile: ${file.name}\n\`\`\`\n${content}\n\`\`\``
        : `File: ${file.name}\n\`\`\`\n${content}\n\`\`\``;
      handleInputChange({
        target: { value: fileContent },
      } as React.ChangeEvent<HTMLTextAreaElement>);

      setAttachedFileName(file.name);
    } catch (error) {
      console.error("Error reading file:", error);
      alert("Error reading file. Please try again.");
    }

    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearAttachment = () => {
    setAttachedFileName(null);
    handleInputChange({
      target: { value: "" },
    } as React.ChangeEvent<HTMLTextAreaElement>);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
      if (input.trim()) {
        const event = new Event(
          "submit"
        ) as unknown as React.FormEvent<HTMLFormElement>;
        handleSubmit(event);
        clearAttachment();
      }
    }
    // We intentionally omit input and handleSubmit from deps
    // because we only want this to run when conversationId changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();

    if (!conversationId) {
      try {
        const newConversation = await db.createConversation({
          title: userMessage.slice(0, 40),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        // save user message
        await db.createMessage({
          content: userMessage,
          role: "user",
          conversationId: newConversation.id,
          createdAt: new Date(),
        });
        setConversationId(newConversation.id);
        router.replace(`/c/${newConversation.id}`);
        return;
      } catch (error) {
        console.error("Failed to create conversation:", error);
      }
    } else {
      try {
        // Save user message before sending to API
        await db.createMessage({
          content: userMessage,
          role: "user",
          conversationId: conversationId,
          createdAt: new Date(),
        });
        handleSubmit(e);
        clearAttachment();
      } catch (error) {
        console.error("Failed to save user message:", error);
      }
    }
  };

  const handleOpenChange = useCallback((open: boolean) => {
    setIsSettingsOpen(open);
  }, []);

  const refreshEndpointSettings = useCallback(async () => {
    const endpointSettings = await db.getCustomEndpoint();
    setCustomEndpointSettings(endpointSettings);
  }, []);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuClick = () => {
    if (window.innerWidth < 640) {
      // sm breakpoint
      setIsDrawerOpen(true);
    } else {
      toggleSidebar();
    }
  };

  return (
    <div
      className={`flex-1 flex justify-center transition-all duration-200 ease-in-out ${
        isSidebarOpen ? "pl-64" : "pl-0"
      }`}
    >
      <div className="fixed top-0 left-0 right-0 p-4 bg-background border-b">
        <div
          className={`flex items-center justify-between h-6 transition-all duration-200 ease-in-out ${
            isSidebarOpen ? "ml-64" : "ml-0 sm:ml-20"
          }`}
        >
          <button
            type="button"
            onClick={handleMenuClick}
            className="sm:hidden p-2 rounded-full bg-secondary hover:bg-secondary/80"
          >
            <Menu className="h-3 w-3" />
          </button>
          <h1 className="text-md font-bold text-center sm:text-left flex-1">
            {convo?.title || "chat"}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-300"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Cog className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="fixed top-4 left-4 z-40 sm:flex hidden gap-2">
        <button
          type="button"
          onClick={handleMenuClick}
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
          <div className="flex flex-col h-[calc(100vh-200px)]">
            <div className="flex-1 flex items-center justify-center">
              <MoonPhaseIcon
                phase={getCurrentMoonPhase()}
                size={48}
                color="currentColor"
              />
            </div>
            {showSettingsAlert && (
              <Alert className="w-full max-w-sm mx-auto">
                <MessageCircleWarning className="h-4 w-4" />
                <AlertTitle>setup required</AlertTitle>
                <AlertDescription className="text-sm">
                  please configure your API endpoint and model in settings to
                  start chatting.
                  <br />
                  <Button
                    variant="outline"
                    className="px-2 py-1 h-auto mt-2"
                    onClick={() => setIsSettingsOpen(true)}
                  >
                    open settings
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          </div>
        ) : (
          <div className="space-y-4 mb-16">
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
                disabled={
                  !customEndpointSettings?.endpoint ||
                  !customEndpointSettings?.modelName ||
                  isLoading
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                  }
                }}
                className="w-full border-none text-foreground placeholder:text-gray-400 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[36px] align-middle shadow-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept={ALLOWED_FILE_TYPES.join(",")}
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-gray-300"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={showSettingsAlert || isLoading}
                    >
                      <Paperclip className="h-3 w-3" />
                    </Button>
                    {attachedFileName && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-400 truncate max-w-[150px]">
                          {attachedFileName}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 text-gray-400 hover:text-gray-300"
                          onClick={clearAttachment}
                        >
                          ×
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-gray-300"
                  disabled={isLoading || !input.trim()}
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <SettingsDialog
        open={isSettingsOpen}
        onOpenChange={handleOpenChange}
        onSettingsChange={refreshEndpointSettings}
      />

      <ChatDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </div>
  );
}
