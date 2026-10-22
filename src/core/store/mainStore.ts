import { create } from 'zustand';

import type { BalancesResponse } from '@/core/api/base.api';

interface MainStore {
  apiKey: string | null;
  setApiKey: (apiKey: string | null) => void;
  balances: BalancesResponse | null;
  setBalances: (balances: BalancesResponse | null) => void;
}

const useMainStore = create<MainStore>((set) => ({
  apiKey: null,
  setApiKey: (apiKey: string | null) => set({ apiKey }),
  balances: null,
  setBalances: (balances: BalancesResponse | null) => set({ balances }),
}));

export default useMainStore;
