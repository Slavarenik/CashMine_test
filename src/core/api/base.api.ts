import { apiClient } from '@/core/api/client';

export interface BalanceItem {
  asset: string;
  decimals: number;
  available: string;
  pending: string;
  claiming: string;
  usdPrice: string;
}

export interface BalancesResponse {
  asOf: string;
  items: BalanceItem[];
}

export const baseApi = {
  getBalances: async (): Promise<BalancesResponse> => {
    const { data } = await apiClient.get(`/v1/balances`);
    return data;
  },
};
