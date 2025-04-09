import React from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FilterModalProps } from '../types';
import { styles } from '../styles/TransactionsScreen.styles';
import { COLORS, TYPOGRAPHY } from '../../../constants/theme';
import DatePicker from '../../../components/pickers/DatePicker';

/**
 * Komponen modal filter transaksi
 */
const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  filters,
  setFilters,
  onClose,
  onReset,
  categories
}) => {
  const toggleCategoryFilter = (categoryId: string) => {
    const updatedCategoryIds = [...filters.categoryIds];
    const index = updatedCategoryIds.indexOf(categoryId);
    
    if (index !== -1) {
      updatedCategoryIds.splice(index, 1);
    } else {
      updatedCategoryIds.push(categoryId);
    }
    
    setFilters({
      ...filters,
      categoryIds: updatedCategoryIds,
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Transaksi</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Tipe Transaksi</Text>
            <View style={styles.typeButtons}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  filters.type === 'all' && styles.activeTypeButton,
                ]}
                onPress={() => setFilters({ ...filters, type: 'all' })}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    filters.type === 'all' && styles.activeTypeButtonText,
                  ]}
                >
                  Semua
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  filters.type === 'income' && styles.activeTypeButton,
                ]}
                onPress={() => setFilters({ ...filters, type: 'income' })}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    filters.type === 'income' && styles.activeTypeButtonText,
                  ]}
                >
                  Pemasukan
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  filters.type === 'expense' && styles.activeTypeButton,
                ]}
                onPress={() => setFilters({ ...filters, type: 'expense' })}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    filters.type === 'expense' && styles.activeTypeButtonText,
                  ]}
                >
                  Pengeluaran
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Kategori</Text>
            <View style={styles.categoryButtons}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    filters.categoryIds.includes(category.id) && {
                      backgroundColor: category.color + '30',
                      borderColor: category.color,
                    },
                  ]}
                  onPress={() => toggleCategoryFilter(category.id)}
                >
                  <View
                    style={[
                      styles.categoryColor,
                      { backgroundColor: category.color },
                    ]}
                  />
                  <Text
                    style={[
                      styles.categoryButtonText,
                      filters.categoryIds.includes(category.id) && {
                        color: category.color,
                        fontFamily: TYPOGRAPHY.fontFamily.medium,
                      },
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Rentang Waktu</Text>
            <DatePicker
              label="Dari Tanggal"
              value={filters.startDate}
              onChange={(date) => setFilters({ ...filters, startDate: date })}
            />
            <DatePicker
              label="Sampai Tanggal"
              value={filters.endDate}
              onChange={(date) => setFilters({ ...filters, endDate: date })}
              minimumDate={filters.startDate}
            />
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Rentang Jumlah</Text>
            <View style={styles.amountInputs}>
              <View style={styles.amountInputContainer}>
                <Text style={styles.amountInputLabel}>Minimal</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0"
                  keyboardType="numeric"
                  value={filters.minAmount}
                  onChangeText={(value) =>
                    setFilters({ ...filters, minAmount: value })
                  }
                />
              </View>
              <View style={styles.amountInputContainer}>
                <Text style={styles.amountInputLabel}>Maksimal</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="999999999"
                  keyboardType="numeric"
                  value={filters.maxAmount}
                  onChangeText={(value) =>
                    setFilters({ ...filters, maxAmount: value })
                  }
                />
              </View>
            </View>
          </View>
          
          <View style={styles.filterActions}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={onReset}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={onClose}
            >
              <Text style={styles.applyButtonText}>Terapkan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
