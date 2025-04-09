import { PieChartItem, CalculatedPieChartItem, Coordinate } from './PieChart.types';

export const calculateTotal = (data: PieChartItem[]): number => {
  return data.reduce((sum, item) => sum + item.value, 0);
};

export const calculateAngles = (
  data: PieChartItem[],
  total: number
): CalculatedPieChartItem[] => {
  let cumulativeAngle = 0;
  
  return data.map(item => {
    const percentage = item.value / total;
    const angle = percentage * 360;
    const startAngle = cumulativeAngle;
    cumulativeAngle += angle;
    const endAngle = cumulativeAngle;
    
    return {
      ...item,
      percentage,
      startAngle,
      endAngle,
    };
  });
};

export const polarToCartesian = (
  angle: number,
  radius: number,
  chartRadius: number
): Coordinate => {
  const angleInRadians = ((angle - 90) * Math.PI) / 180.0;
  return {
    x: chartRadius + radius * Math.cos(angleInRadians),
    y: chartRadius + radius * Math.sin(angleInRadians),
  };
};

export const createArc = (
  startAngle: number,
  endAngle: number,
  radius: number,
  chartRadius: number
): string => {
  const start = polarToCartesian(endAngle, radius, chartRadius);
  const end = polarToCartesian(startAngle, radius, chartRadius);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  
  return [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    'L',
    chartRadius,
    chartRadius,
    'Z',
  ].join(' ');
};
