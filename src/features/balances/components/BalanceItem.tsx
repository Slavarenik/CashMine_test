import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import type { AssetType, BalanceItem as BalanceItemData } from '@/core/api/base.api';
import { useGetClaimOptions } from '@/core/api/hooks/useBaseQueries';
import useMainStore from '@/core/store/mainStore';
import {
  formatAmount,
  formatUsd,
  hasClaimableAvailable,
} from '@/shared/utils/functions';

type BalanceItemProps = {
  item: BalanceItemData;
};

export function BalanceItem({ item }: BalanceItemProps) {
  const { asset, decimals, available, pending, claiming, usdPrice } = item;
  const ticker = asset.slice(0, 1).toUpperCase();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInput, setModalInput] = useState('');
  const [currentAsset, setCurrentAsset] = useState<AssetType>(asset as AssetType);
  const canClaim = hasClaimableAvailable(available);

  const { setClaimedUSDT, setClaimedBTC, setClaimedETH } = useMainStore();

  const { data: claimOptions, isLoading: isLoadingClaimOptions, refetch: refetchClaimOptions } =
    useGetClaimOptions(currentAsset as AssetType);

  const claimHandler = () => {
    switch (currentAsset) {
      case 'USDT':
        setClaimedUSDT(Number(modalInput) - Number(claimOptions?.fee));
        break;
      case 'BTC':
        setClaimedBTC(Number(modalInput) - Number(claimOptions?.fee));
        break;
      case 'ETH':
        setClaimedETH(Number(modalInput) - Number(claimOptions?.fee));
        break;
    }
    setModalVisible(false);
  };

  useEffect(() => {
    refetchClaimOptions();
  }, [modalVisible]);

  const renderModalContent = () => {
    return (
      <>
        <Text style={styles.modalTitle}>{asset}</Text>
        <Text style={styles.modalDescription}>{`Min amount: ${claimOptions?.minAmount}`}</Text>
        <Text style={styles.modalDescription}>{`Fee: ${claimOptions?.fee}`}</Text>
        <Text style={styles.modalDescription}>Destinations:</Text>
        <Text style={styles.modalDescription}>
          {claimOptions?.destinations.map((destination) => destination.label).join(', ')}
        </Text>

        <Text style={styles.modalDescription}>You will receive:</Text>
        <Text style={styles.modalDescription}>{`${Number(modalInput) - Number(claimOptions?.fee)}`}</Text>

        <TextInput
          style={styles.modalInput}
          value={modalInput}
          onChangeText={setModalInput}
          placeholder="Amount"
          keyboardType="numeric"
        />

        <View style={styles.modalButtons}>
          <Button title="Max" onPress={() => setModalInput(available)} />
          <Button title="Claim" onPress={() => claimHandler()} />
        </View>
      </>
    );
  };

  return (
    <>
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {isLoadingClaimOptions ? (
              <ActivityIndicator size="large" color="#F4F7FA" />
            ) : (
              renderModalContent()
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Pressable
        disabled={!canClaim}
        onPress={() => {
          setCurrentAsset(asset as AssetType);
          setModalVisible(true);
        }}
        style={({ pressed }) => [
          styles.row,
          !canClaim && styles.rowDisabled,
          canClaim && pressed && styles.rowPressed,
        ]}>
        <View style={styles.left}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{ticker}</Text>
          </View>
          <View style={styles.meta}>
            <View style={styles.assetRow}>
              <Text style={styles.asset}>{asset}</Text>
              {canClaim ? (
                <View style={styles.availableTag}>
                  <Text style={styles.availableTagText}>Available</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.secondary}>
              pending {formatAmount(pending, decimals)} · claiming{' '}
              {formatAmount(claiming, decimals)}
            </Text>
          </View>
        </View>

        <View style={styles.right}>
          <Text style={styles.availableAmount}>{formatAmount(available, decimals)}</Text>
          <Text style={styles.usd}>{formatUsd(available, usdPrice)}</Text>
        </View>
      </Pressable>
    </>
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
  rowPressed: {
    backgroundColor: '#151A20',
  },
  rowDisabled: {
    opacity: 0.55,
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
  assetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  asset: {
    color: '#F4F7FA',
    fontSize: 16,
    fontWeight: '600',
  },
  availableTag: {
    backgroundColor: '#1F6F5B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  availableTagText: {
    color: '#E8FFF6',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
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
  availableAmount: {
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

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  modalContent: {
    width: '100%',
    maxWidth: 390,
    padding: 16,
    gap: 12,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 16,
    backgroundColor: '#0E1216',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2A3139',
  },

  modalTitle: {
    color: '#F4F7FA',
    fontSize: 16,
    fontWeight: '600',
  },
  modalDescription: {
    color: '#8B96A3',
    fontSize: 12,
    fontWeight: '500',
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#2A3139',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#F4F7FA',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
});
