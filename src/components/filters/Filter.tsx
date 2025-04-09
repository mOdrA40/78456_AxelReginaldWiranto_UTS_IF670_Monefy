import React, { useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { TransactionType } from '../../types';
import { FilterProps } from './Filter.types';
import { styles } from './Filter.styles';

const Filter: React.FC<FilterProps> = ({
  onApply,
  onReset,
  initialFilter = {},
}) => {
  const [type, setType] = useState<TransactionType | undefined>(
    initialFilter.type
  );
  const [startDate, setStartDate] = useState<Date | undefined>(
    initialFilter.startDate
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    initialFilter.endDate
  );
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(
    initialFilter.searchQuery || ''
  );
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'category'>(
    initialFilter.sortBy || 'date'
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    initialFilter.sortOrder || 'desc'
  );

  const handleApply = useCallback(() => {
    const filter = {
      type,
      startDate,
      endDate,
      searchQuery,
      sortBy,
      sortOrder,
    };

    onApply(filter);
  }, [type, startDate, endDate, searchQuery, sortBy, sortOrder, onApply]);

  const handleReset = useCallback(() => {
    setType(undefined);
    setStartDate(undefined);
    setEndDate(undefined);
    setSearchQuery('');
    setSortBy('date');
    setSortOrder('desc');

    onReset();
  }, [onReset]);

  const handleStartDateChange = useCallback((_event: any, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  }, []);

  const handleEndDateChange = useCallback((_event: any, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Tipe Transaksi */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipe Transaksi</Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'income' && styles.typeButtonActive,
              ]}
              onPress={() => setType('income')}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  type === 'income' && styles.typeButtonTextActive,
                ]}
              >
                Pemasukan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'expense' && styles.typeButtonActive,
              ]}
              onPress={() => setType('expense')}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  type === 'expense' && styles.typeButtonTextActive,
                ]}
              >
                Pengeluaran
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tanggal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tanggal</Text>
          <View style={styles.dateContainer}>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowStartDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {startDate
                  ? startDate.toLocaleDateString('id-ID')
                  : 'Tanggal Mulai'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowEndDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {endDate
                  ? endDate.toLocaleDateString('id-ID')
                  : 'Tanggal Selesai'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pencarian */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pencarian</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>
              {searchQuery || 'Cari transaksi...'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Pengurutan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pengurutan</Text>
          <View style={styles.sortContainer}>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === 'date' && styles.sortButtonActive,
              ]}
              onPress={() => setSortBy('date')}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortBy === 'date' && styles.sortButtonTextActive,
                ]}
              >
                Tanggal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === 'amount' && styles.sortButtonActive,
              ]}
              onPress={() => setSortBy('amount')}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortBy === 'amount' && styles.sortButtonTextActive,
                ]}
              >
                Jumlah
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === 'category' && styles.sortButtonActive,
              ]}
              onPress={() => setSortBy('category')}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortBy === 'category' && styles.sortButtonTextActive,
                ]}
              >
                Kategori
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.orderContainer}>
            <TouchableOpacity
              style={[
                styles.orderButton,
                sortOrder === 'asc' && styles.orderButtonActive,
              ]}
              onPress={() => setSortOrder('asc')}
            >
              <Text
                style={[
                  styles.orderButtonText,
                  sortOrder === 'asc' && styles.orderButtonTextActive,
                ]}
              >
                Naik
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.orderButton,
                sortOrder === 'desc' && styles.orderButtonActive,
              ]}
              onPress={() => setSortOrder('desc')}
            >
              <Text
                style={[
                  styles.orderButtonText,
                  sortOrder === 'desc' && styles.orderButtonTextActive,
                ]}
              >
                Turun
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Tombol Aksi */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Terapkan</Text>
        </TouchableOpacity>
      </View>

      {/* Date Pickers */}
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
          maximumDate={endDate || new Date()}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
          minimumDate={startDate}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};



export default memo(Filter);