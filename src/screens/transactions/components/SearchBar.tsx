import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/TransactionsScreen.styles';
import { COLORS } from '../../../constants/theme';

interface SearchBarProps {
  onSearchPress: () => void;
  onFilterPress: () => void;
  onAddPress: () => void;
  activeFiltersCount: number;
}

/**
 * Komponen search bar untuk TransactionsScreen
 */
const SearchBar: React.FC<SearchBarProps> = ({
  onSearchPress,
  onFilterPress,
  onAddPress,
  activeFiltersCount
}) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.headerButtons}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onSearchPress}
        >
          <Ionicons name="search" size={24} color={COLORS.primary.main} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.iconButton,
            activeFiltersCount > 0 && styles.activeFilterButton
          ]}
          onPress={onFilterPress}
        >
          <Ionicons name="filter" size={24} color={activeFiltersCount > 0 ? COLORS.white : COLORS.primary.main} />
          {activeFiltersCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={onAddPress}
        >
          <Ionicons name="add-circle" size={24} color={COLORS.primary.main} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;
