import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

export const { width: screenWidth } = Dimensions.get('window');
export const CHART_SIZE = Math.min(screenWidth * 0.8, 300);
export const CHART_RADIUS = CHART_SIZE / 2;
export const CHART_INNER_RADIUS = CHART_RADIUS * 0.6;
export const STROKE_WIDTH = 1;

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: CHART_SIZE,
    height: CHART_SIZE / 2,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.neutral[500],
  },
  legendContainer: {
    maxHeight: 200,
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  legendColorBox: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: SPACING.sm,
  },
  legendTextContainer: {
    flex: 1,
  },
  legendName: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.neutral[800],
  },
  legendValue: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    color: COLORS.neutral[600],
  },
  legendPercentage: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.neutral[500],
  },
});

export const defaultChartConfig = {
  backgroundColor: COLORS.background,
  backgroundGradientFrom: COLORS.background,
  backgroundGradientTo: COLORS.background,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
  labelColor: (opacity = 1) => COLORS.neutral[800],
  style: {
    borderRadius: 16,
  },
};
