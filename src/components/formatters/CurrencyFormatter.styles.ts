import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

export const getTextStyle = (amount: number) => ({
  color: amount >= 0 ? COLORS.success[600] : COLORS.danger[600],
  fontFamily: 'Inter-SemiBold',
});

export const styles = StyleSheet.create({
  
});
