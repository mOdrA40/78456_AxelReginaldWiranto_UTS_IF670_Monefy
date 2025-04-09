import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/ReportsScreen.styles';
import { COLORS } from '../../../constants/theme';

/**
 * Komponen untuk menampilkan state kosong
 */
const EmptyState: React.FC = () => {
  return (
    <View style={styles.centered}>
      <Ionicons name="bar-chart-outline" size={64} color={COLORS.textSecondary} />
      <Text style={styles.emptyText}>
        Belum ada data transaksi untuk ditampilkan
      </Text>
    </View>
  );
};

export default EmptyState;
