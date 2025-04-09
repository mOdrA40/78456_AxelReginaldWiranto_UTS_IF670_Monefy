import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  filterContainer: {
    marginBottom: SPACING.md,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  filterLabel: {
    ...TYPOGRAPHY.subtitle2,
    color: COLORS.text,
  },
  periodFilterContainer: {
    marginBottom: SPACING.md,
  },
  periodFilterScroll: {
    paddingVertical: SPACING.xs,
  },
  periodFilterButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
    marginRight: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activePeriodFilterButton: {
    backgroundColor: COLORS.primary.main,
    borderColor: COLORS.primary.main,
  },
  periodFilterText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textSecondary,
  },
  activePeriodFilterText: {
    color: COLORS.white,
  },
  typeFilterContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  typeFilterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  typeFilterButtonLeft: {
    borderTopLeftRadius: SPACING.xs,
    borderBottomLeftRadius: SPACING.xs,
    borderRightWidth: 0,
  },
  typeFilterButtonMiddle: {
    borderRightWidth: 0,
  },
  typeFilterButtonRight: {
    borderTopRightRadius: SPACING.xs,
    borderBottomRightRadius: SPACING.xs,
  },
  activeTypeFilterButton: {
    backgroundColor: COLORS.primary.main,
    borderColor: COLORS.primary.main,
  },
  typeFilterText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  activeTypeFilterText: {
    color: COLORS.white,
  },
  overviewCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SPACING.sm,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  overviewTitle: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  overviewLabel: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
  },
  overviewValue: {
    ...TYPOGRAPHY.subtitle2,
    color: COLORS.text,
  },
  incomeValue: {
    color: COLORS.income.main,
  },
  expenseValue: {
    color: COLORS.expense.main,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  chartContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: SPACING.sm,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  chartTitle: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  pieChartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  legendContainer: {
    marginTop: SPACING.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: SPACING.xs,
  },
  legendText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text,
    flex: 1,
  },
  legendValue: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
  },
  legendPercentage: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyIcon: {
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  emptyText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  emptyButton: {
    backgroundColor: COLORS.primary.main,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: SPACING.xs,
  },
  emptyButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryAnalyticsContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: SPACING.sm,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  categoryAnalyticsTitle: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    ...TYPOGRAPHY.subtitle2,
    color: COLORS.text,
  },
  categoryCount: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  categoryAmount: {
    ...TYPOGRAPHY.subtitle2,
    color: COLORS.text,
  },
});
