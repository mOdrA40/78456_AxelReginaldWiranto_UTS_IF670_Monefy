import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/AddBudgetScreen.styles';
import { TypeButtonProps } from '../types/AddBudgetScreen.types';

/**
 * Komponen untuk tombol pemilihan tipe kategori
 */
const TypeButton: React.FC<TypeButtonProps> = ({ type, isSelected, onPress }) => {
  const getTypeLabel = (type: 'income' | 'expense'): string => {
    return type === 'income' ? 'Pemasukan' : 'Pengeluaran';
  };

  return (
    <TouchableOpacity
      style={[
        styles.typeButton,
        isSelected && styles.typeButtonActive
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.typeButtonText,
          isSelected && styles.typeButtonTextActive
        ]}
      >
        {getTypeLabel(type)}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(TypeButton);
