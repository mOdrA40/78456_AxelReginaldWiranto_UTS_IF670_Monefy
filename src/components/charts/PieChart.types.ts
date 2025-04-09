export interface PieChartItem {
  id: string;
  value: number;
  color: string;
  name: string;
}

export interface CalculatedPieChartItem extends PieChartItem {
  percentage: number;
  startAngle: number;
  endAngle: number;
}

export interface PieChartProps {
  data: PieChartItem[];
  centerLabel?: string;
  centerValue?: string | number;
  animated?: boolean;
  showLabels?: boolean;
  showLegend?: boolean;
  currency?: string;
  onItemPress?: (item: PieChartItem) => void;
  useReactNativeChartKit?: boolean;
}

export interface ChartKitItem {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

export interface ChartConfig {
  backgroundColor: string;
  backgroundGradientFrom: string;
  backgroundGradientTo: string;
  decimalPlaces: number;
  color: (opacity?: number) => string;
  labelColor: (opacity?: number) => string;
  style: {
    borderRadius: number;
  };
}

export interface Coordinate {
  x: number;
  y: number;
}
