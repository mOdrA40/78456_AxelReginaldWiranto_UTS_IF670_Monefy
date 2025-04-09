import { StyleSheet, StatusBar, Platform } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../../constants/theme';

// Menghitung padding untuk menghindari status bar
const STATUSBAR_HEIGHT = StatusBar.currentHeight || (Platform.OS === 'ios' ? 44 : 0);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    paddingTop: SPACING.md + STATUSBAR_HEIGHT,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    marginLeft: SPACING.sm,
    fontSize: 18,
    paddingRight: SPACING.md,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  formContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    ...SHADOWS.sm,
    marginBottom: SPACING.xl,
  },
  formTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.subtitle2,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  typeSelector: {
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: SPACING.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeButtonActive: {
    backgroundColor: COLORS.primary.main,
    borderColor: COLORS.primary.main,
  },
  typeButtonText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text,
  },
  typeButtonTextActive: {
    color: COLORS.surface,
  },
  colorSelector: {
    marginTop: SPACING.lg,
  },
  colorButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorButtonActive: {
    borderColor: COLORS.white,
    borderWidth: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  footer: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.danger[500],
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: SPACING.xs,
  },
  deleteButtonText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.danger[500],
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
  },
  currencyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.neutral[300],
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    height: 50,
  },
  currencySymbol: {
    ...TYPOGRAPHY.body1,
    color: COLORS.neutral[700],
    marginRight: SPACING.xs,
  },
  currencyInput: {
    flex: 1,
    ...TYPOGRAPHY.body1,
    color: COLORS.text,
    padding: 0,
    height: '100%',
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.danger[500],
    marginTop: SPACING.xs,
  },
  budgetSummary: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral[200],
    marginBottom: SPACING.md,
  },
  budgetSummaryLabel: {
    ...TYPOGRAPHY.subtitle2,
    color: COLORS.neutral[700],
    marginBottom: SPACING.xs,
  },
  budgetSummaryValue: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  budgetSummaryHint: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[500],
    fontStyle: 'italic',
  },
});
