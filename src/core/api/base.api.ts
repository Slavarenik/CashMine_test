import { apiClient } from '../api/client';

export interface CatFact {
  fact: string;
  length: number;
}

export const baseApi = {  
  getCatFact: async (): Promise<CatFact> => {
    const { data } = await apiClient.get(`/fact`, { params: { max_length: 140 } });
    return data;
  },
};