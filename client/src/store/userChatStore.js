import { create } from 'zustand'

const useUserChatStore = create((set) => ({
    chats:null,
    setChats:(chats)=>set({chats}),

    clearChats: () => set({ chats: null }),

    //updateUser({ name: 'Jane Doe' });
    updateChats: (updatedFields) =>
        set((state) => ({
          chats: { ...state.chats, ...updatedFields },
        })),
    
}))

export default useUserChatStore;

