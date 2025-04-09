import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { PieChart } from 'react-native-chart-kit';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CategoryChartData } from '../types';
import { styles } from '../styles/ReportsScreen.styles';
import { COLORS, SPACING, BORDER_RADIUS } from '../../../constants/theme';

interface PieChartSectionProps {
  categoryData: CategoryChartData[];
}

/**
 * Komponen untuk menampilkan grafik pie
 */
const PieChartSection: React.FC<PieChartSectionProps> = ({ categoryData }) => {
  const chartWidth = Dimensions.get('window').width - SPACING.lg * 2;
  
  if (categoryData.length === 0) {
    return (
      <Animated.View 
        entering={FadeInDown.delay(400).springify()}
        style={[styles.chartContainer, styles.emptyChartContainer]}
      >
        <View style={styles.chartHeader}>
          <View style={styles.chartTitleContainer}>
            <MaterialCommunityIcons 
              name="chart-pie" 
              size={20} 
              color={COLORS.primary.main} 
              style={styles.chartIcon}
            />
            <Text style={styles.chartTitle}>Distribusi Kategori</Text>
          </View>
        </View>
        <View style={styles.emptyChart}>
          <Ionicons name="pie-chart-outline" size={64} color={COLORS.textSecondary} />
          <Text style={styles.emptyChartText}>
            Tidak ada data untuk ditampilkan
          </Text>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View 
      entering={FadeInDown.delay(400).springify()}
      style={styles.chartContainer}
    >
      <View style={styles.chartHeader}>
        <View style={styles.chartTitleContainer}>
          <MaterialCommunityIcons 
            name="chart-pie" 
            size={20} 
            color={COLORS.primary.main} 
            style={styles.chartIcon}
          />
          <Text style={styles.chartTitle}>Distribusi Kategori</Text>
        </View>
      </View>
      
      <View style={styles.chartContent}>
        <PieChart
          data={categoryData}
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
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          hasLegend={true}
          avoidFalseZero={true}
        />
      </View>
    </Animated.View>
  );
};

export default PieChartSection;
