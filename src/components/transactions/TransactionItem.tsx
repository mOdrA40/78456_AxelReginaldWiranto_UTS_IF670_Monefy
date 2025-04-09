import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Constants and Types
import { COLORS } from '../../constants/theme';

// Utils
import { formatCurrency, formatShortDate } from '../../utils/formatters';

// Local imports
import { TransactionItemProps } from './TransactionItem.types';
import { styles } from './TransactionItem.styles';

/**
 * Komponen untuk menampilkan item transaksi dalam daftar
 */
const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onPress }) => {
  const { id, amount, category, type, date, description } = transaction;

  // Cari kategori untuk mendapatkan warna (fallback ke default color jika tidak ditemukan)
  const categoryColor = type === 'income' ? COLORS.income.main : COLORS.expense.main;

  // Format tanggal - menggunakan ternary operator untuk lebih ringkas
  const formattedDate = date instanceof Date
    ? formatShortDate(date)
    : formatShortDate(typeof date === 'string' ? new Date(date) : new Date());

  // Handle press - menggunakan useCallback untuk optimasi
  const handlePress = useCallback(() => {
    if (onPress) {
      onPress(id);
    }
  }, [id, onPress]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* Left side - Category icon/color */}
      <View
        style={[
          styles.categoryIndicator,
          { backgroundColor: categoryColor + '20' } // Opacity untuk background
        ]}
      >
        <View style={[styles.categoryDot, { backgroundColor: categoryColor }]} />
      </View>

      {/* Middle - Category name and description */}
      <View style={styles.detailsContainer}>
        <Text style={styles.categoryName}>{category}</Text>

        {description ? (
          <Text style={styles.description} numberOfLines={1}>
            {description}
          </Text>
        ) : null}

        <Text style={styles.date}>{formattedDate}</Text>
      </View>

      {/* Right side - Amount */}
      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amount,
            { color: type === 'income' ? COLORS.income.main : COLORS.expense.main }
          ]}
        >
          {type === 'income' ? '+ ' : '- '}
          {formatCurrency(Math.abs(amount))}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Menggunakan memo untuk mencegah re-render yang tidak perlu
export default memo(TransactionItem);