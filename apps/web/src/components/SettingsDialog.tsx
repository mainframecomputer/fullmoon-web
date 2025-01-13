"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IndexedDBAdapter } from "@/lib/indexeddb";
import { Input } from "@/components/ui/input";

const db = new IndexedDBAdapter();

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SettingsDialog({
  open,
  onOpenChange,
}: SettingsDialogProps): JSX.Element {
  const { theme, setTheme } = useTheme();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [customEndpoint, setCustomEndpoint] = useState<string>("");
  const [customModelName, setCustomModelName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // Load custom endpoint when dialog opens
    if (open) {
      db.getCustomEndpoint().then((settings) => {
        setCustomEndpoint(settings.endpoint || "");
        setCustomModelName(settings.modelName || "");
      });
    }
  }, [open]);

  const handleDeleteChats = async () => {
    try {
      const conversations = await db.listConversations();
      await Promise.all(
        conversations.map((conv) => db.deleteConversation(conv.id))
      );
      setShowDeleteConfirm(false);
      router.push("/");
    } catch (error) {
      console.error("Error deleting conversations:", error);
    }
  };

  const handleSaveEndpoint = async () => {
    try {
      await db.setCustomEndpoint(
        customEndpoint || undefined,
        customModelName || undefined
      );
    } catch (error) {
      console.error("Error saving endpoint settings:", error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[350px]">
          <DialogHeader>
            <DialogTitle>settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="text-sm font-bold">appearance</h4>
              <div className="flex items-center justify-between">
                <div className="text-sm">theme</div>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="w-[100px] focus:ring-0 focus:ring-offset-0 h-8">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">system</SelectItem>
                    <SelectItem value="light">light</SelectItem>
                    <SelectItem value="dark">dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold">model endpoint</h4>
              <div className="space-y-2">
                <div className="text-sm">custom endpoint URL</div>
                <Input
                  type="text"
                  placeholder="openai compatible endpoint url"
                  value={customEndpoint}
                  onChange={(e) => setCustomEndpoint(e.target.value)}
                  className="h-8"
                />
                <div className="text-sm">model name</div>
                <Input
                  type="text"
                  placeholder="model name (e.g. gpt-4)"
                  value={customModelName}
                  onChange={(e) => setCustomModelName(e.target.value)}
                  className="h-8"
                />
                <Button
                  variant="secondary"
                  className="h-8 px-3 w-full hover:shadow-sm"
                  onClick={handleSaveEndpoint}
                >
                  save endpoint settings
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold">chats</h4>
              <div className="flex items-center justify-between">
                <Button
                  variant="destructive"
                  className="h-8 px-3"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  delete all conversations
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold">credits</h4>
              <p className="text-sm text-muted-foreground">version 0.1.0</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              this will permanently delete all your conversations.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteChats}>
              delete all
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
