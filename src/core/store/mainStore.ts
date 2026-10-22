import { create } from 'zustand';
import { CatFact } from '../api/base.api';

type State = 'loading' | 'loaded' | 'error';

interface MainStore {
  apiKey: string | null;
  setApiKey: (apiKey: string | null) => void;
  state: State;
  setState: (state: State) => void;
  catFact: CatFact | null;
  setCatFact: (catFact: CatFact | null) => void;
}

const useMainStore = create<MainStore>((set) => ({
  state: 'loaded',  
  setState: (state: State) => set({ state }),
  catFact: null,
  setCatFact: (catFact: CatFact | null) => set({ catFact }),
  apiKey: null,
  setApiKey: (apiKey: string | null) => set({ apiKey }),
}))

export default useMainStore;