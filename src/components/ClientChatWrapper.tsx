// "use client";

// import { useState } from "react";
// import { FloatingChatButton } from "@/components/chat-components/FloatingChatButton";
// import ChatSupport from "@/components/chat-components/chat-component";
// import { useContract } from "@/context/ContractContext";

// export function ClientChatWrapper() {
//   const [chatOpen, setChatOpen] = useState(false);
//   const { contratoId, proprietarioId, inquilinoId } = useContract();

//   const handleOpenChat = () => {
//     setChatOpen(true);
//   };

//   return (
//     <>
//       <FloatingChatButton
//         contratoId={contratoId || undefined}
//         proprietarioId={proprietarioId || undefined}
//         inquilinoId={inquilinoId || undefined}
//         onOpenChat={handleOpenChat}
//       />
//       {contratoId && proprietarioId && inquilinoId && (
//         <ChatSupport
//           contratoId={contratoId}
//           proprietarioId={proprietarioId}
//           inquilinoId={inquilinoId}
//           isOpen={chatOpen}
//           onClose={() => setChatOpen(false)}
//         />
//       )}
//     </>
//   );
// }






"use client";

import { useState } from "react";
import { FloatingChatButton } from "@/components/chat-components/FloatingChatButton";
import ChatSupport from "@/components/chat-components/chat-component";
import { useContract } from "@/context/ContractContext";
import { useUser } from "@/hooks/getUser";

export function ClientChatWrapper() {
  const [chatOpen, setChatOpen] = useState(false);
  const { contratoId, proprietarioId, inquilinoId } = useContract();
  const { user } = useUser();

  const handleOpenChat = () => {
    setChatOpen(true);
  };

  // Hide chat if no user is logged in or user is ADMIN
  if (!user || user.role === "ADMIN") {
    return null;
  }

  // Only render if contract context is fully available
  if (!contratoId || !proprietarioId || !inquilinoId) {
    return null;
  }

  return (
    <>
      <FloatingChatButton
        contratoId={contratoId}
        proprietarioId={proprietarioId}
        inquilinoId={inquilinoId}
        onOpenChat={handleOpenChat}
      />
      <ChatSupport
        contratoId={contratoId}
        proprietarioId={proprietarioId}
        inquilinoId={inquilinoId}
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </>
  );
}