import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { BudgetCategoryCardProps } from '../types/BudgetScreen.types';
import { styles } from '../styles/BudgetScreen.styles';
import { COLORS } from '../../../constants/theme';
import { formatCompactCurrency } from '../../../utils/formatters';

// Definisikan fungsi di luar komponen agar tersedia secara global
export const determineProgressColor = (percentage: number): string => {
  if (percentage >= 100) return COLORS.danger[500];
  if (percentage >= 75) return COLORS.warning[500];
  return COLORS.success[500];
};

// Ekspor juga dengan nama lama untuk backward compatibility
export const getProgressColor = determineProgressColor;

/**
 * Komponen untuk menampilkan kartu kategori anggaran
 */
const BudgetCategoryCard: React.FC<BudgetCategoryCardProps> = ({ category, onPress }) => {
  // Menentukan warna teks persentase berdasarkan persentase
  const getPercentageTextColor = (percentage: number): string => {
    if (percentage >= 100) return COLORS.danger[500];
    if (percentage >= 75) return COLORS.warning[700];
    return COLORS.success[700];
  };

  // Hitung warna progress di luar animated style
  const progressColor = determineProgressColor(category.percentage);
  
  // Animasi untuk progress bar
  const progressBarStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      height: 22,
      width: `${Math.min(100, category.percentage)}%`,
      backgroundColor: progressColor,
      borderRadius: 11,
      transform: [{ translateX: 0 }],
    };
  });

  const handlePress = () => {
    onPress(category.id);
  };

  // Format angka budget dengan format kompak
  const formattedSpent = formatCompactCurrency(category.spent, true);
  const formattedBudget = formatCompactCurrency(category.budget || 0, true);

  return (
    <TouchableOpacity style={styles.categoryCard} onPress={handlePress}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryName}>{category.name}</Text>
        <Text style={styles.categoryAmount}>
          {formattedSpent} / {formattedBudget}
        </Text>
      </View>

      <View style={styles.categoryProgress}>
        <View style={styles.categoryProgressBarBackground} />
        <Animated.View style={progressBarStyle} />

        <View style={styles.percentageContainer}>
          <Text
            style={[
              styles.categoryPercentage,
              { color: getPercentageTextColor(category.percentage) }
            ]}
          >
            {Math.round(category.percentage)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(BudgetCategoryCard);
