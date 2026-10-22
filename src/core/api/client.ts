import axios from 'axios';

const BASE_URL = 'https://catfact.ninja';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});