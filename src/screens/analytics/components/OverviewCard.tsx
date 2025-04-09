import React, { memo } from 'react';
import { View, Text } from 'react-native';
import Card from '../../../components/common/Card';
import { OverviewCardProps } from '../types';
import { analyticsStyles as styles } from '../styles';
import { formatCurrency } from '../../../utils/formatters';

const OverviewCard: React.FC<OverviewCardProps> = ({ totals }) => {
  return (
    <Card style={styles.overviewCard}>
      <Text style={styles.overviewTitle}>Ringkasan Keuangan</Text>

      <View style={styles.overviewRow}>
        <Text style={styles.overviewLabel}>Pemasukan</Text>
        <Text style={[styles.overviewValue, styles.incomeValue]}>
          {formatCurrency(totals.income)}
        </Text>
      </View>

      <View style={styles.overviewRow}>
        <Text style={styles.overviewLabel}>Pengeluaran</Text>
        <Text style={[styles.overviewValue, styles.expenseValue]}>
          {formatCurrency(totals.expense)}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.overviewRow}>
        <Text style={styles.overviewLabel}>Saldo</Text>
        <Text style={[
          styles.overviewValue,
          totals.balance >= 0 ? styles.incomeValue : styles.expenseValue
        ]}>
          {formatCurrency(totals.balance)}
        </Text>
      </View>
    </Card>
  );
};

export default memo(OverviewCard);
