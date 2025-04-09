import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

import { COLORS } from '../../../constants/theme';
import { formatCurrency, formatCompactCurrency } from '../../../utils/formatters';
import { Transaction } from '../../../types';
import Card from '../../../components/common/Card';
import { RecentTransactionsProps } from '../types';
import { styles } from '../styles/RecentTransactions.styles';

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  onViewAllTransactions,
  onTransactionPress
}) => {
  // Render item transaksi
  const renderTransactionItem = (transaction: Transaction, index: number) => {
    const isIncome = transaction.type === 'income';

    // Handler untuk klik transaksi dengan timeout kecil untuk menghindari race condition
    const handleTransactionPress = () => {
      // Gunakan timeout kecil untuk memastikan UI selesai dirender
      // sebelum navigasi terjadi, menghindari race condition
      setTimeout(() => {
        onTransactionPress?.(transaction.id);
      }, 100);
    };

    return (
      <Animated.View
        key={transaction.id}
        entering={FadeIn.delay(index * 100)}
        style={styles.transactionItem}
      >
        <TouchableOpacity
          style={styles.transactionItemContent}
          onPress={handleTransactionPress}
          activeOpacity={0.7}
        >
          <View style={styles.transactionIconContainer}>
            <View style={[
              styles.transactionIcon,
              { backgroundColor: isIncome ? COLORS.income.main : COLORS.expense.main }
            ]}>
              <Ionicons
                name={isIncome ? 'arrow-down' : 'arrow-up'}
                size={16}
                color="white"
              />
            </View>
          </View>

          <View style={styles.transactionDetails}>
            <Text style={styles.transactionCategory}>
              {transaction.category}
            </Text>
            <Text style={styles.transactionDate}>
              {new Date(transaction.date).toLocaleDateString('id-ID')}
            </Text>
          </View>

          <Text 
            style={[
              styles.transactionAmount,
              { color: isIncome ? COLORS.income.main : COLORS.expense.main }
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {isIncome ? '+' : '-'} {formatCompactCurrency(transaction.amount)}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Card style={styles.recentTransactionsCard}>
      <View style={styles.recentTransactionsHeader}>
        <Text style={styles.recentTransactionsTitle}>Transaksi Terbaru</Text>
        <TouchableOpacity onPress={onViewAllTransactions} activeOpacity={0.7}>
          <Text style={styles.viewAllText}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>

      {transactions.length > 0 ? (
        <View style={styles.transactionsList}>
          {transactions.map(renderTransactionItem)}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Belum ada transaksi</Text>
        </View>
      )}
    </Card>
  );
};

export default RecentTransactions;
