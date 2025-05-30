// import { useState, useEffect } from "react";
// import { Send } from "lucide-react";
// import {
//   ChatBubble,
//   ChatBubbleAvatar,
//   ChatBubbleMessage,
// } from "@/components/ui/chat/chat-bubble";
// import { ChatInput } from "@/components/ui/chat/chat-input";
// import {
//   ExpandableChat,
//   ExpandableChatHeader,
//   ExpandableChatBody,
//   ExpandableChatFooter,
// } from "@/components/ui/chat/expandable-chat";
// import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
// import { Button } from "@/components/ui/button";
// import { useSocket } from "@/hooks/useSocket";
// import { useUser } from "@/hooks/getUser";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { useChatStore } from "@/store/chatStore";
// import Image from "next/image";

// interface ChatSupportProps {
//   contratoId: string;
//   proprietarioId: string;
//   inquilinoId: string;
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface UserInfo {
//   id: string;
//   nome: string;
//   picture: string;
// }

// export default function ChatComponent({
//   contratoId,
//   proprietarioId,
//   inquilinoId,
//   isOpen,
//   onClose,
// }: ChatSupportProps) {
//   const { user } = useUser();
//   const [message, setMessage] = useState("");
//   const { messages, sendMessage, isConnected } = useSocket(contratoId, user?.id || "");
//   const [isLoading, setIsLoading] = useState(true);
//   const [users, setUsers] = useState<{ proprietario?: UserInfo; inquilino?: UserInfo }>({});
//   const { resetUnread, setChatOpen } = useChatStore();

//   useEffect(() => {
//     async function fetchUserNames() {
//       try {
//         const response = await fetch(`/api/users?proprietarioId=${proprietarioId}&inquilinoId=${inquilinoId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch user names");
//         }
//         const data = await response.json();
//         setUsers(data);
//         console.log("User names loaded:", data);
//       } catch (error) {
//         console.error("Error fetching user names:", error);
//       }
//     }
//     fetchUserNames();
//   }, [proprietarioId, inquilinoId]);

//   useEffect(() => {
//     if (messages.length > 0 || !isConnected) {
//       setIsLoading(false);
//     }
//   }, [messages, isConnected]);

//   useEffect(() => {
//     if (isOpen) {
//       resetUnread(contratoId);
//     }
//     setChatOpen(contratoId, isOpen);
//   }, [isOpen, contratoId, resetUnread, setChatOpen]);

//   const handleSendMessage = () => {
//     if (message.trim() && user) {
//       console.log("Sending message from chat:", { message, userId: user.id });
//       sendMessage(message);
//       setMessage("");
//     }
//   };

//   console.log("Chat messages:", messages);

//   return (
//     <ExpandableChat size="lg" position="bottom-right">
//       <ExpandableChatHeader className="flex-col text-center justify-center">
//         <h1 className="text-xl font-semibold">Chat de Negociação</h1>
//         <p>Converse com {users.proprietario?.nome || "Proprietário"} ou {users.inquilino?.nome || "Inquilino"}</p>
//       </ExpandableChatHeader>
//       <ExpandableChatBody>
//         {!isConnected && (
//           <Alert variant="destructive" className="m-4">
//             <AlertDescription>Desconectado do chat. Tentando reconectar...</AlertDescription>
//           </Alert>
//         )}
//         <ChatMessageList>
//           {isLoading ? (
//             <div className="text-gray-500 text-center">Carregando mensagens...</div>
//           ) : messages.length === 0 ? (
//             <div className="text-gray-500 text-center">Nenhuma mensagem ainda.</div>
//           ) : (
//             messages.map((msg, index) => (
//               <ChatBubble key={index} variant={msg.userId === user?.id ? "sent" : "received"}>
//                 {/* {user?.picture && <Image src={user.picture} alt="User avatar" width={40} height={40} />} */}
//                 <ChatBubbleAvatar src={msg.userId === user?.id ? user?.picture ?? undefined : users.proprietario?.picture ?? undefined} />
//                 <ChatBubbleMessage>
//                   <div className="text-sm font-semibold">
//                     {msg.userId === user?.id
//                       ? "Você"
//                       : msg.userId === proprietarioId
//                       ? users.proprietario?.nome || "Proprietário"
//                       : users.inquilino?.nome || "Inquilino"}
//                   </div>
//                   {msg.message}
//                   <div className="text-xs text-gray-500">
//                     {new Date(msg.timestamp).toLocaleTimeString("pt-BR")}
//                   </div>
//                 </ChatBubbleMessage>
//               </ChatBubble>
//             ))
//           )}
//         </ChatMessageList>
//       </ExpandableChatBody>
//       <ExpandableChatFooter>
//         <ChatInput
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Digite sua mensagem..."
//           onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//           disabled={!isConnected}
//         />
//         <Button type="submit" size="icon" onClick={handleSendMessage} disabled={!isConnected}>
//           <Send className="size-4" />
//         </Button>
//       </ExpandableChatFooter>
//     </ExpandableChat>
//   );
// }











"use client";

import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/chat/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/hooks/useSocket";
import { useUser } from "@/hooks/getUser";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useChatStore } from "@/store/chatStore";

