import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chatStore";

interface FloatingChatButtonProps {
  contratoId?: string;
  proprietarioId?: string;
  inquilinoId?: string;
  onOpenChat: () => void;
}

export function FloatingChatButton({
  contratoId,
  proprietarioId,
  inquilinoId,
  onOpenChat,
}: FloatingChatButtonProps) {
  const { unreadCounts } = useChatStore();

  if (!contratoId || !proprietarioId || !inquilinoId) {
    return null;
  }

  return (
    <Button
      variant="default"
      size="icon"
      className="fixed right-4 top-1/2 transform -translate-y-1/2 rounded-full h-12 w-12 shadow-lg"
      onClick={onOpenChat}
    >
      <MessageCircle className="h-6 w-6" />
      {unreadCounts[contratoId] > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full"
        >
          {unreadCounts[contratoId]}
        </Badge>
      )}
    </Button>
  );
}