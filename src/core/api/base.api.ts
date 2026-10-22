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

export type AssetType = 'USDT' | 'BTC' | 'ETH';

export interface Destination {
  id: string;
  label: string;
}

export interface ClaimOptionsResponse {
  asset: AssetType;
  minAmount: string;
  fee: string;
  destinations: Destination[];
}

export const baseApi = {
  getBalances: async (): Promise<BalancesResponse> => {
    const { data } = await apiClient.get(`/v1/balances`);
    return data;
  },
  getClaimOptions: async (asset: AssetType): Promise<ClaimOptionsResponse> => {
    const { data } = await apiClient.get(`/v1/claim-options`, { params: { asset } });
    return data;
  },
};
