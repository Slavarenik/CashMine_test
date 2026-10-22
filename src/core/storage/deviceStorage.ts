import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const API_KEY = 'apiKey';

async function setItem(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    globalThis.localStorage?.setItem(key, value);
    return;
  }

  await SecureStore.setItemAsync(key, value);
}

async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    return globalThis.localStorage?.getItem(key) ?? null;
  }

  return SecureStore.getItemAsync(key);
}

async function deleteItem(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    globalThis.localStorage?.removeItem(key);
    return;
  }

  await SecureStore.deleteItemAsync(key);
}

export const deviceStorage = {
  setApiKey: (apiKey: string) => setItem(API_KEY, apiKey),
  getApiKey: () => getItem(API_KEY),
  deleteApiKey: () => deleteItem(API_KEY),
};
