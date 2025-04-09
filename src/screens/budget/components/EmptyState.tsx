import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { styles } from '../styles/BudgetScreen.styles';
import { EmptyStateProps } from '../types/BudgetScreen.types';

/**
 * Komponen untuk menampilkan state kosong
 */
const EmptyState: React.FC<EmptyStateProps> = ({ onAddBudget }) => {
  return (
    <Animated.View 
      style={styles.emptyState}
      entering={FadeInDown.duration(600).springify()}
    >
      <Ionicons name="wallet-outline" size={64} color="#ccc" />
      <Text style={styles.emptyStateText}>
        Anda belum memiliki anggaran. Tambahkan anggaran untuk melacak pengeluaran Anda.
      </Text>
      <TouchableOpacity style={styles.emptyStateButton} onPress={onAddBudget}>
        <Text style={styles.emptyStateButtonText}>Tambah Anggaran</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default memo(EmptyState);
