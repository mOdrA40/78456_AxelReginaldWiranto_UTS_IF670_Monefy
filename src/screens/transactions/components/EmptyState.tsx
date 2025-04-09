import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EmptyStateProps } from '../types';
import { styles } from '../styles/TransactionsScreen.styles';
import { COLORS } from '../../../constants/theme';
import { SPACING } from '../../../constants/theme';

/**
 * Komponen untuk menampilkan state kosong
 */
const EmptyState: React.FC<EmptyStateProps> = ({ searchQuery, onAddTransaction, onRefresh }) => {
  return (
    <View style={styles.centered}>
      <Ionicons name="document-text-outline" size={64} color={COLORS.textSecondary} />
      <Text style={styles.emptyText}>
        {searchQuery
          ? 'Tidak ada transaksi ditemukan'
          : 'Belum ada transaksi'}
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={onAddTransaction}
      >
        <Text style={styles.addButtonText}>Tambah Transaksi</Text>
      </TouchableOpacity>
      
      {!searchQuery && (
        <TouchableOpacity
          style={[styles.refreshButton, { marginTop: SPACING.md }]}
          onPress={onRefresh}
        >
          <Ionicons name="refresh" size={18} color={COLORS.primary.main} style={{ marginRight: 8 }} />
          <Text style={styles.refreshButtonText}>Muat Ulang Data</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyState;
