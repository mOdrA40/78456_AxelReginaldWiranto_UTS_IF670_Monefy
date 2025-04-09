import React, { memo, useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

import { COLORS } from '../../constants/theme';
import { ChartProps, LineChartData, PieChartData } from './Chart.types';
import { styles, defaultChartConfig } from './Chart.styles';

const Chart: React.FC<ChartProps> = ({
  type,
  data,
  width = Dimensions.get('window').width - 32,
  height = 220,
  chartConfig = defaultChartConfig,
}) => {
 
  const lineChartData = useMemo<LineChartData>(() => ({
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
      },
    ],
  }), [data]);

  const pieChartData = useMemo<PieChartData[]>(() => (
    data.map((item) => ({
      name: item.name,
      population: item.value,
      color: item.color,
      legendFontColor: COLORS.text,
      legendFontSize: 12,
    }))
  ), [data]);

  const renderLineChart = () => (
    <LineChart
      data={lineChartData}
      width={width}
      height={height}
      chartConfig={chartConfig}
      bezier
      style={styles.chart}
    />
  );

  const renderPieChart = () => (
    <PieChart
      data={pieChartData}
      width={width}
      height={height}
      chartConfig={chartConfig}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="15"
      absolute
      style={styles.chart}
    />
  );

  return (
    <View style={styles.container}>
      {type === 'line' ? renderLineChart() : renderPieChart()}
    </View>
  );
};

export default memo(Chart);