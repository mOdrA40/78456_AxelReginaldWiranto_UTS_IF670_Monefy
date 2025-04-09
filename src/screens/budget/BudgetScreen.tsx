import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

// Styles
import { styles } from './styles/BudgetScreen.styles';
import { COLORS } from '../../constants/theme';

// Utils
import {
  getMonthName,
  getPreviousMonth,
  getNextMonth,
  calculateCategoryProgress,
  isSameMonth,
} from './utils/BudgetScreen.utils';
import { formatCompactCurrency } from '../../utils/formatters';

// Types
import { Category } from '../../types/category';
import { BudgetScreenNavigationProp } from './types/BudgetScreen.types';

// Components
import BudgetCategoryCard from './components/BudgetCategoryCard';
import EmptyState from '../../components/common/EmptyState';

// Hooks
import useCategories from '../../hooks/useCategories';
import useTransactions from '../../hooks/useTransactions';

const BudgetScreen: React.FC = () => {
  const navigation = useNavigation<BudgetScreenNavigationProp>();
  const { categories, loading: loadingCategories } = useCategories();
  const { transactions, loading: loadingTransactions } = useTransactions();
  
  // State untuk bulan yang dipilih
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Filter transaksi berdasarkan bulan yang dipilih
  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return isSameMonth(transactionDate, selectedDate);
  });
  
  // Hitung progress untuk setiap kategori
  const categoriesWithProgress = calculateCategoryProgress(
    categories,
    filteredTransactions
  );

  // Handler untuk navigasi ke AddBudgetScreen
  const handleAddBudget = () => {
    navigation.navigate('AddBudget');
  };

  // Handler untuk navigasi ke EditBudgetScreen
  const handleEditBudget = useCallback((categoryId: string) => {
    navigation.navigate('EditBudget', { budgetId: categoryId });
  }, [navigation]);

  // Handler untuk bulan sebelumnya
  const handlePrevMonth = () => {
    setSelectedDate(getPreviousMonth(selectedDate));
  };

  // Handler untuk bulan berikutnya
  const handleNextMonth = () => {
    setSelectedDate(getNextMonth(selectedDate));
  };

  // Render loading state
  if (loadingCategories || loadingTransactions) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary.main} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Anggaran</Text>
      </View>

      {/* Month Selector */}
      <View style={styles.monthSelector}>
        <TouchableOpacity style={styles.monthButton} onPress={handlePrevMonth}>
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.monthText}>{getMonthName(selectedDate)}</Text>
        <TouchableOpacity style={styles.monthButton} onPress={handleNextMonth}>
          <Ionicons name="chevron-forward" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.categoriesContainer}>
        {categoriesWithProgress.length === 0 ? (
          <EmptyState
            icon="wallet-outline"
            title="Belum ada anggaran"
            message="Tambahkan anggaran untuk mulai melacak pengeluaran Anda"
          />
        ) : (
          <>
            <Text style={styles.sectionTitle}>Kategori Anggaran</Text>
            {categoriesWithProgress.map((category) => (
              <BudgetCategoryCard
                key={category.id}
                category={category}
                onPress={() => handleEditBudget(category.id)}
              />
            ))}
          </>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.fab}
          onPress={handleAddBudget}
        >
          <Ionicons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BudgetScreen;
