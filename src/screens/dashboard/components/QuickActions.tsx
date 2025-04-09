import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../../constants/theme';
import { QuickActionsProps } from '../types';
import { styles } from '../styles/QuickActions.styles';

const QuickActions: React.FC<QuickActionsProps> = ({
  onAddTransaction,
  onNavigateToTransactions,
  onNavigateToReports,
  onNavigateToBudget
}) => {
  return (
    <View style={styles.quickActionsContainer}>
      <TouchableOpacity
        style={styles.quickActionItem}
        onPress={onAddTransaction}
        activeOpacity={0.7}
      >
        <View style={[styles.quickActionIcon, styles.addIcon]}>
          <Ionicons name="add" size={24} color={COLORS.white} />
        </View>
        <Text style={styles.quickActionText}>Tambah</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.quickActionItem}
        onPress={onNavigateToTransactions}
        activeOpacity={0.7}
      >
        <View style={styles.quickActionIcon}>
          <Ionicons name="swap-horizontal-outline" size={24} color={COLORS.primary.main} />
        </View>
        <Text style={styles.quickActionText}>Transaksi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.quickActionItem}
        onPress={onNavigateToReports}
        activeOpacity={0.7}
      >
        <View style={styles.quickActionIcon}>
          <Ionicons name="bar-chart-outline" size={24} color={COLORS.primary.main} />
        </View>
        <Text style={styles.quickActionText}>Laporan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.quickActionItem}
        onPress={onNavigateToBudget}
        activeOpacity={0.7}
      >
        <View style={styles.quickActionIcon}>
          <Ionicons name="wallet-outline" size={24} color={COLORS.primary.main} />
        </View>
        <Text style={styles.quickActionText}>Budget</Text>
      </TouchableOpacity>
    </View>
  );
};



export default QuickActions;
