import React, { memo, useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Svg, { G, Circle, Path, Text as SvgText } from 'react-native-svg';
import { PieChart as RPieChart } from 'react-native-chart-kit';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

import { PieChartProps, ChartKitItem } from './PieChart.types';
import { calculateTotal, calculateAngles, createArc } from './PieChart.utils';
import {
  styles,
  defaultChartConfig,
  CHART_SIZE,
  CHART_RADIUS,
  CHART_INNER_RADIUS,
  STROKE_WIDTH
} from './PieChart.styles';

const PieChart: React.FC<PieChartProps> = ({
  data,
  centerLabel = 'Total',
  centerValue,
  animated = true,
  showLabels = false,
  showLegend = true,
  currency = 'IDR',
  onItemPress,
  useReactNativeChartKit = false,
}) => {
  const { isEmpty, total, items, chartKitData } = useMemo(() => {
    if (!data || data.length === 0) {
      return { isEmpty: true, total: 0, items: [], chartKitData: [] };
    }

    const total = calculateTotal(data);
    const items = calculateAngles(data, total);

    const chartKitData: ChartKitItem[] = data.map((item) => ({
      name: item.name,
      population: item.value,
      color: item.color,
      legendFontColor: COLORS.text,
      legendFontSize: 12,
    }));

    return { isEmpty: false, total, items, chartKitData };
  }, [data]);

  if (isEmpty) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Tidak ada data</Text>
      </View>
    );
  }

  if (useReactNativeChartKit) {
    return (
      <RPieChart
        data={chartKitData}
        width={CHART_SIZE}
        height={CHART_SIZE}
        chartConfig={defaultChartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute={true}
        hasLegend={showLegend}
      />
    );
  }

  const renderLegend = useMemo(() => {
    return (
      <ScrollView style={styles.legendContainer}>
        {items.map((item, index) => (
          <View key={item.id || index} style={styles.legendItem}>
            <View
              style={[
                styles.legendColorBox,
                { backgroundColor: item.color }
              ]}
            />
            <View style={styles.legendTextContainer}>
              <Text style={styles.legendName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.legendValue}>
                {formatCurrency(item.value)}
                <Text style={styles.legendPercentage}>
                  ({formatPercentage(item.percentage)})
                </Text>
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }, [items]);

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Svg width={CHART_SIZE} height={CHART_SIZE} viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}>
          <G>
            {/* Background circle (optional) */}
            <Circle
              cx={CHART_RADIUS}
              cy={CHART_RADIUS}
              r={CHART_RADIUS - STROKE_WIDTH / 2}
              fill="transparent"
              stroke={COLORS.neutral[200]}
              strokeWidth={STROKE_WIDTH}
            />

            {/* Inner circle for donut chart */}
            <Circle
              cx={CHART_RADIUS}
              cy={CHART_RADIUS}
              r={CHART_INNER_RADIUS}
              fill="white"
            />

            {/* Chart slices */}
            {items.map((item, index) => (
              <Path
                key={item.id || index}
                d={createArc(item.startAngle, item.endAngle, CHART_RADIUS - STROKE_WIDTH, CHART_RADIUS)}
                fill={item.color}
                stroke="white"
                strokeWidth={STROKE_WIDTH}
                onPress={() => onItemPress && onItemPress(item)}
              />
            ))}

            {/* Center text */}
            {centerLabel && (
              <SvgText
                x={CHART_RADIUS}
                y={CHART_RADIUS - 10}
                fontSize={12}
                fontFamily={TYPOGRAPHY.fontFamily.medium}
                fill={COLORS.neutral[600]}
                textAnchor="middle"
              >
                {centerLabel}
              </SvgText>
            )}

            {centerValue !== undefined && (
              <SvgText
                x={CHART_RADIUS}
                y={CHART_RADIUS + 15}
                fontSize={16}
                fontFamily={TYPOGRAPHY.fontFamily.semiBold}
                fill={COLORS.neutral[800]}
                textAnchor="middle"
              >
                {typeof centerValue === 'number'
                  ? formatCurrency(centerValue)
                  : centerValue
                }
              </SvgText>
            )}
          </G>
        </Svg>
      </View>

      {showLegend && renderLegend}
    </View>
  );
};

export default memo(PieChart);