interface ChatSupportProps {
  contratoId: string;
  proprietarioId: string;
  inquilinoId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface UserInfo {
  id: string;
  nome: string;
  picture: string;
}

export default function ChatComponent({
  contratoId,
  proprietarioId,
  inquilinoId,
  isOpen,
  onClose,
}: ChatSupportProps) {
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const { messages, sendMessage, isConnected } = useSocket(contratoId, user?.id || "");
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<{ proprietario?: UserInfo; inquilino?: UserInfo }>({});
  const { resetUnread, setChatOpen } = useChatStore();

  useEffect(() => {
    async function fetchUserNames() {
      try {
        const response = await fetch(
          `/api/users?proprietarioId=${proprietarioId}&inquilinoId=${inquilinoId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user names");
        }
        const data = await response.json();
        setUsers(data);
        console.log("User names loaded:", data);
      } catch (error) {
        console.error("Error fetching user names:", error);
      }
    }
    fetchUserNames();
  }, [proprietarioId, inquilinoId]);

  useEffect(() => {
    if (messages.length > 0 || !isConnected) {
      setIsLoading(false);
    }
  }, [messages, isConnected]);

  useEffect(() => {
    if (isOpen) {
      resetUnread(contratoId);
    }
    setChatOpen(contratoId, isOpen);
  }, [isOpen, contratoId, resetUnread, setChatOpen]);

  const handleSendMessage = () => {
    if (message.trim() && user) {
      console.log("Sending message from chat:", { message, userId: user.id });
      sendMessage(message);
      setMessage("");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  console.log("Chat messages:", messages);

  return (
    <ExpandableChat
      className="max-h-[100px] rounded-2xl shadow-lg"
    >
      <ExpandableChatHeader className="bg-gray-100 rounded-t-2xl">
        <h1 className="text-lg font-semibold text-center">Chat de Negociação</h1>
      </ExpandableChatHeader>
      <ExpandableChatBody className="bg-white">
        {!isConnected && (
          <Alert variant="destructive" className="m-2">
            <AlertDescription>Desconectado do chat. Tentando reconectar...</AlertDescription>
          </Alert>
        )}
        <ChatMessageList className="p-3">
          {isLoading ? (
            <div className="text-gray-500 text-center text-sm">Carregando mensagens...</div>
          ) : messages.length === 0 ? (
            <div className="text-gray-500 text-center text-sm">Nenhuma mensagem ainda.</div>
          ) : (
            messages.map((msg, index) => {
              const isSent = msg.userId === user?.id;
              const avatarSrc = isSent
                ? user?.picture
                : msg.userId === proprietarioId
                ? users.proprietario?.picture
                : users.inquilino?.picture;
              const userName = isSent
                ? user?.nome
                : msg.userId === proprietarioId
                ? users.proprietario?.nome
                : users.inquilino?.nome;

              return (
                <ChatBubble
                  key={index}
                  variant={isSent ? "sent" : "received"}
                  className={`flex ${isSent ? "justify-end" : "justify-start"} items-end gap-2 mb-2`}
                >
                  {!isSent && (
                    <ChatBubbleAvatar
                      src={avatarSrc || undefined}
                      fallback={getInitials(userName || "Usuário")}
                      className="w-8 h-8"
                    />
                  )}
                  <ChatBubbleMessage
                    className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm ${
                      isSent ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.message}
                    <div
                      className={`text-xs ${
                        isSent ? "text-blue-100" : "text-gray-500"
                      } mt-1 text-right`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </ChatBubbleMessage>
                  {isSent && (
                    <ChatBubbleAvatar
                      src={avatarSrc || undefined}
                      fallback={getInitials(userName || "Usuário")}
                      className="w-8 h-8"
                    />
                  )}
                </ChatBubble>
              );
            })
          )}
        </ChatMessageList>
      </ExpandableChatBody>
      <ExpandableChatFooter className="bg-gray-100 rounded-b-2xl p-2">
        <div className="flex items-center gap-2">
          <ChatInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={!isConnected}
            className="flex-1 rounded-full border-gray-300 bg-white text-sm py-2 px-4"
          />
          <Button
            type="submit"
            size="icon"
            onClick={handleSendMessage}
            disabled={!isConnected}
            className="rounded-full h-9 w-9 bg-blue-500 hover:bg-blue-600"
          >
            <Send className="size-4 text-white" />
          </Button>
        </div>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}