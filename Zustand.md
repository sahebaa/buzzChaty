// src/store/useUserStore.js
import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,

  // Insert (set) user
  setUser: (userData) => set({ user: userData }),

  // Update user (partial update)
  updateUser: (updatedFields) =>
    set((state) => ({
      user: { ...state.user, ...updatedFields },
    })),

  // Delete user (clear)
  clearUser: () => set({ user: null }),

  // Getter (you access state.user directly in components)
}));

export default useUserStore;


### Insert  ###
import useUserStore from './store/useUserStore';

const user = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
};

useUserStore.getState().setUser(user);

### Or ###
const setUser = useUserStore((state) => state.setUser);
setUser(user);


### UPDATE USER ##

const updateUser = useUserStore((state) => state.updateUser);

// Update name only
updateUser({ name: 'Jane Doe' });

// Update email
updateUser({ email: 'jane@example.com' });


############# Delete user #############

const clearUser = useUserStore((state) => state.clearUser);
clearUser();


# GET USER ##

const user = useUserStore((state) => state.user);

console.log(user?.name);


# GETTING OBJECT AS WHOLE ##

If you want to listen to multiple values:
const { user, setUser, updateUser, clearUser } = useUserStore();
