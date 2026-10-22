import { useCatFact } from "@/core/api/hooks/useBaseQueries";
import useMainStore from "@/core/store/mainStore";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { data: catFactData, isLoading, error } = useCatFact();
  const { setCatFact, catFact } = useMainStore();

  useEffect(() => {
    console.log("catFactData", catFactData);
    setCatFact(catFactData || null);
  }, [catFactData]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const renderCatFact = () => {
    return (
      <Text>{catFact?.fact}</Text>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Details</Text>
      {renderCatFact()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});