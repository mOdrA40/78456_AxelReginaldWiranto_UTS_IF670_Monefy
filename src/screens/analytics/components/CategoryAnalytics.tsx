import React, { memo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../../components/common/Card';
import PieChart from '../../../components/charts/PieChart';
import { PieChartItem as ComponentPieChartItem } from '../../../components/charts/PieChart.types';
import { CategoryAnalyticsProps } from '../types';
import { analyticsStyles as styles } from '../styles';
import { COLORS } from '../../../constants/theme';
import { formatCurrency } from '../../../utils/formatters';


const CategoryAnalytics: React.FC<CategoryAnalyticsProps> = ({
  data,
  type,
  isLoading
}) => {
  
  if (isLoading) {
    return (
      <Card style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Analisis Kategori</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary.main} />
        </View>
      </Card>
    );
  }

  
  if (!data.length) {
    return (
      <Card style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Analisis Kategori</Text>
        <View style={styles.emptyContainer}>
          <MaterialIcons
            name="bar-chart"
            size={40}
            color={COLORS.neutral[400]}
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyTitle}>Tidak Ada Data</Text>
          <Text style={styles.emptyText}>
            Belum ada {type === 'income' ? 'pemasukan' : type === 'expense' ? 'pengeluaran' : 'transaksi'}
            untuk periode ini.
          </Text>
        </View>
      </Card>
    );
  }

  return (
    <Card style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Analisis Kategori</Text>
      <View style={styles.pieChartContainer}>
        <PieChart
          data={data.map(item => ({
            id: item.id,
            value: item.value,
            color: item.color,
            name: item.label
          } as ComponentPieChartItem))}
          centerLabel="Kategori"
          centerValue={data.length.toString()}
          showLegend={false}
        />
      </View>

      <View style={styles.legendContainer}>
        {data.map((item) => (
          <View key={item.id} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.label}</Text>
            <Text style={styles.legendValue}>{formatCurrency(item.value)}</Text>
            <Text style={styles.legendPercentage}>
              {item.percentage.toFixed(1)}%
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
};

export default memo(CategoryAnalytics);
