import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
    padding: SPACING.md,
  },
  section: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
  },
  typeButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
    marginHorizontal: SPACING.xs,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  typeButtonActive: {
    backgroundColor: COLORS.primary.main,
  },
  typeButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.text,
  },
  typeButtonTextActive: {
    color: COLORS.white,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateButton: {
    flex: 1,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.xs,
    alignItems: 'center',
  },
  dateButtonText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text,
  },
  sortContainer: {
    marginBottom: SPACING.md,
  },
  sortByContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
    marginBottom: SPACING.sm,
  },
  sortByButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
    marginHorizontal: SPACING.xs,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  sortByButtonActive: {
    backgroundColor: COLORS.primary.main,
  },
  sortByButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.text,
  },
  sortByButtonTextActive: {
    color: COLORS.white,
  },
  sortButton: {
    flex: 1,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },
  sortButtonActive: {
    backgroundColor: COLORS.primary.main,
  },
  sortButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.text,
  },
  sortButtonTextActive: {
    color: COLORS.primary.contrast,
  },
  searchButton: {
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
  },
  searchButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textSecondary,
  },
  orderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
  },
  orderButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
    marginHorizontal: SPACING.xs,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  orderButtonActive: {
    backgroundColor: COLORS.primary.main,
  },
  orderButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.text,
  },
  orderButtonTextActive: {
    color: COLORS.white,
  },
  actionContainer: {
    flexDirection: 'row',
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  resetButton: {
    flex: 1,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    marginRight: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.text,
  },
  applyButton: {
    flex: 1,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
  },
});
