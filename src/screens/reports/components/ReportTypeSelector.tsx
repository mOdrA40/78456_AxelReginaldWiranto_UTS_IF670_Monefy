import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ReportType, ReportTypeItem } from '../types';
import { styles } from '../styles/ReportsScreen.styles';
import { COLORS } from '../../../constants/theme';

interface ReportTypeSelectorProps {
  reportType: ReportType;
  setReportType: (type: ReportType) => void;
}

/**
 * Komponen untuk memilih jenis laporan
 */
const ReportTypeSelector: React.FC<ReportTypeSelectorProps> = ({ reportType, setReportType }) => {
  const types: ReportTypeItem[] = [
    { value: 'overview', label: 'Semua', icon: 'chart-bar' },
    { value: 'income', label: 'Pemasukan', icon: 'trending-up' },
    { value: 'expense', label: 'Pengeluaran', icon: 'trending-down' },
  ];

  return (
    <View style={styles.selectorWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.reportTypeSelector}
      >
        {types.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.typeButton,
              reportType === item.value && styles.activeTypeButton,
            ]}
            onPress={() => setReportType(item.value)}
          >
            <MaterialCommunityIcons 
              name={item.icon as any} 
              size={18} 
              color={reportType === item.value ? COLORS.white : COLORS.textSecondary} 
              style={styles.buttonIcon}
            />
            <Text
              style={[
                styles.typeButtonText,
                reportType === item.value && styles.activeTypeText,
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

export default ReportTypeSelector;
