import { useGetBalances } from '@/core/api/hooks/useBaseQueries';
import useMainStore from '@/core/store/mainStore';
import { BalanceItem } from '@/features/balances';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { data: balancesData, isLoading, error } = useGetBalances();
  const { setBalances } = useMainStore();

  useEffect(() => {
    if (balancesData) {
      setBalances(balancesData);
    }
  }, [balancesData, setBalances]);

  if (isLoading) {
    return (
      <View style={[styles.centered, styles.screen]}>
        <ActivityIndicator color="#1F6F5B" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, styles.screen]}>
        <Text style={styles.error}>Error: {error.message}</Text>
      </View>
    );
  }

  const items = balancesData?.items ?? [];

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.title}>Balances</Text>
        {balancesData?.asOf ? (
          <Text style={styles.asOf}>as of {new Date(balancesData.asOf).toLocaleString()}</Text>
        ) : null}
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.asset}
        renderItem={({ item }) => <BalanceItem item={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.empty}>No balances yet</Text>}
      />

      <View style={styles.totalClaimed}>
        <Text style={styles.totalClaimedText}>Total claimed</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0E1216',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2A3139',
  },
  title: {
    color: '#F4F7FA',
    fontSize: 28,
    fontWeight: '700',
  },
  asOf: {
    color: '#8B96A3',
    fontSize: 12,
    fontWeight: '500',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  empty: {
    marginTop: 48,
    textAlign: 'center',
    color: '#8B96A3',
    fontSize: 14,
  },
  error: {
    color: '#E57373',
    textAlign: 'center',
  },
  totalClaimed: {
    padding: 24,
    paddingBottom: 12,
    gap: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#2A3139',
  },
  totalClaimedText: {
    color: '#F4F7FA',
    fontSize: 20,
    fontWeight: '700',
  },
});
