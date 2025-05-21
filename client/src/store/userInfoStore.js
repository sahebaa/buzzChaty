import { create } from 'zustand'

const useUserStore = create((set) => ({
    user:null,
    setUser:(user)=>set({user}),

    clearUser: () => set({ user: null }),

    //updateUser({ name: 'Jane Doe' });
    updateUser: (updatedFields) =>
        set((state) => ({
          user: { ...state.user, ...updatedFields },
        })),
    
}))

export default useUserStore;