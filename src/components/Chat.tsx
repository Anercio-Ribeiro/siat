// import { forwardRef, useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useSocket } from "@/hooks/useSocket";
// import { useUser } from "@/hooks/getUser";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// interface ChatProps {
//   contratoId: string;
//   proprietarioId: string;
//   inquilinoId: string;
// }

// interface UserInfo {
//   id: string;
//   name: string;
// }

// const Chat = forwardRef<HTMLDivElement, ChatProps>(
//   ({ contratoId, proprietarioId, inquilinoId }, ref) => {
//     const { user } = useUser();
//     const [message, setMessage] = useState("");
//     const { messages, sendMessage, isConnected } = useSocket(contratoId, user?.id || "");
//     const [isLoading, setIsLoading] = useState(true);
//     const [users, setUsers] = useState<{ proprietario?: UserInfo; inquilino?: UserInfo }>({});

//     useEffect(() => {
//       async function fetchUserNames() {
//         try {
//           const response = await fetch(`/api/users?proprietarioId=${proprietarioId}&inquilinoId=${inquilinoId}`);
//           if (!response.ok) {
//             throw new Error("Failed to fetch user names");
//           }
//           const data = await response.json();
//           setUsers(data);
//           console.log("User names loaded:", data);
//         } catch (error) {
//           console.error("Error fetching user names:", error);
//         }
//       }
//       fetchUserNames();
//     }, [proprietarioId, inquilinoId]);

//     useEffect(() => {
//       if (messages.length > 0 || !isConnected) {
//         setIsLoading(false);
//       }
//     }, [messages, isConnected]);

//     const handleSendMessage = () => {
//       if (message.trim() && user) {
//         console.log("Sending message from chat:", { message, userId: user.id });
//         sendMessage(message);
//         setMessage("");
//       }
//     };

//     console.log("Chat messages:", messages);

//     return (
//       <Card className="mt-6" ref={ref}>
//         <CardHeader>
//           <CardTitle>Chat de Negociação</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {!isConnected && (
//             <Alert variant="destructive" className="mb-4">
//               <AlertDescription>Desconectado do chat. Tentando reconectar...</AlertDescription>
//             </Alert>
//           )}
//           <ScrollArea className="h-[300px] mb-4">
//             {isLoading ? (
//               <div className="text-gray-500 text-center">Carregando mensagens...</div>
//             ) : messages.length === 0 ? (
//               <div className="text-gray-500 text-center">Nenhuma mensagem ainda.</div>
//             ) : (
//               messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`mb-2 p-2 rounded ${
//                     msg.userId === user?.id ? "bg-blue-100 ml-auto" : "bg-gray-100"
//                   } max-w-[70%]`}
//                 >
//                   <div className="text-sm font-semibold">
//                     {msg.userId === user?.id
//                       ? "Você"
//                       : msg.userId === proprietarioId
//                       ? users.proprietario?.name || "Proprietário"
//                       : users.inquilino?.name || "Inquilino"}
//                   </div>
//                   <div>{msg.message}</div>
//                   <div className="text-xs text-gray-500">
//                     {new Date(msg.timestamp).toLocaleTimeString("pt-BR")}
//                   </div>
//                 </div>
//               ))
//             )}
//           </ScrollArea>
//           <div className="flex gap-2">
//             <Input
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Digite sua mensagem..."
//               onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//               disabled={!isConnected}
//             />
//             <Button onClick={handleSendMessage} disabled={!isConnected}>
//               Enviar
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }
// );

// Chat.displayName = "Chat";

// export default Chat;






// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useSocket } from "@/hooks/useSocket";
// import { useUser } from "@/hooks/getUser";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// interface ChatProps {
//   contratoId: string;
//   proprietarioId: string;
//   inquilinoId: string;
// }

// interface UserInfo {
//   id: string;
//   name: string;
// }

// export default function Chat({ contratoId, proprietarioId, inquilinoId }: ChatProps) {
//   const { user } = useUser();
//   const [message, setMessage] = useState("");
//   const { messages, sendMessage, isConnected } = useSocket(contratoId, user?.id || "");
//   const [isLoading, setIsLoading] = useState(true);
//   const [users, setUsers] = useState<{ proprietario?: UserInfo; inquilino?: UserInfo }>({});

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

