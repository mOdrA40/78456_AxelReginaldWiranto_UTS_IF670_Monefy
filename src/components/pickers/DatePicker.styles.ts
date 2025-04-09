import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.subtitle2,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
  },
  dateText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text,
  },
  errorBorder: {
    borderColor: COLORS.danger[500],
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.danger[600],
    marginTop: SPACING.xs,
  },
});
