import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Constants
const STORE_NAME = "melamchi";

// Types
type Rate = number;

interface RateState {
  depoRate: Rate;
  retailRate: Rate;
}

interface RateActions {
  setDepoRate: (rate: Rate) => void;
  setRetailRate: (rate: Rate) => void;
  getDepoRate: () => Rate;
  getRetailRate: () => Rate;
}

type StoreState = RateState & RateActions;

// Initial state
const initialState: RateState = {
  depoRate: 0,
  retailRate: 0,
};

// Store creation
const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setDepoRate: (rate) => set({ depoRate: rate }),
      setRetailRate: (rate) => set({ retailRate: rate }),
      getDepoRate: () => get().depoRate,
      getRetailRate: () => get().retailRate,
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useStore;
