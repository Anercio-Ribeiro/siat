import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChatState {
  unreadCounts: Record<string, number>;
  incrementUnread: (contratoId: string) => void;
  resetUnread: (contratoId: string) => void;
  setChatOpen: (contratoId: string, isOpen: boolean) => void;
  isChatOpen: Record<string, boolean>;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      unreadCounts: {},
      isChatOpen: {},
      incrementUnread: (contratoId) =>
        set((state) => ({
          unreadCounts: {
            ...state.unreadCounts,
            [contratoId]: (state.unreadCounts[contratoId] || 0) + 1,
          },
        })),
      resetUnread: (contratoId) =>
        set((state) => ({
          unreadCounts: {
            ...state.unreadCounts,
            [contratoId]: 0,
          },
        })),
      setChatOpen: (contratoId, isOpen) =>
        set((state) => ({
          isChatOpen: {
            ...state.isChatOpen,
            [contratoId]: isOpen,
          },
        })),
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({ unreadCounts: state.unreadCounts, isChatOpen: state.isChatOpen }),
    }
  )
);