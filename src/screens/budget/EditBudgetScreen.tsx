import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';

// Types
import { EditBudgetScreenNavigationProp, EditBudgetScreenRouteProp } from './types/EditBudgetScreen.types';
import { CategoryInput } from '../../types/category';
import { BudgetStackParamList } from '../../navigation/types/budget.types';

// Styles
import { styles } from './styles/EditBudgetScreen.styles';

// Utils
import {
  CATEGORY_COLORS,
  validateForm,
  formatCurrencyInput,
  parseCurrencyInput,
  createCategoryUpdate
} from './utils/EditBudgetScreen.utils';
import { formatCompactCurrency, formatCurrency } from '../../utils/formatters';

// Components
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import TypeButton from './components/TypeButton';
import ColorButton from './components/ColorButton';

// Hooks
import useCategories from '../../hooks/useCategories';
import useTransactions from '../../hooks/useTransactions';

// Constants
import { COLORS } from '../../constants/theme';

/**
 * Screen untuk mengedit anggaran
 */
const EditBudgetScreen: React.FC = () => {
  const navigation = useNavigation<EditBudgetScreenNavigationProp>();
  const route = useRoute<RouteProp<BudgetStackParamList, 'EditBudget'>>();
  const { categories, updateCategory, deleteCategory } = useCategories();
  const { transactions } = useTransactions();
  const { budgetId } = route.params;

  // State untuk form data
  const [formData, setFormData] = useState<CategoryInput>({
    name: '',
    type: 'expense',
    color: COLORS.primary.main,
    icon: 'wallet-outline',
    budget: 0,
    isDefault: false,
  });

  // State untuk error validasi
  const [errors, setErrors] = useState<Record<string, string>>({});

  // State untuk input anggaran dalam format mata uang
  const [budgetText, setBudgetText] = useState('');
  
  // State untuk menampilkan format lengkap
  const [showFullFormat, setShowFullFormat] = useState(false);

  // Memuat data kategori saat komponen dimount
  useEffect(() => {
    const category = categories.find(c => c.id === budgetId);
    if (category) {
      const budget = category.budget || 0;
      setFormData({
        name: category.name || '',
        type: category.type || 'expense',
        color: category.color || COLORS.primary.main,
        icon: category.icon || 'wallet-outline',
        budget,
        isDefault: category.isDefault || false,
      });
      
      // Format budget dengan benar untuk ditampilkan
      if (budget > 0) {
        setBudgetText(formatCurrencyInput(budget.toString()));
      } else {
        setBudgetText('');
      }
    }
  }, [budgetId, categories]);

  // Hitung total pengeluaran untuk kategori ini
  const calculateSpent = useCallback(() => {
    if (!categories.length) return 0;
    
    const category = categories.find(c => c.id === budgetId);
    if (!category) return 0;
    
    return transactions
      .filter(t => t.categoryId === category.id && t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  }, [categories, transactions, budgetId]);

  const spent = calculateSpent();

  // Handler untuk validasi form
  const validateFormData = useCallback(() => {
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handler untuk update form data
  const handleChange = useCallback((field: keyof CategoryInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Reset error untuk field yang diubah
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  // Handler untuk update anggaran
  const handleBudgetChange = useCallback((value: string) => {
    // Hapus karakter 'Rp' jika ada
    const cleanValue = value.replace(/^Rp\s?/i, '');
    
    // Format nilai untuk tampilan
    const formattedValue = formatCurrencyInput(cleanValue);
    setBudgetText(formattedValue);

    // Konversi ke nilai numerik untuk disimpan
    const numericValue = parseCurrencyInput(cleanValue);
    handleChange('budget', numericValue);
  }, [handleChange]);

  // Handler untuk update tipe kategori
  const handleTypeChange = useCallback((type: 'income' | 'expense') => {
    handleChange('type', type);
  }, [handleChange]);

  // Handler untuk update warna kategori
  const handleColorChange = useCallback((color: string) => {
    handleChange('color', color);
  }, [handleChange]);

  // Handler untuk submit form
  const handleSubmit = useCallback(async () => {
    if (!validateFormData()) {
      return;
    }

    try {
      const categoryUpdate = createCategoryUpdate(budgetId, formData);
      await updateCategory(budgetId, categoryUpdate);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating category:', error);
      Alert.alert(
        'Gagal Mengupdate Kategori',
        'Terjadi kesalahan saat mengupdate kategori. Silakan coba lagi.'
      );
    }
  }, [formData, updateCategory, navigation, validateFormData, budgetId]);

  // Handler untuk hapus kategori
  const handleDelete = useCallback(() => {
    Alert.alert(
      'Hapus Kategori',
      'Apakah Anda yakin ingin menghapus kategori ini? Semua transaksi yang terkait dengan kategori ini akan tetap ada tetapi tidak akan memiliki kategori.',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteCategory(budgetId);
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting category:', error);
              Alert.alert(
                'Gagal Menghapus Kategori',
                'Terjadi kesalahan saat menghapus kategori. Silakan coba lagi.'
              );
            }
          },
        },
      ]
    );
  }, [deleteCategory, navigation, budgetId]);

  // Handler untuk navigasi kembali
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  
  // Toggle format tampilan angka
  const toggleFormat = useCallback(() => {
    setShowFullFormat(prev => !prev);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Anggaran</Text>
      </View>
      
      {/* Ringkasan Anggaran */}
      <TouchableOpacity 
        style={styles.budgetSummary} 
        onPress={toggleFormat}
        activeOpacity={0.7}
      >
        <Text style={styles.budgetSummaryLabel}>Total Pengeluaran / Anggaran:</Text>
        <Text style={styles.budgetSummaryValue}>
          {showFullFormat 
            ? `${formatCurrency(spent)} / ${formatCurrency(formData.budget)}` 
            : `${formatCompactCurrency(spent)} / ${formatCompactCurrency(formData.budget)}`}
        </Text>
        <Text style={styles.budgetSummaryHint}>Ketuk untuk {showFullFormat ? 'ringkas' : 'detail'}</Text>
      </TouchableOpacity>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={styles.formContainer}
          entering={FadeInDown.duration(600).springify()}
        >
          <Text style={styles.formTitle}>Informasi Kategori</Text>

          <View style={styles.inputGroup}>
            <Input
              label="Nama Kategori"
              placeholder="Masukkan nama kategori"
              value={formData.name}
              onChangeText={(text) => handleChange('name', text)}
              error={errors.name}
            />
          </View>

          <View style={styles.typeSelector}>
            <Text style={styles.label}>Tipe Kategori</Text>
            <View style={styles.typeButtons}>
              <TypeButton
                type="income"
                isSelected={formData.type === 'income'}
                onPress={() => handleTypeChange('income')}
              />
              <TypeButton
                type="expense"
                isSelected={formData.type === 'expense'}
                onPress={() => handleTypeChange('expense')}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Anggaran</Text>
            <View style={styles.currencyInputContainer}>
              <Text style={styles.currencySymbol}>Rp</Text>
              <TextInput
                style={styles.currencyInput}
                value={budgetText}
                onChangeText={handleBudgetChange}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>
            {errors.budget && <Text style={styles.errorText}>{errors.budget}</Text>}
          </View>

          <View style={styles.colorSelector}>
            <Text style={styles.label}>Warna Kategori</Text>
            <View style={styles.colorButtons}>
              {CATEGORY_COLORS.map((color) => (
                <ColorButton
                  key={color}
                  color={color}
                  isSelected={formData.color === color}
                  onPress={() => handleColorChange(color)}
                />
              ))}
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={styles.deleteButtonText}>Hapus</Text>
          </TouchableOpacity>
          
          <Button
            title="Simpan"
            onPress={handleSubmit}
            style={styles.saveButton}
          />
        </View>
      </View>
    </View>
  );
};

export default EditBudgetScreen;
