// import { useEffect, useState } from "react";
// import Pusher from "pusher-js";
// import { useChatStore } from "@/store/chatStore";

// interface Message {
//   userId: string;
//   message: string;
//   timestamp: string;
// }

// export function useSocket(contratoId: string, userId: string) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isConnected, setIsConnected] = useState(false);
//   const { isChatOpen, incrementUnread } = useChatStore();

//   useEffect(() => {
//     console.log("Initializing Pusher client for contratoId:", contratoId);

//     async function loadMessages() {
//       let retries = 3;
//       while (retries > 0) {
//         try {
//           const response = await fetch(`/api/messages?contratoId=${contratoId}`);
//           if (!response.ok) {
//             throw new Error(`Failed to fetch messages: ${response.statusText}`);
//           }
//           const loadedMessages: Message[] = await response.json();
//           setMessages(loadedMessages);
//           console.log("Messages loaded from API:", loadedMessages);
//           return;
//         } catch (error) {
//           console.error(`Error loading messages (attempt ${4 - retries}/3):`, error);
//           retries--;
//           if (retries === 0) {
//             console.error("Failed to load messages after 3 attempts");
//           }
//           await new Promise((resolve) => setTimeout(resolve, 1000));
//         }
//       }
//     }
//     loadMessages();

//     const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
//       cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
//       forceTLS: true,
//     });
//     console.log("Pusher connecting to channel:", contratoId);

//     const channel = pusher.subscribe(contratoId);
//     channel.bind("message", (data: Message) => {
//       console.log("Message received via Pusher:", data);
//       setMessages((prev) => [...prev, data]);
//       if (!isChatOpen[contratoId]) {
//         incrementUnread(contratoId);
//       }
//     });

//     channel.bind("pusher:subscription_succeeded", () => {
//       console.log("Pusher subscription succeeded for contratoId:", contratoId);
//       setIsConnected(true);
//     });

//     channel.bind("pusher:subscription_error", (error: any) => {
//       console.error("Pusher subscription error:", error);
//       setIsConnected(false);
//     });

//     return () => {
//       console.log("Cleaning up Pusher client...");
//       pusher.unsubscribe(contratoId);
//       pusher.disconnect();
//       setIsConnected(false);
//     };
//   }, [contratoId, userId, isChatOpen, incrementUnread]);

//   const sendMessage = async (message: string) => {
//     if (!isConnected) {
//       console.error("Cannot send message: Pusher not connected");
//       return;
//     }

//     console.log("Sending message via Pusher:", { contratoId, userId, message });
//     try {
//       const response = await fetch("/api/pusher", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ contratoId, userId, message }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to send message");
//       }
//       console.log("Message sent successfully");
//     } catch (error) {
//       console.error("Error sending Pusher message:", error);
//     }
//   };

//   return { messages, sendMessage, isConnected };
// }

















import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { useChatStore } from "@/store/chatStore";

interface Message {
  userId: string;
  message: string;
  timestamp: string;
}

export function useSocket(contratoId: string, userId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const { isChatOpen, incrementUnread } = useChatStore();

  useEffect(() => {
    console.log("Initializing Pusher client for contratoId:", contratoId);

    async function loadMessages() {
      let retries = 3;
      while (retries > 0) {
        try {
          const response = await fetch(`/api/messages?contratoId=${contratoId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch messages: ${response.statusText}`);
          }
          const loadedMessages: Message[] = await response.json();
          setMessages(loadedMessages);
          console.log("Messages loaded from API:", loadedMessages);
          return;
        } catch (error) {
          console.error(`Error loading messages (attempt ${4 - retries}/3):`, error);
          retries--;
          if (retries === 0) {
            console.error("Failed to load messages after 3 attempts");
          }
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
    loadMessages();

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      forceTLS: true,
    });
    console.log("Pusher connecting to channel:", contratoId);

    const channel = pusher.subscribe(contratoId);
    channel.bind("message", (data: Message) => {
      console.log("Message received via Pusher:", data);
      setMessages((prev) => [...prev, data]);
      if (!isChatOpen[contratoId]) {
        incrementUnread(contratoId);
      }
    });

    channel.bind("pusher:subscription_succeeded", () => {
      console.log("Pusher subscription succeeded for contratoId:", contratoId);
      setIsConnected(true);
    });

    channel.bind("pusher:subscription_error", (error: any) => {
      console.error("Pusher subscription error:", error);
      setIsConnected(false);
    });

    return () => {
      console.log("Cleaning up Pusher client...");
      pusher.unsubscribe(contratoId);
      pusher.disconnect();
      setIsConnected(false);
    };
  }, [contratoId, userId, isChatOpen, incrementUnread]);

  const sendMessage = async (message: string) => {
    if (!isConnected) {
      console.error("Cannot send message: Pusher not connected");
      return;
    }

    console.log("Sending message via Pusher:", { contratoId, userId, message });
    try {
      const response = await fetch("/api/pusher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contratoId, userId, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending Pusher message:", error);
    }
  };

  return { messages, sendMessage, isConnected };
}