import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { COLORS } from '../../../constants/theme';
import { formatCurrency, formatResponsiveCurrency } from '../../../utils/formatters';
import Card from '../../../components/common/Card';
import { BalanceCardProps } from '../types';
import { styles } from '../styles/BalanceCard.styles';

const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  income,
  expense,
  isBalanceVisible,
  balanceScale,
  onToggleVisibility
}) => {
  // Animated style untuk balance
  const balanceAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: balanceScale.value }],
    };
  });

  // Fungsi untuk menampilkan nilai detail saat item ditekan
  const showFullAmount = (type: 'balance' | 'income' | 'expense', amount: number) => {
    if (!isBalanceVisible) return;
    
    const title = type === 'balance' 
      ? 'Detail Saldo' 
      : type === 'income' 
        ? 'Detail Pemasukan' 
        : 'Detail Pengeluaran';
    
    Alert.alert(
      title,
      `Nilai sebenarnya: ${formatCurrency(amount)}`,
      [{ text: 'OK', onPress: () => {} }]
    );
  };

  return (
    <Card style={styles.balanceCard}>
      <View style={styles.balanceHeader}>
        <Text style={styles.balanceLabel}>Saldo Saat Ini</Text>
        <TouchableOpacity onPress={onToggleVisibility} activeOpacity={0.7}>
          <Ionicons
            name={isBalanceVisible ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color={COLORS.neutral[500]}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={() => showFullAmount('balance', balance)}
        disabled={!isBalanceVisible}
      >
        <Animated.Text 
          style={[styles.balanceAmount, balanceAnimatedStyle]} 
          adjustsFontSizeToFit 
          numberOfLines={1}
        >
          {isBalanceVisible ? formatResponsiveCurrency(balance, false, 10000000) : '• • • • • •'}
        </Animated.Text>
      </TouchableOpacity>

      <View style={styles.incomeExpenseContainer}>
        <View style={styles.incomeContainer}>
          <View style={styles.incomeIconContainer}>
            <Ionicons name="arrow-down" size={16} color={COLORS.income.main} />
          </View>
          <View>
            <Text style={styles.incomeLabel}>Pemasukan</Text>
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={() => showFullAmount('income', income)}
              disabled={!isBalanceVisible}
            >
              <Text 
                style={styles.incomeAmount}
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                {isBalanceVisible ? formatResponsiveCurrency(income, false, 100000) : '• • • • • •'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.expenseContainer}>
          <View style={styles.expenseIconContainer}>
            <Ionicons name="arrow-up" size={16} color={COLORS.expense.main} />
          </View>
          <View>
            <Text style={styles.expenseLabel}>Pengeluaran</Text>
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={() => showFullAmount('expense', expense)}
              disabled={!isBalanceVisible}
            >
              <Text 
                style={styles.expenseAmount}
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                {isBalanceVisible ? formatResponsiveCurrency(expense, false, 100000) : '• • • • • •'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default BalanceCard;
