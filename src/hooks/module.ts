import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Store = {
  token: string;
  setToken: (token: string) => void;
};

export const useStore = create(
  persist<Store>(
    (set): Store => ({
      token: "",
      setToken: (token: string) => set({ token }),
    }),
    {
      name: "storage",
      getStorage: () => localStorage,
    }
  )
);