//   const handleSendMessage = () => {
//     if (message.trim() && user) {
//       console.log("Sending message from chat:", { message, userId: user.id });
//       sendMessage(message);
//       setMessage("");
//     }
//   };

//   console.log("Chat messages:", messages);

//   return (
//     <div className="flex flex-col h-[400px] bg-white">
//       <div className="p-4 border-b">
//         <h2 className="text-lg font-semibold">Chat de Negociação</h2>
//       </div>
//       <div className="flex-1 flex flex-col">
//         {!isConnected && (
//           <Alert variant="destructive" className="m-4">
//             <AlertDescription>Desconectado do chat. Tentando reconectar...</AlertDescription>
//           </Alert>
//         )}
//         <ScrollArea className="flex-1 p-4">
//           {isLoading ? (
//             <div className="text-gray-500 text-center">Carregando mensagens...</div>
//           ) : messages.length === 0 ? (
//             <div className="text-gray-500 text-center">Nenhuma mensagem ainda.</div>
//           ) : (
//             messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`mb-2 p-2 rounded ${
//                   msg.userId === user?.id ? "bg-blue-100 ml-auto" : "bg-gray-100"
//                 } max-w-[70%]`}
//               >
//                 <div className="text-sm font-semibold">
//                   {msg.userId === user?.id
//                     ? "Você"
//                     : msg.userId === proprietarioId
//                     ? users.proprietario?.name || "Proprietário"
//                     : users.inquilino?.name || "Inquilino"}
//                 </div>
//                 <div>{msg.message}</div>
//                 <div className="text-xs text-gray-500">
//                   {new Date(msg.timestamp).toLocaleTimeString("pt-BR")}
//                 </div>
//               </div>
//             ))
//           )}
//         </ScrollArea>
//         <div className="p-4 border-t">
//           <div className="flex gap-2">
//             <Input
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Digite sua mensagem..."
//               onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//               disabled={!isConnected}
//             />
//             <Button onClick={handleSendMessage} disabled={!isConnected}>
//               Enviar
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSocket } from "@/hooks/useSocket";
import { useUser } from "@/hooks/getUser";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ChatProps {
  contratoId: string;
  proprietarioId: string;
  inquilinoId: string;
}

interface UserInfo {
  id: string;
  name: string;
}

export default function Chat({ contratoId, proprietarioId, inquilinoId }: ChatProps) {
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const { messages, sendMessage, isConnected } = useSocket(contratoId, user?.id || "");
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<{ proprietario?: UserInfo; inquilino?: UserInfo }>({});

  useEffect(() => {
    async function fetchUserNames() {
      try {
        const response = await fetch(`/api/users?proprietarioId=${proprietarioId}&inquilinoId=${inquilinoId}`);
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

  const handleSendMessage = () => {
    if (message.trim() && user) {
      console.log("Sending message from chat:", { message, userId: user.id });
      sendMessage(message);
      setMessage("");
    }
  };

  console.log("Chat messages:", messages);

  return (
    <div className="flex flex-col h-[400px] bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Chat de Negociação</h2>
      </div>
      <div className="flex-1 flex flex-col">
        {!isConnected && (
          <Alert variant="destructive" className="m-4">
            <AlertDescription>Desconectado do chat. Tentando reconectar...</AlertDescription>
          </Alert>
        )}
        <ScrollArea className="flex-1 p-4">
          {isLoading ? (
            <div className="text-gray-500 text-center">Carregando mensagens...</div>
          ) : messages.length === 0 ? (
            <div className="text-gray-500 text-center">Nenhuma mensagem ainda.</div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded ${
                  msg.userId === user?.id ? "bg-blue-100 ml-auto" : "bg-gray-100"
                } max-w-[70%]`}
              >
                <div className="text-sm font-semibold">
                  {msg.userId === user?.id
                    ? "Você"
                    : msg.userId === proprietarioId
                    ? users.proprietario?.name || "Proprietário"
                    : users.inquilino?.name || "Inquilino"}
                </div>
                <div>{msg.message}</div>
                <div className="text-xs text-gray-500">
                  {new Date(msg.timestamp).toLocaleTimeString("pt-BR")}
                </div>
              </div>
            ))
          )}
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={!isConnected}
            />
            <Button onClick={handleSendMessage} disabled={!isConnected}>
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}