import React, { useMemo, useCallback, memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { Category } from '../../types';
import { CategoryPickerProps } from './CategoryPicker.types';
import { styles } from './CategoryPicker.styles';

const CategoryPicker: React.FC<CategoryPickerProps> = ({
  categories,
  type,
  selectedCategoryId,
  onSelect,
}) => {
  
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => category.type === type);
  }, [categories, type]);

  
  const handleSelect = useCallback((category: Category) => {
    onSelect(category);
  }, [onSelect]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategoryId === category.id && styles.categoryButtonActive,
              { backgroundColor: category.color },
            ]}
            onPress={() => handleSelect(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategoryId === category.id &&
                  styles.categoryButtonTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default memo(CategoryPicker);