import { StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { CardVariant } from './Card.types';

export const createCardStyles = (variant: CardVariant = 'elevated') => {
  switch (variant) {
    case 'outlined':
      return {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.neutral[200],
        ...SHADOWS.none,
      };
    case 'filled':
      return {
        backgroundColor: COLORS.neutral[100],
        borderWidth: 0,
        ...SHADOWS.none,
      };
    case 'elevated':
    default:
      return {
        backgroundColor: COLORS.white,
        borderWidth: 0,
        ...SHADOWS.sm,
      };
  }
};

export const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  content: {
    padding: SPACING.md,
  },
});
