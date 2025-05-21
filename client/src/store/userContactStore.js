import { create } from "zustand";

const useUserContactStore=create((set)=>({
    contacts:null,
    setContacts:(contacts)=>set({contacts}),

    clearContacts: () => set({ contacts: null }),

    //updateUser({ name: 'Jane Doe' });
    updateChats: (updatedFields) =>
        set((state) => ({
            contacts: { ...state.contacts, ...updatedFields },
    })),
}))