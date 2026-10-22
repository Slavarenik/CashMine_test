import useMainStore from "@/core/store/mainStore";
import { router } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const { apiKey, setApiKey } = useMainStore();
  const [apiKeyInput, setApiKeyInput] = useState<string | null>(null);

  const handleSave = () => {
    if (apiKeyInput && apiKeyInput.length > 10) {
      setApiKey(apiKeyInput);
      router.push('/home');
    }
  }
  
  return (
    <View style={styles.container}>
      <Text>Enter your api key</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your api key"
        value={apiKeyInput || ''}
        onChangeText={setApiKeyInput}
      />
      <Button
        title="Save"
        onPress={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10,
    width: '80%',
  },
});