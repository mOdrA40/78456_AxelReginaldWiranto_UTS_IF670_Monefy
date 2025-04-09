import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    ...TYPOGRAPHY.shadow,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export const defaultChartConfig = {
  backgroundColor: COLORS.background,
  backgroundGradientFrom: COLORS.background,
  backgroundGradientTo: COLORS.background,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
  labelColor: (opacity = 1) => COLORS.text,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: COLORS.primary.main,
  },
  propsForLabels: {
    fontSize: 12,
  },
};
