// app/(tabs)/_layout.tsx
import useMainStore from '@/core/store/mainStore';
import { Stack, Tabs } from 'expo-router';

export default function TabsLayout() {
  const { apiKey } = useMainStore();

  if (!apiKey) {
    return (
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    )
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF', 
        tabBarInactiveTintColor: 'gray',   
        headerShown: true,                 
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',         
        }}
      />      
      <Tabs.Screen
        name="details"
        options={{
          title: 'Details',          
        }}
      />
    </Tabs>
  );
}
