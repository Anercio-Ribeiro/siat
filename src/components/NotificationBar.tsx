import { Bell, Heart, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chatStore";
import { useRouter } from "next/navigation";

interface NotificationBarProps {
  contratoId?: string;
  proprietarioId?: string;
  inquilinoId?: string;
  onOpenChat?: (contratoId: string, proprietarioId: string, inquilinoId: string) => void;
}

export function NotificationBar({ contratoId, proprietarioId, inquilinoId, onOpenChat }: NotificationBarProps) {
  const { unreadCounts, setChatOpen } = useChatStore();
  const router = useRouter();

  const handleChatClick = () => {
    if (contratoId && proprietarioId && inquilinoId && onOpenChat) {
      onOpenChat(contratoId, proprietarioId, inquilinoId);
      setChatOpen(contratoId, true);
    }
  };

  return (
    <div className="flex items-center gap-4 p-2 bg-gray-100 border-b">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push("/favorites")}
        title="Favoritos"
      >
        <Heart className="h-5 w-5" />
      </Button>
      {contratoId && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleChatClick}
          title="Chat"
          className="relative"
        >
          <MessageCircle className="h-5 w-5" />
          {unreadCounts[contratoId] > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full"
            >
              {unreadCounts[contratoId]}
            </Badge>
          )}
        </Button>
      )}
    </div>
  );
}