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
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SettingsDialog({
  isOpen,
  onOpenChange,
}: SettingsDialogProps): JSX.Element {
  const { theme, setTheme } = useTheme();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  const handleDeleteChats = async () => {
    try {
      const response = await fetch("/api/conversations?deleteAll=true", {
        method: "DELETE",
      });

      if (response.ok) {
        setShowDeleteConfirm(false);
        router.replace("/");
      } else {
        console.error("Failed to delete conversations");
      }
    } catch (error) {
      console.error("Error deleting conversations:", error);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="h-8 px-3">
                close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>are you sure?</AlertDialogTitle>
            <AlertDialogDescription>are you sure?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteChats}
              className="bg-red-500 hover:bg-red-600"
            >
              delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
