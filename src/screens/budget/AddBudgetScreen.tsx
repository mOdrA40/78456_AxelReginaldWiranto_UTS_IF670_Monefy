import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

// Types
import { AddBudgetScreenNavigationProp } from './types/AddBudgetScreen.types';
import { CategoryInput } from '../../types/category';

// Styles
import { styles } from './styles/AddBudgetScreen.styles';

// Utils
import { CATEGORY_COLORS, validateForm, formatCurrencyInput, parseCurrencyInput } from './utils/AddBudgetScreen.utils';

// Components
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import TypeButton from './components/TypeButton';
import ColorButton from './components/ColorButton';

// Hooks
import useCategories from '../../hooks/useCategories';

// Constants
import { COLORS } from '../../constants/theme';

/**
 * Screen untuk menambahkan anggaran baru
 */
const AddBudgetScreen: React.FC = () => {
  const navigation = useNavigation<AddBudgetScreenNavigationProp>();
  const { categories, addCategory } = useCategories();
  
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
    const formattedValue = formatCurrencyInput(value);
    setBudgetText(formattedValue);
    
    const numericValue = parseCurrencyInput(value);
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
      await addCategory(formData);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding category:', error);
      Alert.alert(
        'Gagal Menambahkan Kategori',
        'Terjadi kesalahan saat menambahkan kategori. Silakan coba lagi.'
      );
    }
  }, [formData, addCategory, navigation, validateFormData]);
  
  // Handler untuk navigasi kembali
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tambah Anggaran</Text>
      </View>
      
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
        <Button
          title="Simpan"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default AddBudgetScreen;
