// src/store/authStore.ts
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import type { User } from "../interfaces/user";

type UpdateProfilePayload = Partial<Omit<User, "profile">> & {
  profile?: Partial<User["profile"]>;
};

interface AuthStore {
  user: User | null;
  isAuth: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (payload: UpdateProfilePayload) => void;
  
}

export const useAuthStore = create<AuthStore>()(
  persist<AuthStore>(
    (set) => ({
      user: null,
      isAuth: false,
      login: (user) => set({ user, isAuth: Boolean(user.token) }),
      logout: () => {
        set({ user: null, isAuth: false });
      },
      updateProfile: (payload) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              ...payload,
              profile: {
                ...state.user.profile,
                ...(payload.profile || {}),
              },
            },
          };
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
