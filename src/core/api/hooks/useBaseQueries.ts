import { useQuery } from '@tanstack/react-query';
import { baseApi } from '../base.api';

export const baseKeys = {  
  balances: ['balances'] as const,
};

export function useGetBalances() {
  return useQuery({
    queryKey: baseKeys.balances,
    queryFn: () => baseApi.getBalances(),
    // enabled: !!userId, // запрос не пойдет, если нет id
  });
}

// Хук для изменения данных (Mutation)
// export function useUpdateUserProfile() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, payload }: { id: string; payload: Partial<User> }) =>
//       userService.updateProfile(id, payload),
    
//     // После успешного обновления инвалидируем кэш, чтобы UI автоматически обновился
//     onSuccess: (data, variables) => {
//       queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
//     },
//   });
// }
