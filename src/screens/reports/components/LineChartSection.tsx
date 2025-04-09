import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LineChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ReportType } from '../types';
import { styles } from '../styles/ReportsScreen.styles';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../../constants/theme';
import { formatYLabel } from '../utils/ReportUtils';

interface LineChartSectionProps {
  labels: string[];
  incomeData: number[];
  expenseData: number[];
  reportType: ReportType;
}

/**
 * Komponen untuk menampilkan grafik garis
 */
const LineChartSection: React.FC<LineChartSectionProps> = ({ 
  labels, 
  incomeData, 
  expenseData, 
  reportType 
}) => {
  const chartWidth = Dimensions.get('window').width - SPACING.lg * 2;
  
  const chartData = {
    labels,
    datasets: [
      {
        data: reportType === 'expense' ? expenseData : incomeData,
        color: () => reportType === 'expense' ? COLORS.expense.main : COLORS.income.main,
        strokeWidth: 2,
      },
      ...(reportType === 'overview'
        ? [
            {
              data: expenseData,
              color: () => COLORS.expense.main,
              strokeWidth: 2,
            },
          ]
        : []),
    ],
    legend: reportType === 'overview' ? ['Pemasukan', 'Pengeluaran'] : undefined,
  };

  // Menentukan ikon berdasarkan jenis laporan
  const getChartIcon = () => {
    switch (reportType) {
      case 'income':
        return 'trending-up';
      case 'expense':
        return 'trending-down';
      default:
        return 'chart-line';
    }
  };

  return (
    <Animated.View 
      entering={FadeInDown.delay(300).springify()}
      style={styles.chartContainer}
    >
      <View style={styles.chartHeader}>
        <View style={styles.chartTitleContainer}>
          <MaterialCommunityIcons 
            name={getChartIcon()} 
            size={20} 
            color={COLORS.primary.main} 
            style={styles.chartIcon}
          />
          <Text style={styles.chartTitle}>
            {reportType === 'income'
              ? 'Grafik Pemasukan'
              : reportType === 'expense'
              ? 'Grafik Pengeluaran'
              : 'Grafik Pemasukan & Pengeluaran'}
          </Text>
        </View>
      </View>
      
      <View style={styles.chartContent}>
        <LineChart
          data={chartData}
          width={chartWidth}
          height={220}
          chartConfig={{
            backgroundColor: COLORS.surface,
            backgroundGradientFrom: COLORS.surface,
            backgroundGradientTo: COLORS.surface,
            decimalPlaces: 0,
            color: (opacity = 1) => {
              // Menggunakan format rgba untuk menangani opacity dengan benar
              const hexColor = COLORS.neutral[900]; 
              // Mengkonversi hex ke rgb dan menambahkan opacity
              const r = parseInt(hexColor.slice(1, 3), 16);
              const g = parseInt(hexColor.slice(3, 5), 16);
              const b = parseInt(hexColor.slice(5, 7), 16);
              return `rgba(${r}, ${g}, ${b}, ${opacity})`;
            },
            labelColor: (opacity = 1) => {
              // Menggunakan format rgba untuk menangani opacity dengan benar
              const hexColor = COLORS.neutral[500]; 
              // Mengkonversi hex ke rgb dan menambahkan opacity
              const r = parseInt(hexColor.slice(1, 3), 16);
              const g = parseInt(hexColor.slice(3, 5), 16);
              const b = parseInt(hexColor.slice(5, 7), 16);
              return `rgba(${r}, ${g}, ${b}, ${opacity})`;
            },
            style: {
              borderRadius: BORDER_RADIUS.lg,
            },
            propsForDots: {
              r: '5',
              strokeWidth: '2',
            },
            formatYLabel,
          }}
          bezier
          style={styles.chart}
          withInnerLines={false}
          withOuterLines={true}
          withShadow={true}
          withDots={true}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          fromZero={true}
        />
      </View>
    </Animated.View>
  );
};

export default LineChartSection;
