import { useQuery } from '@tanstack/react-query';
import { AssetType, baseApi } from '../base.api';

export const baseKeys = {  
  balances: ['balances'] as const,
  claimOptions: ['claim-options'] as const,
};

export function useGetBalances() {
  return useQuery({
    queryKey: baseKeys.balances,
    queryFn: () => baseApi.getBalances(),
    // enabled: !!userId, // запрос не пойдет, если нет id
  });
}

export function useGetClaimOptions(asset: AssetType) {
  return useQuery({
    queryKey: baseKeys.claimOptions,
    queryFn: () => baseApi.getClaimOptions(asset),
  });
}
