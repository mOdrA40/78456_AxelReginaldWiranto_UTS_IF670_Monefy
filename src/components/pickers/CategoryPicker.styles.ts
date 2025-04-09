import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  scrollContent: {
    paddingRight: SPACING.md,
  },
  categoryButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary.main,
  },
  categoryButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.text,
  },
  categoryButtonTextActive: {
    color: COLORS.primary.contrast,
  },
});
