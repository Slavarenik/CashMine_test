import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <View style={styles.webScreenWrapper}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </QueryClientProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  webScreenWrapper: {
    flex: 1,
    backgroundColor: '#0E1216',
    alignSelf: 'center',
    width: Platform.OS === 'web' ? 390 : '100%',
  },
});