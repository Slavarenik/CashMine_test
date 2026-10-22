import axios from 'axios';

import { deviceStorage } from '@/core/storage/deviceStorage';

const BASE_URL = 'https://task-api.cashmine.io';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const apiKey = await deviceStorage.getApiKey();

  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`;
  }

  return config;
});
