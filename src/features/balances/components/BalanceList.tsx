import { useGetBalances } from '@/core/api/hooks/useBaseQueries';
import useMainStore from '@/core/store/mainStore';
import { BalanceItem } from '@/features/balances/components/BalanceItem';
import { useEffect } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function BalanceList() {
  const insets = useSafeAreaInsets();
  const { data: balancesData, isLoading, error, refetch } = useGetBalances();
  const { setBalances, claimedUSDT, claimedBTC, claimedETH } = useMainStore();

  useEffect(() => {
    if (balancesData) {
      setBalances(balancesData);
    }
  }, [balancesData, setBalances]);

  if (isLoading) {
    return (
      <View style={[styles.centered, styles.root]}>
        <ActivityIndicator color="#1F6F5B" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, styles.root]}>
        <Text style={styles.error}>Error: {error.message}</Text>
      </View>
    );
  }

  const items = balancesData?.items ?? [];

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.title}>Balances</Text>
          <Button title="Refresh" onPress={() => refetch()} />
        </View>      
        
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
        <View style={styles.claimedRows}>
          <View style={styles.claimedRow}>
            <Text style={styles.claimedAsset}>USDT</Text>
            <Text style={styles.claimedAmount}>{claimedUSDT}</Text>
          </View>
          <View style={styles.claimedRow}>
            <Text style={styles.claimedAsset}>BTC</Text>
            <Text style={styles.claimedAmount}>{claimedBTC}</Text>
          </View>
          <View style={styles.claimedRow}>
            <Text style={styles.claimedAsset}>ETH</Text>
            <Text style={styles.claimedAmount}>{claimedETH}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {    
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#2A3139',
  },
  totalClaimedText: {
    color: '#F4F7FA',
    fontSize: 20,
    fontWeight: '700',
  },
  claimedRows: {
    gap: 0,
  },
  claimedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2A3139',
  },
  claimedAsset: {
    color: '#C5CED8',
    fontSize: 15,
    fontWeight: '600',
  },
  claimedAmount: {
    color: '#F4F7FA',
    fontSize: 15,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
});
