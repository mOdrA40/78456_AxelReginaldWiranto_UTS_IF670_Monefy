import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ReportPeriod, PeriodItem } from '../types';
import { styles } from '../styles/ReportsScreen.styles';
import { COLORS } from '../../../constants/theme';

interface PeriodSelectorProps {
  period: ReportPeriod;
  setPeriod: (period: ReportPeriod) => void;
}

/**
 * Komponen untuk memilih periode laporan
 */
const PeriodSelector: React.FC<PeriodSelectorProps> = ({ period, setPeriod }) => {
  const periods: PeriodItem[] = [
    { value: 'week', label: 'Minggu', icon: 'calendar-week' },
    { value: 'month', label: 'Bulan', icon: 'calendar-month' },
    { value: 'year', label: 'Tahun', icon: 'calendar' },
  ];

  return (
    <View style={styles.selectorWrapper}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.periodSelector}
      >
        {periods.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.periodButton,
              period === item.value && styles.activePeriodButton,
            ]}
            onPress={() => setPeriod(item.value)}
          >
            <MaterialCommunityIcons 
              name={item.icon as any} 
              size={18} 
              color={period === item.value ? COLORS.white : COLORS.textSecondary} 
              style={styles.buttonIcon}
            />
            <Text
              style={[
                styles.periodButtonText,
                period === item.value && styles.activePeriodText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.scrollIndicator}>
        <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
      </View>
    </View>
  );
};

export default PeriodSelector;
