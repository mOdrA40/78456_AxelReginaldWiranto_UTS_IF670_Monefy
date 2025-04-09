import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../../constants/theme';

// Get screen dimensions for responsive design
const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: isTablet ? SPACING.xl : SPACING.lg,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.xxxl : TYPOGRAPHY.fontSize.xl,
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    paddingVertical: isTablet ? SPACING.lg : SPACING.md,
    marginRight: isTablet ? SPACING.xl : SPACING.lg,
  },
  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: isTablet ? SPACING.md : SPACING.sm,
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    marginRight: isTablet ? SPACING.lg : SPACING.md,
    backgroundColor: COLORS.surface,
    ...SHADOWS.xs,
    minWidth: isTablet ? 120 : 100,
  },
  activePeriodButton: {
    backgroundColor: COLORS.primary.main,
  },
  buttonIcon: {
    marginRight: isTablet ? SPACING.sm : SPACING.xs,
  },
  periodButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textSecondary,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
  },
  activePeriodText: {
    color: COLORS.white,
  },
  reportTypeSelector: {
    flexDirection: 'row',
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    paddingVertical: isTablet ? SPACING.md : SPACING.sm,
    marginRight: isTablet ? SPACING.xl : SPACING.lg,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: isTablet ? SPACING.md : SPACING.sm,
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    marginRight: isTablet ? SPACING.lg : SPACING.md,
    backgroundColor: COLORS.surface,
    ...SHADOWS.xs,
    minWidth: isTablet ? 130 : 110,
  },
  activeTypeButton: {
    backgroundColor: COLORS.primary.main,
  },
  typeButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textSecondary,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
  },
  activeTypeText: {
    color: COLORS.white,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    marginTop: isTablet ? SPACING.lg : SPACING.md,
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: isTablet ? SPACING.lg : SPACING.md,
    marginHorizontal: isTablet ? SPACING.sm : SPACING.xs,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  summaryLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: isTablet ? SPACING.sm : SPACING.xs,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.sm : TYPOGRAPHY.fontSize.xs,
  },
  summaryValue: {
    ...TYPOGRAPHY.subtitle1,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
  },
  chartContainer: {
    margin: isTablet ? SPACING.xl : SPACING.lg,
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
    padding: isTablet ? SPACING.lg : SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
  },
  chartTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartIcon: {
    marginRight: isTablet ? SPACING.sm : SPACING.xs,
    transform: [{ scale: isTablet ? 1.2 : 1 }],
  },
  chartTitle: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.text,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
  },
  chartContent: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  chart: {
    marginVertical: isTablet ? SPACING.sm : SPACING.xs,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 2,
    height: isTablet ? 280 : 220,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: isTablet ? SPACING.xxl : SPACING.xl,
  },
  loadingText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    marginTop: isTablet ? SPACING.lg : SPACING.md,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
  },
  errorText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.danger[600],
    marginTop: isTablet ? SPACING.lg : SPACING.md,
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
  },
  emptyText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textSecondary,
    marginTop: isTablet ? SPACING.lg : SPACING.md,
    textAlign: 'center',
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
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
  },
  emptyChartContainer: {
    height: isTablet ? 270 : 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyChart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyChartText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    marginTop: isTablet ? SPACING.lg : SPACING.md,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
  },
  selectionContainer: {
    padding: isTablet ? SPACING.lg : SPACING.md,
    paddingBottom: 0,
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  selectorLabel: {
    ...TYPOGRAPHY.subtitle2,
    color: COLORS.text,
    marginBottom: isTablet ? SPACING.sm : SPACING.xs,
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
  },
  selectorContainer: {
    flex: 1,
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
    minWidth: isTablet ? '48%' : '48%',
  },
  selectorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  scrollIndicator: {
    position: 'absolute',
    right: 0,
    backgroundColor: COLORS.surface + 'DD',
    paddingHorizontal: isTablet ? SPACING.sm : SPACING.xs,
    borderTopLeftRadius: BORDER_RADIUS.md,
    borderBottomLeftRadius: BORDER_RADIUS.md,
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.text,
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: isTablet ? SPACING.xxl : SPACING.xl,
    maxWidth: isTablet ? 700 : undefined,
    alignSelf: isTablet ? 'center' : undefined,
    width: isTablet ? '100%' : undefined,
  },
});
