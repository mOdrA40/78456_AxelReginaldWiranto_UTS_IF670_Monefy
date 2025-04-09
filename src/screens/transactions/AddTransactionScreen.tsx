import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TransactionsStackParamList } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import DatePicker from '../../components/pickers/DatePicker';
import CurrencyFormatter from '../../components/formatters/CurrencyFormatter';
import useTransactions from '../../hooks/useTransactions';
import useCategories from '../../hooks/useCategories';
import { saveTransactionReceipt } from '../../utils/imageStorage';
import { formatCurrency } from '../../utils/formatters';
import Toast from 'react-native-toast-message';

type AddTransactionScreenNavigationProp = StackNavigationProp<
  TransactionsStackParamList,
  'AddTransaction'
>;

const AddTransactionScreen = () => {
  const navigation = useNavigation<AddTransactionScreenNavigationProp>();
  const { addTransaction, fetchTransactions } = useTransactions();
  const { categories } = useCategories();
  const insets = useSafeAreaInsets();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAmountChange = (value: string) => {
    // Hanya terima angka dan hapus angka 0 di depan kecuali jika hanya angka 0
    const numericValue = value.replace(/[^0-9]/g, '');
    // Hilangkan angka 0 di depan jika ada angka lain
    const formattedValue = numericValue.replace(/^0+(\d)/, '$1');
    setAmount(formattedValue);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSubmit = async () => {
    if (!amount || !selectedCategory || !description) {
      Alert.alert('Error', 'Mohon lengkapi semua field');
      return;
    }

    // Dapatkan nama kategori dari selectedCategory
    const selectedCategoryObj = categories.find(cat => cat.id === selectedCategory);

    const transaction = {
      amount: parseInt(amount),
      description,
      date,
      categoryId: selectedCategory,
      category: selectedCategoryObj?.name || 'Tidak Terkategori',
      type,
    };

    const success = await addTransaction(transaction);
    if (success) {
      navigation.goBack();
    }
  };

  // Meminta izin akses galeri
  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Izin Diperlukan',
        'Aplikasi memerlukan izin untuk mengakses galeri foto Anda untuk menambahkan bukti transaksi.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  // Meminta izin akses kamera
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Izin Diperlukan',
        'Aplikasi memerlukan izin untuk mengakses kamera Anda untuk menambahkan bukti transaksi.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  // Handler untuk memilih gambar dari galeri
  const pickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setReceiptImage(result.assets[0].uri);
    }
  };

  // Handler untuk mengambil gambar dengan kamera
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setReceiptImage(result.assets[0].uri);
    }
  };

  // Pilih sumber gambar
  const selectImageSource = () => {
    Alert.alert(
      'Tambah Bukti Transaksi',
      'Pilih sumber gambar',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Ambil Foto', onPress: takePhoto },
        { text: 'Pilih dari Galeri', onPress: pickImage },
      ]
    );
  };

  // Handler untuk tanggal
  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Validasi form
  const validateForm = () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Masukkan jumlah yang valid');
      return false;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Deskripsi tidak boleh kosong');
      return false;
    }

    if (!selectedCategory) {
      Alert.alert('Error', 'Kategori tidak boleh kosong');
      return false;
    }

    return true;
  };

  // Handler untuk simpan transaksi
  const handleSaveTransaction = async () => {
    // Validasi form
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      console.log('Menyimpan transaksi baru...');
      
      // Dapatkan nama kategori dari selectedCategory
      const selectedCategoryObj = categories.find(cat => cat.id === selectedCategory);
      
      // Siapkan data transaksi
      const transactionData = {
        amount: parseFloat(amount),
        description,
        date,
        categoryId: selectedCategory || '',
        category: selectedCategoryObj?.name || 'Tidak Terkategori',
        type,
      };

      // Simpan transaksi dan dapatkan result
      const transactionResult = await addTransaction(transactionData);
      
      if (!transactionResult) {
        throw new Error('Gagal menambahkan transaksi');
      }
      
      // Simpan nilai yang diperlukan dalam variabel lokal
      const currentTransactionId = transactionResult.id;

      // Jika ada gambar bukti, simpan
      if (receiptImage && currentTransactionId) {
        await saveTransactionReceipt(currentTransactionId, receiptImage);
      }

      console.log('Transaksi berhasil disimpan dengan ID:', currentTransactionId);

      // Reset form
      setAmount('');
      setDescription('');
      setDate(new Date());
      setSelectedCategory(null);
      setReceiptImage(null);

      // Refresh transaksi untuk memastikan data terbaru dimuat
      console.log('Memperbarui data transaksi setelah menambahkan transaksi baru...');
      
      try {
        // Paksa refresh data transaksi
        await fetchTransactions(undefined, 20, true);
        console.log('Data transaksi berhasil diperbarui setelah menambahkan transaksi baru');
      } catch (fetchError) {
        console.error('Gagal memperbarui data transaksi:', fetchError);
      }
      
      // Tampilkan toast sukses
      Toast.show({
        type: 'success',
        text1: 'Transaksi berhasil disimpan',
        text2: `${type === 'income' ? 'Pemasukan' : 'Pengeluaran'} sebesar ${formatCurrency(parseFloat(amount))}`,
        visibilityTime: 2000,
      });
      
      // Kembali ke halaman sebelumnya setelah timeout kecil
      // agar user bisa melihat toast success
      setTimeout(() => {
        navigation.goBack();
      }, 300);
    } catch (error) {
      console.error('Error saving transaction:', error);
      Toast.show({
        type: 'error',
        text1: 'Gagal menyimpan transaksi',
        text2: 'Silakan coba lagi',
        visibilityTime: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render tipe button (pengeluaran/pemasukan)
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.surface}
        translucent={false}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Animated.View
            entering={FadeInDown.delay(300).springify()}
            style={styles.typeSelector}
          >
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'expense' ? styles.activeTypeButton : {}
              ]}
              onPress={() => {
                setType('expense');
              }}
            >
              <Ionicons
                name="arrow-up-circle"
                size={20}
                color={type === 'expense' ? COLORS.white : COLORS.expense.main}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  type === 'expense' ? styles.activeTypeButtonText : {}
                ]}
              >
                Pengeluaran
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'income' ? styles.activeTypeButtonIncome : {}
              ]}
              onPress={() => {
                setType('income');
              }}
            >
              <Ionicons
                name="arrow-down-circle"
                size={20}
                color={type === 'income' ? COLORS.white : COLORS.income.main}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  type === 'income' ? styles.activeTypeButtonText : {}
                ]}
              >
                Pemasukan
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400).springify()}
            style={styles.form}
          >
            {/* Jumlah Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Jumlah</Text>
              <View style={styles.amountInputWrapper}>
                <Text style={styles.currencySymbol}>Rp</Text>
                <TextInput
                  style={[
                    styles.amountInput,
                    amount === "" ? styles.placeholderAmount : {}
                  ]}
                  value={amount}
                  onChangeText={handleAmountChange}
                  keyboardType="numeric"
                  placeholderTextColor={COLORS.neutral[400]}
                  placeholder="0"
                  selection={amount === "0" ? { start: 0, end: 1 } : undefined}
                />
              </View>
            </View>

            {/* Deskripsi Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Deskripsi</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholderTextColor={COLORS.text}
                placeholder="Contoh: Belanja bulanan"
              />
            </View>

            {/* Tanggal Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tanggal</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {format(date, 'd MMMM yyyy', { locale: id })}
                </Text>
                <Ionicons name="calendar" size={20} color={COLORS.text} />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}
            </View>

            {/* Kategori Selector */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Kategori</Text>
              <View style={styles.categoryContainer}>
                {categories
                  .filter(category => category.type === type)
                  .map(category => (
                    <TouchableOpacity
                      key={category.id}
                      style={[
                        styles.categoryItem,
                        selectedCategory === category.id && styles.selectedCategoryItem
                      ]}
                      onPress={() => handleCategorySelect(category.id)}
                    >
                      <View style={styles.categoryIcon}>
                        <Ionicons
                          name={category.icon as any}
                          size={24}
                          color={COLORS.primary.main}
                        />
                      </View>
                      <Text 
                        style={styles.categoryText}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  
                {/* Kategori Lainnya */}
                <TouchableOpacity
                  key="other-category"
                  style={[
                    styles.categoryItem,
                    selectedCategory === "other-category" && styles.selectedCategoryItem
                  ]}
                  onPress={() => handleCategorySelect("other-category")}
                >
                  <View style={styles.categoryIcon}>
                    <Ionicons
                      name="ellipsis-horizontal-circle"
                      size={24}
                      color={COLORS.primary.main}
                    />
                  </View>
                  <Text 
                    style={styles.categoryText}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    Lainnya
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Bukti Transaksi */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Bukti Transaksi (Opsional)</Text>
              <TouchableOpacity
                style={styles.receiptContainer}
                onPress={selectImageSource}
              >
                {receiptImage ? (
                  <>
                    <Image
                      source={{ uri: receiptImage }}
                      style={styles.receiptImage}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => setReceiptImage(null)}
                    >
                      <Ionicons name="close-circle" size={24} color={COLORS.danger[600]} />
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.receiptPlaceholder}>
                    <Ionicons
                      name="camera"
                      size={32}
                      color={COLORS.neutral[400]}
                    />
                    <Text style={styles.receiptPlaceholderText}>
                      Tambahkan Bukti Transaksi
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <Button
              title={isSubmitting ? 'Menyimpan...' : 'Simpan Transaksi'}
              onPress={handleSaveTransaction}
              disabled={isSubmitting}
              style={styles.submitButton}
            />
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeTypeButton: {
    backgroundColor: COLORS.expense.main,
    borderColor: COLORS.expense.main,
  },
  activeTypeButtonIncome: {
    backgroundColor: COLORS.income.main,
    borderColor: COLORS.income.main,
  },
  typeButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.text,
    marginLeft: SPACING.xs,
  },
  activeTypeButtonText: {
    color: COLORS.white,
  },
  form: {
    gap: SPACING.lg,
  },
  inputGroup: {
    gap: SPACING.xs,
  },
  inputLabel: {
    ...TYPOGRAPHY.subtitle2,
    color: COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...TYPOGRAPHY.body1,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
  },
  amountInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
  },
  currencySymbol: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    padding: SPACING.md,
  },
  amountInput: {
    flex: 1,
    padding: SPACING.md,
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  placeholderAmount: {
    fontWeight: 'normal',
    color: COLORS.neutral[400],
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  dateText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  categoryItem: {
    width: '31%',
    alignItems: 'center',
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
    height: 85,
  },
  selectedCategoryItem: {
    borderColor: COLORS.primary.main,
    borderWidth: 2,
  },
  categoryIcon: {
    marginBottom: SPACING.xs,
  },
  categoryText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text,
    textAlign: 'center',
    fontSize: 10,
    width: '100%',
    flexWrap: 'wrap',
  },
  receiptContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    height: 200,
    backgroundColor: COLORS.surface,
    position: 'relative',
  },
  receiptPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiptPlaceholderText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.neutral[500],
    marginTop: SPACING.sm,
  },
  receiptImage: {
    width: '100%',
    height: 200,
    borderRadius: BORDER_RADIUS.md,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
  },
  submitButton: {
    marginTop: SPACING.md,
  },
});

export default AddTransactionScreen;