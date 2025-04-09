import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TransactionItemProps } from '../types';
import { styles } from '../styles/TransactionsScreen.styles';
import { COLORS } from '../../../constants/theme';
import { formatCurrency, formatResponsiveCurrency } from '../../../utils/formatters';

/**
 * Komponen untuk menampilkan item transaksi
 */
const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onPress }) => {
  // Fungsi untuk menampilkan nilai detail saat item ditekan
  const showFullAmount = (amount: number, event: any) => {
    // Mencegah event propagasi agar tidak trigger onPress parent
    event.stopPropagation();
    
    Alert.alert(
      'Detail Transaksi',
      `Nilai sebenarnya: ${formatCurrency(amount)}`,
      [{ text: 'OK', onPress: () => {} }]
    );
  };

  return (
    <TouchableOpacity
      style={styles.transactionItem}
      onPress={() => onPress(transaction)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.categoryIcon,
          {
            backgroundColor:
              transaction.type === 'income'
                ? COLORS.success[600] + '20'
                : COLORS.danger[600] + '20',
          },
        ]}
      >
        <Ionicons
          name={
            transaction.type === 'income'
              ? 'arrow-down-circle'
              : 'arrow-up-circle'
          }
          size={20}
          color={
            transaction.type === 'income'
              ? COLORS.success[600]
              : COLORS.danger[600]
          }
        />
      </View>
      
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDescription}>
          {transaction.description || ''}
        </Text>
        <Text style={styles.transactionCategory}>
          {transaction.category}
        </Text>
      </View>
      
      <TouchableOpacity
        style={styles.transactionAmountContainer}
        onPress={(event) => showFullAmount(transaction.amount, event)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.transactionAmount,
            {
              color:
                transaction.type === 'income'
                  ? COLORS.success[600]
                  : COLORS.danger[600],
            },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {transaction.type === 'income' ? '+' : '-'}{' '}
          {formatResponsiveCurrency(transaction.amount, false, 100000)}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TransactionItem;
