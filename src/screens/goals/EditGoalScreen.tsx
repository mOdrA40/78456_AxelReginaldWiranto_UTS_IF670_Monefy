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

// Types
import { EditGoalScreenNavigationProp, EditGoalScreenRouteProp, EditFormErrors } from './types';
import { GoalUpdate, GoalInput } from '../../types/goal';

// Styles
import { styles } from './styles/EditGoalScreen.styles';

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
 * Screen untuk mengedit tujuan keuangan
 */
const EditGoalScreen: React.FC = () => {
  const navigation = useNavigation<EditGoalScreenNavigationProp>();
  const route = useRoute<EditGoalScreenRouteProp>();
  const { goals, updateGoal, deleteGoal } = useGoals();

  // State untuk form data
  const [formData, setFormData] = useState<Partial<GoalInput>>({
    name: '',
    description: '',
    targetAmount: 0,
    startDate: new Date(),
    endDate: new Date(),
    iconName: 'wallet-outline',
    color: COLORS.primary.main,
  });

  // State untuk error validasi
  const [errors, setErrors] = useState<EditFormErrors>({});

  // State untuk input target amount dalam format mata uang
  const [targetAmountText, setTargetAmountText] = useState('');

  // Memuat data goal saat komponen dimount
  useEffect(() => {
    const goal = goals.find(g => g.id === route.params.goalId);
    if (goal) {
      setFormData({
        name: goal.name,
        description: goal.description,
        targetAmount: goal.targetAmount,
        startDate: goal.startDate,
        endDate: goal.endDate,
        iconName: goal.iconName,
        color: goal.color,
      });
      setTargetAmountText(goal.targetAmount.toLocaleString('id-ID'));
    }
  }, [route.params.goalId, goals]);

  // Handler untuk validasi form
  const validateForm = useCallback(() => {
    const newErrors = validateGoalForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handler untuk update form data
  const handleChange = useCallback((field: keyof GoalInput, value: any) => {
    setFormData((prev: Partial<GoalInput>) => ({ ...prev, [field]: value }));

    // Reset error untuk field yang diubah
    if (errors[field as keyof EditFormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof EditFormErrors];
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
      await updateGoal(route.params.goalId, formData);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating goal:', error);
      Alert.alert(
        'Gagal Mengupdate Tujuan',
        'Terjadi kesalahan saat mengupdate tujuan. Silakan coba lagi.'
      );
    }
  }, [formData, updateGoal, navigation, validateForm]);

  // Handler untuk hapus tujuan
  const handleDelete = useCallback(() => {
    Alert.alert(
      'Hapus Tujuan',
      'Apakah Anda yakin ingin menghapus tujuan ini?',
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
              await deleteGoal(route.params.goalId);
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting goal:', error);
              Alert.alert(
                'Gagal Menghapus Tujuan',
                'Terjadi kesalahan saat menghapus tujuan. Silakan coba lagi.'
              );
            }
          },
        },
      ]
    );
  }, [deleteGoal, navigation, route.params.goalId]);

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
              value={formData.endDate || new Date()}
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
          title="Simpan Perubahan"
          onPress={handleSubmit}
        />
        <Button
          title="Hapus Tujuan"
          onPress={handleDelete}
          style={styles.deleteButton}
        />
      </View>
    </View>
  );
};

export default EditGoalScreen;
