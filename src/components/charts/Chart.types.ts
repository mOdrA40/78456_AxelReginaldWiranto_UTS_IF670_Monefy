import { ChartData } from '../../types';

export interface ChartConfig {
  backgroundColor?: string;
  backgroundGradientFrom?: string;
  backgroundGradientTo?: string;
  decimalPlaces?: number;
  color?: (opacity: number) => string;
  labelColor?: (opacity: number) => string;
  style?: {
    borderRadius?: number;
  };
  propsForDots?: {
    r?: string;
    strokeWidth?: string;
    stroke?: string;
  };
  propsForLabels?: {
    fontSize?: number;
  };
}

export interface ChartProps {
  type: 'line' | 'pie';
  data: ChartData[];
  width?: number;
  height?: number;
  chartConfig?: ChartConfig;
}

export interface LineChartData {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}

export interface PieChartData {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}
