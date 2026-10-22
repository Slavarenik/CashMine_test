import { useQuery } from '@tanstack/react-query';
import { baseApi } from '../base.api';

// Ключи запросов выносим в константы для предотвращения опечаток
export const baseKeys = {  
  catFact: ['catFact'] as const,
};

// Хук для получения данных (Query)
export function useCatFact() {
  return useQuery({
    queryKey: baseKeys.catFact,
    queryFn: () => baseApi.getCatFact(),
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
