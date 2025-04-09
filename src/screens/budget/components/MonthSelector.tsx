import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/BudgetScreen.styles';
import { MonthSelectorProps } from '../types/BudgetScreen.types';
import { getMonthName, getPreviousMonth, getNextMonth } from '../utils/BudgetScreen.utils';

/**
 * Komponen untuk memilih bulan
 */
const MonthSelector: React.FC<MonthSelectorProps> = ({ selectedMonth, onMonthChange }) => {
  const handlePreviousMonth = () => {
    onMonthChange(getPreviousMonth(selectedMonth));
  };

  const handleNextMonth = () => {
    onMonthChange(getNextMonth(selectedMonth));
  };

  return (
    <View style={styles.monthSelector}>
      <TouchableOpacity
        style={styles.monthButton}
        onPress={handlePreviousMonth}
      >
        <Ionicons name="chevron-back" size={24} color="#666" />
      </TouchableOpacity>
      
      <Text style={styles.monthText}>{getMonthName(selectedMonth)}</Text>
      
      <TouchableOpacity
        style={styles.monthButton}
        onPress={handleNextMonth}
      >
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

export default memo(MonthSelector);
