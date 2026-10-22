import { StyleSheet, Text, View } from 'react-native';

import type { BalanceItem as BalanceItemData } from '@/core/api/base.api';

type BalanceItemProps = {
  item: BalanceItemData;
};

function formatAmount(value: string, decimals: number): string {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    return value;
  }

  return parsed.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: Math.min(decimals, 8),
  });
}

function formatUsd(available: string, usdPrice: string): string {
  const amount = Number(available);
  const price = Number(usdPrice);

  if (Number.isNaN(amount) || Number.isNaN(price)) {
    return '—';
  }

  return (amount * price).toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  });
}

export function BalanceItem({ item }: BalanceItemProps) {
  const { asset, decimals, available, pending, claiming, usdPrice } = item;
  const ticker = asset.slice(0, 1).toUpperCase();

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{ticker}</Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.asset}>{asset}</Text>
          <Text style={styles.secondary}>
            pending {formatAmount(pending, decimals)} · claiming{' '}
            {formatAmount(claiming, decimals)}
          </Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.available}>{formatAmount(available, decimals)}</Text>
        <Text style={styles.usd}>{formatUsd(available, usdPrice)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2A3139',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minWidth: 0,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F6F5B',
  },
  avatarText: {
    color: '#E8FFF6',
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    flex: 1,
    gap: 4,
    minWidth: 0,
  },
  asset: {
    color: '#F4F7FA',
    fontSize: 16,
    fontWeight: '600',
  },
  secondary: {
    color: '#8B96A3',
    fontSize: 12,
    fontWeight: '500',
  },
  right: {
    alignItems: 'flex-end',
    gap: 4,
  },
  available: {
    color: '#F4F7FA',
    fontSize: 16,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  usd: {
    color: '#8B96A3',
    fontSize: 12,
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
  },
});
