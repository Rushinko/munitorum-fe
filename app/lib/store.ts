import { create } from "zustand";
import type { User } from "./types";

type AppStoreState = {
  user: User | null;
};

type AppStoreActions = {
  setUser: (user: AppStoreState["user"]) => void;
}

type AppStore = AppStoreState & AppStoreActions;

const useAppStore = create<AppStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useAppStore;
