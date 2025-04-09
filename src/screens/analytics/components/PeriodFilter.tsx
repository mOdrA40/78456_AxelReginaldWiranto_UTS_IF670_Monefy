import React, { memo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { PeriodFilterProps, PeriodFilter as PeriodFilterType, FilterOption } from '../types';
import { analyticsStyles as styles } from '../styles';

const PeriodFilter: React.FC<PeriodFilterProps> = ({ periodFilter, setPeriodFilter }) => {
  const periods: FilterOption<PeriodFilterType>[] = [
    { label: 'Minggu ini', value: 'week' },
    { label: 'Bulan ini', value: 'month' },
    { label: '3 Bulan', value: 'quarter' },
    { label: 'Tahun ini', value: 'year' }
  ];

  return (
    <View style={styles.filterContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.periodFilterScroll}
      >
        {periods.map(period => (
          <TouchableOpacity
            key={period.value}
            style={[
              styles.periodFilterButton,
              periodFilter === period.value && styles.activePeriodFilterButton
            ]}
            onPress={() => setPeriodFilter(period.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.periodFilterText,
                periodFilter === period.value && styles.activePeriodFilterText
              ]}
            >
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default memo(PeriodFilter);
