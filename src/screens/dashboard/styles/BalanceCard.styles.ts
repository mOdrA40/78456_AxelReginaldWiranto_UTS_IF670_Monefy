import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../../constants/theme';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export const styles = StyleSheet.create({
  balanceCard: {
    marginBottom: SPACING.md,
    width: isTablet ? '90%' : '100%',
    maxWidth: isTablet ? 650 : undefined,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  balanceLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
    color: COLORS.neutral[500],
  },
  balanceAmount: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: isTablet ? (TYPOGRAPHY.fontSize.xxxl + 8) : TYPOGRAPHY.fontSize.xxxl,
    color: COLORS.neutral[800],
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
  },
  incomeExpenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  incomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  incomeIconContainer: {
    width: isTablet ? 40 : 32,
    height: isTablet ? 40 : 32,
    borderRadius: isTablet ? 20 : 16,
    backgroundColor: `${COLORS.income.main}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: isTablet ? SPACING.sm : SPACING.xs,
  },
  incomeLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.sm : TYPOGRAPHY.fontSize.xs,
    color: COLORS.neutral[500],
  },
  incomeAmount: {
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
    color: COLORS.income.main,
  },
  expenseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expenseIconContainer: {
    width: isTablet ? 40 : 32,
    height: isTablet ? 40 : 32,
    borderRadius: isTablet ? 20 : 16,
    backgroundColor: `${COLORS.expense.main}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: isTablet ? SPACING.sm : SPACING.xs,
  },
  expenseLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.sm : TYPOGRAPHY.fontSize.xs,
    color: COLORS.neutral[500],
  },
  expenseAmount: {
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
    color: COLORS.expense.main,
  },
});
