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
      incrementUnread: (AluguelId) =>
        set((state) => ({
          unreadCounts: {
            ...state.unreadCounts,
            [AluguelId]: (state.unreadCounts[AluguelId] || 0) + 1,
          },
        })),
      resetUnread: (AluguelId) =>
        set((state) => ({
          unreadCounts: {
            ...state.unreadCounts,
            [AluguelId]: 0,
          },
        })),
      setChatOpen: (AluguelId, isOpen) =>
        set((state) => ({
          isChatOpen: {
            ...state.isChatOpen,
            [AluguelId]: isOpen,
          },
        })),
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({ unreadCounts: state.unreadCounts, isChatOpen: state.isChatOpen }),
    }
  )
);