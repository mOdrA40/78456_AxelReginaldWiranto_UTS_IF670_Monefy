import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '../../../constants/theme';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: isTablet ? SPACING.xl : SPACING.md,
    paddingBottom: SPACING.xl * 2, // Extra padding for FAB
    maxWidth: isTablet ? 700 : undefined,
    alignSelf: isTablet ? 'center' : undefined,
    width: isTablet ? '100%' : undefined,
  },
  addTransactionButton: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.xl,
    width: isTablet ? 70 : 60,
    height: isTablet ? 70 : 60,
    borderRadius: isTablet ? 35 : 30,
    backgroundColor: COLORS.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.lg,
  },
  // Loading state
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  loadingText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.neutral[600],
    marginTop: SPACING.md,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
  },
  // Error state
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  errorText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.neutral[700],
    textAlign: 'center',
    marginBottom: SPACING.md,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
  },
  retryButton: {
    paddingVertical: isTablet ? SPACING.md : SPACING.sm,
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    backgroundColor: COLORS.primary.main,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.sm,
  },
  retryButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
  },
  // Tips card
  tipsCard: {
    marginBottom: SPACING.md,
  },
  tipsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  tipsTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.neutral[800],
    fontSize: isTablet ? TYPOGRAPHY.fontSize.xl : TYPOGRAPHY.fontSize.lg,
  },
  tipsContent: {
    ...TYPOGRAPHY.body2,
    color: COLORS.neutral[700],
    marginBottom: SPACING.sm,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
  },
  tipsButton: {
    alignSelf: 'flex-start',
    paddingVertical: isTablet ? SPACING.sm : SPACING.xs,
    paddingHorizontal: isTablet ? SPACING.md : SPACING.sm,
    backgroundColor: COLORS.primary.light,
    borderRadius: BORDER_RADIUS.sm,
  },
  tipsButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary.dark,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.sm : TYPOGRAPHY.fontSize.xs,
  },
  // Goals section
  goalsCard: {
    marginBottom: SPACING.md,
  },
  goalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  goalsTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.neutral[800],
    fontSize: isTablet ? TYPOGRAPHY.fontSize.xl : TYPOGRAPHY.fontSize.lg,
  },
  viewAllText: {
    ...TYPOGRAPHY.button,
    color: COLORS.primary.main,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
  },
  goalItem: {
    marginBottom: SPACING.sm,
  },
  goalItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalIconContainer: {
    width: isTablet ? 50 : 40,
    height: isTablet ? 50 : 40,
    borderRadius: isTablet ? 25 : 20,
    backgroundColor: `${COLORS.primary.main}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  goalDetails: {
    flex: 1,
  },
  goalName: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.neutral[800],
    marginBottom: 2,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
  },
  goalProgress: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[600],
    fontSize: isTablet ? TYPOGRAPHY.fontSize.sm : TYPOGRAPHY.fontSize.xs,
  },
  goalAmount: {
    ...TYPOGRAPHY.subtitle2,
    color: COLORS.primary.main,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
  },
  progressBarContainer: {
    height: isTablet ? 6 : 4,
    backgroundColor: COLORS.neutral[200],
    borderRadius: isTablet ? 3 : 2,
    marginTop: SPACING.xs,
    width: '100%',
  },
  progressBar: {
    height: '100%',
    borderRadius: isTablet ? 3 : 2,
    backgroundColor: COLORS.primary.main,
  },
  // Styles untuk transaction item
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: isTablet ? SPACING.md : SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral[200],
  },
  transactionIconContainer: {
    marginRight: isTablet ? SPACING.md : SPACING.sm,
  },
  transactionIcon: {
    width: isTablet ? 40 : 32,
    height: isTablet ? 40 : 32,
    borderRadius: isTablet ? 20 : 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionCategory: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.neutral[800],
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
  },
  transactionDate: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[500],
    fontSize: isTablet ? TYPOGRAPHY.fontSize.sm : TYPOGRAPHY.fontSize.xs,
  },
  transactionAmount: {
    ...TYPOGRAPHY.subtitle2,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
  },
});
