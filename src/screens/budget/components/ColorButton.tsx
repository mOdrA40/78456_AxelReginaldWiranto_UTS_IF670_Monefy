import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from '../styles/AddBudgetScreen.styles';
import { ColorButtonProps } from '../types/AddBudgetScreen.types';

/**
 * Komponen untuk tombol pemilihan warna
 */
const ColorButton: React.FC<ColorButtonProps> = ({ color, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.colorButton,
        { backgroundColor: color },
        isSelected && styles.colorButtonActive
      ]}
      onPress={onPress}
    />
  );
};

export default memo(ColorButton);
