import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SummaryData } from '../types';
import { styles } from '../styles/ReportsScreen.styles';
import { COLORS } from '../../../constants/theme';
import { formatCurrency, formatResponsiveCurrency } from '../../../utils/formatters';

interface SummarySectionProps {
  summaryData: SummaryData;
  formatCurrency: (amount: number) => string;
}

/**
 * Komponen untuk menampilkan ringkasan laporan
 */
const SummarySection: React.FC<SummarySectionProps> = ({ summaryData, formatCurrency }) => {
  const { totalIncome, totalExpense, balance } = summaryData;

  // Fungsi untuk menampilkan nilai detail saat item ditekan
  const showFullAmount = (type: string, amount: number) => {
    Alert.alert(
      `Detail ${type}`,
      `Nilai sebenarnya: ${formatCurrency(amount)}`,
      [{ text: 'OK', onPress: () => {} }]
    );
  };

  return (
    <Animated.View 
      entering={FadeInDown.delay(200).springify()}
      style={styles.summaryContainer}
    >
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Pemasukan</Text>
        <TouchableOpacity 
          onPress={() => showFullAmount('Pemasukan', totalIncome)}
          activeOpacity={0.7}
        >
          <Text 
            style={[styles.summaryValue, { color: COLORS.income.main }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {formatResponsiveCurrency(totalIncome, true, 1000000)}
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Pengeluaran</Text>
        <TouchableOpacity 
          onPress={() => showFullAmount('Pengeluaran', totalExpense)}
          activeOpacity={0.7}
        >
          <Text 
            style={[styles.summaryValue, { color: COLORS.expense.main }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {formatResponsiveCurrency(totalExpense, true, 1000000)}
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Saldo</Text>
        <TouchableOpacity 
          onPress={() => showFullAmount('Saldo', balance)}
          activeOpacity={0.7}
        >
          <Text 
            style={[
              styles.summaryValue, 
              { color: balance >= 0 ? COLORS.income.main : COLORS.expense.main }
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {formatResponsiveCurrency(balance, true, 1000000)}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default SummarySection;
