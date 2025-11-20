import { create } from "zustand";

interface LoadingStore {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  loading: false,
  showLoader: () => set({ loading: true }),
  hideLoader: () => set({ loading: false }),
}));
