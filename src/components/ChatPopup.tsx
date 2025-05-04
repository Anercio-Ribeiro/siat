import { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Chat from "@/components/Chat";
import { useChatStore } from "@/store/chatStore";

interface ChatPopupProps {
  contratoId: string;
  proprietarioId: string;
  inquilinoId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ChatPopup({ contratoId, proprietarioId, inquilinoId, isOpen, onClose }: ChatPopupProps) {
  const { resetUnread, setChatOpen } = useChatStore();

  useEffect(() => {
    if (isOpen) {
      resetUnread(contratoId);
    }
    setChatOpen(contratoId, isOpen);
  }, [isOpen, contratoId, resetUnread, setChatOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <Chat
          contratoId={contratoId}
          proprietarioId={proprietarioId}
          inquilinoId={inquilinoId}
        />
      </DialogContent>
    </Dialog>
  );
}