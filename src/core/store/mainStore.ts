import { create } from 'zustand';

import type { BalancesResponse } from '@/core/api/base.api';

interface MainStore {
  apiKey: string | null;
  setApiKey: (apiKey: string | null) => void;
  balances: BalancesResponse | null;
  setBalances: (balances: BalancesResponse | null) => void;
  claimedUSDT: number;
  setClaimedUSDT: (claimedUSDT: number) => void;
  claimedBTC: number;
  setClaimedBTC: (claimedBTC: number) => void;
  claimedETH: number;
  setClaimedETH: (claimedETH: number) => void;
}

const useMainStore = create<MainStore>((set) => ({
  apiKey: null,
  setApiKey: (apiKey: string | null) => set({ apiKey }),
  balances: null,
  setBalances: (balances: BalancesResponse | null) => set({ balances }),
  claimedUSDT: 0,
  setClaimedUSDT: (claimedUSDT: number) => set({ claimedUSDT }),
  claimedBTC: 0,
  setClaimedBTC: (claimedBTC: number) => set({ claimedBTC }),
  claimedETH: 0,
  setClaimedETH: (claimedETH: number) => set({ claimedETH }),
}));

export default useMainStore;
