import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TypeFilterProps, TransactionType, FilterOption } from '../types';
import { analyticsStyles as styles } from '../styles';
import { COLORS } from '../../../constants/theme';

const TypeFilter: React.FC<TypeFilterProps> = ({ typeFilter, setTypeFilter }) => {
  const types: FilterOption<TransactionType>[] = [
    { label: 'Pengeluaran', value: 'expense', icon: 'trending-down' },
    { label: 'Pemasukan', value: 'income', icon: 'trending-up' },
    { label: 'Semua', value: 'all', icon: 'swap-vert' }
  ];

  return (
    <View style={styles.typeFilterContainer}>
      {types.map(type => (
        <TouchableOpacity
          key={type.value}
          style={[
            styles.typeFilterButton,
            typeFilter === type.value && styles.activeTypeFilterButton
          ]}
          onPress={() => setTypeFilter(type.value)}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={type.icon as any}
            size={20}
            color={typeFilter === type.value ? COLORS.white : COLORS.neutral[600]}
          />
          <Text
            style={[
              styles.typeFilterText,
              typeFilter === type.value && styles.activeTypeFilterText
            ]}
          >
            {type.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default memo(TypeFilter);
