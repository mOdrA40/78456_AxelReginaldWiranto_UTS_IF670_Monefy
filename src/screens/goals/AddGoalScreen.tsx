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
import { AddGoalScreenNavigationProp, AddFormErrors } from './types';
import { GoalInput, GoalStatus } from '../../types/goal';

// Styles
import { styles } from './styles/AddGoalScreen.styles';

// Utils
import { validateGoalForm, formatCurrencyInput, parseCurrencyInput } from './utils';

// Components
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import DatePicker from '../../components/pickers/DatePicker';
import { IconOption, ColorOption } from './components';

// Hooks
import useGoals from '../../hooks/useGoals';

// Constants
import { COLORS } from '../../constants/theme';

// Constants for icon and color options
const ICON_OPTIONS = [
  { name: 'home-outline', label: 'Rumah' },
  { name: 'car-outline', label: 'Mobil' },
  { name: 'airplane-outline', label: 'Liburan' },
  { name: 'school-outline', label: 'Pendidikan' },
  { name: 'business-outline', label: 'Bisnis' },
  { name: 'medical-outline', label: 'Kesehatan' },
  { name: 'gift-outline', label: 'Hadiah' },
  { name: 'wallet-outline', label: 'Tabungan' },
  { name: 'ellipsis-horizontal-outline', label: 'Lainnya' },
];

const COLOR_OPTIONS = [
  COLORS.primary.main,
  COLORS.success[600],
  COLORS.warning[500],
  COLORS.danger[600],
  COLORS.info[500],
  '#9C27B0', // purple
  '#795548', // brown
  '#607D8B', // blue grey
];

/**
 * Screen untuk menambahkan tujuan keuangan baru
 */
const AddGoalScreen: React.FC = () => {
  const navigation = useNavigation<AddGoalScreenNavigationProp>();
  const { addGoal } = useGoals();

  // State untuk form data
  const [formData, setFormData] = useState<GoalInput>({
    name: '',
    description: '',
    targetAmount: 0,
    currentAmount: 0,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    status: 'ongoing' as GoalStatus,
    iconName: 'wallet-outline',
    color: COLORS.primary.main,
  });

  // State untuk error validasi
  const [errors, setErrors] = useState<AddFormErrors>({});

  // State untuk input target amount dalam format mata uang
  const [targetAmountText, setTargetAmountText] = useState('');

  // Handler untuk validasi form
  const validateForm = useCallback(() => {
    const newErrors = validateGoalForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handler untuk update form data
  const handleChange = useCallback((field: keyof GoalInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Reset error untuk field yang diubah
    if (errors[field as keyof AddFormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof AddFormErrors];
        return newErrors;
      });
    }
  }, [errors]);

  // Handler untuk update target amount
  const handleTargetAmountChange = useCallback((value: string) => {
    const formattedValue = formatCurrencyInput(value);
    setTargetAmountText(formattedValue);

    const numericValue = parseCurrencyInput(value);
    handleChange('targetAmount', numericValue);
  }, [handleChange]);

  // Handler untuk update icon
  const handleIconChange = useCallback((iconName: string) => {
    handleChange('iconName', iconName);
  }, [handleChange]);

  // Handler untuk update warna
  const handleColorChange = useCallback((color: string) => {
    handleChange('color', color);
  }, [handleChange]);

  // Handler untuk update tanggal target
  const handleDateChange = useCallback((date: Date) => {
    handleChange('endDate', date);
  }, [handleChange]);

  // Handler untuk submit form
  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await addGoal(formData);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding goal:', error);
      Alert.alert(
        'Gagal Menambahkan Tujuan',
        'Terjadi kesalahan saat menambahkan tujuan. Silakan coba lagi.'
      );
    }
  }, [formData, addGoal, navigation, validateForm]);

  // Handler untuk navigasi kembali
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={styles.formContainer}
          entering={FadeInDown.duration(600).springify()}
        >
          <Text style={styles.formTitle}>Informasi Tujuan</Text>

          <View style={styles.inputGroup}>
            <Input
              label="Nama Tujuan"
              placeholder="Masukkan nama tujuan"
              value={formData.name}
              onChangeText={(text) => handleChange('name', text)}
              error={errors.name}
              touched={true}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Target Jumlah</Text>
            <View style={styles.currencyInputContainer}>
              <Text style={styles.currencySymbol}>Rp</Text>
              <TextInput
                style={styles.currencyInput}
                value={targetAmountText}
                onChangeText={handleTargetAmountChange}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>
            {errors.targetAmount && <Text style={styles.errorText}>{errors.targetAmount}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tanggal Target</Text>
            <DatePicker
              label=""
              value={formData.endDate}
              onChange={handleDateChange}
              error={errors.targetDate}
              minimumDate={new Date()}
            />
          </View>

          <View style={styles.iconSelector}>
            <Text style={styles.label}>Pilih Ikon</Text>
            <View style={styles.optionsGrid}>
              {ICON_OPTIONS.map((option) => (
                <IconOption
                  key={option.name}
                  name={option.name}
                  label={option.label}
                  selected={formData.iconName === option.name}
                  onSelect={() => handleIconChange(option.name)}
                />
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pilih Warna</Text>
            <View style={styles.colorsRow}>
              {COLOR_OPTIONS.map((color) => (
                <ColorOption
                  key={color}
                  color={color}
                  selected={formData.color === color}
                  onSelect={() => handleColorChange(color)}
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

export default AddGoalScreen;
