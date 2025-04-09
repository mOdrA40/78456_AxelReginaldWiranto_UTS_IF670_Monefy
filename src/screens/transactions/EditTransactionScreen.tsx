import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  Dimensions,
  Platform,
  useWindowDimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { TransactionsStackParamList } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import DatePicker from '../../components/pickers/DatePicker';
import CurrencyFormatter from '../../components/formatters/CurrencyFormatter';
import useTransactions from '../../hooks/useTransactions';
import useCategories from '../../hooks/useCategories';

type EditTransactionScreenNavigationProp = StackNavigationProp<
  TransactionsStackParamList,
  'EditTransaction'
>;

type EditTransactionScreenRouteProp = RouteProp<
  TransactionsStackParamList,
  'EditTransaction'
>;

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string | Date;
  categoryId: string;
  type: 'expense' | 'income';
}

const EditTransactionScreen = () => {
  const navigation = useNavigation<EditTransactionScreenNavigationProp>();
  const route = useRoute<EditTransactionScreenRouteProp>();
  const { updateTransaction, loading, getTransactionById, fetchTransactions } = useTransactions();
  const { categories } = useCategories();
  
  // Hook untuk mendapatkan dimensi layar dan insets
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  
  const { transactionId } = route.params;
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("");
  const [type, setType] = useState<'expense' | 'income'>('expense');
  
  // Reset navigation state ketika component unmount
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Jika navigasi ke tab Transactions, reset stack
      const action = e.data.action as { type: string; payload?: { name?: string } };
      if (action.type === 'NAVIGATE' && action.payload?.name === 'Transactions') {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Transactions' }],
          })
        );
      }
    });

    return unsubscribe;
  }, [navigation]);
  
  // Ambil dan isi data transaksi saat komponen dimuat
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const data = await getTransactionById(transactionId);
        if (data) {
          setTransaction(data as Transaction);
          
          // Isi form dengan data yang ada
          if (data.amount) {
            const amountStr = data.amount.toString();
            setAmount(amountStr.replace(/^0+/, '')); // Hapus leading zeros
          }
          
          if (data.description) {
            setDescription(data.description);
          }
          
          if (data.date) {
            setDate(new Date(data.date));
          }
          
          if (data.categoryId) {
            setSelectedCategory(data.categoryId);
          }
          
          if (data.type) {
            setType(data.type as 'expense' | 'income');
          }
        }
      } catch (error) {
        Alert.alert('Error', 'Gagal mengambil data transaksi');
        navigation.goBack();
      }
    };
    
    fetchTransaction();
  }, [transactionId]);
  
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
    
    if (!transactionId) {
      Alert.alert('Error', 'ID transaksi tidak ditemukan');
      return;
    }
    
    try {
      // Dapatkan nama kategori dari selectedCategory
      const selectedCategoryObj = categories.find(cat => cat.id === selectedCategory);
      
      const updatedData = {
        amount: parseInt(amount),
        description,
        date,
        categoryId: selectedCategory,
        category: selectedCategoryObj?.name || 'Tidak Terkategori',
        type,
      };
      
      console.log('Memperbarui transaksi dengan ID:', transactionId, 'Data:', updatedData);
      
      const success = await updateTransaction(transactionId, updatedData);
      
      if (success) {
        // Refresh transaksi setelah sukses update
        try {
          await fetchTransactions(undefined, 20, true);
          console.log('Data transaksi berhasil diperbarui setelah edit transaksi');
        } catch (fetchError) {
          console.error('Gagal memperbarui data transaksi setelah edit:', fetchError);
        }
        
        Toast.show({
          type: 'success',
          text1: 'Sukses',
          text2: 'Transaksi berhasil diperbarui',
          visibilityTime: 2000,
        });
        
        // Kembali ke halaman sebelumnya
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Gagal memperbarui transaksi');
      }
    } catch (error) {
      console.error('Error saat memperbarui transaksi:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat memperbarui transaksi');
    }
  };
  
  // Hitung ukuran kategori berdasarkan lebar layar
  const calculateCategoryWidth = () => {
    const isTablet = dimensions.width >= 768; // Threshold untuk tablet
    const isLandscape = dimensions.width > dimensions.height;
    
    if (isTablet) {
      return isLandscape ? '20%' : '23%'; // 5 atau 4 kolom untuk tablet
    } else {
      return isLandscape ? '23%' : '30%'; // 4 atau 3 kolom untuk handphone
    }
  };
  
  // Hitung padding berdasarkan ukuran layar
  const calculatePadding = () => {
    const isTablet = dimensions.width >= 768;
    return isTablet ? SPACING.xl : SPACING.lg;
  };
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        style={styles.content}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + SPACING.xl }
        ]}
      >
        <Animated.View
          entering={FadeInDown.delay(400).springify()}
          style={[
            styles.form,
            { padding: calculatePadding() }
          ]}
        >
          {/* Tipe Transaksi */}
          <View style={styles.typeContainer}>
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
                  dimensions.width >= 768 && styles.tabletText
                ]}
              >
                Pengeluaran
              </Text>
            </TouchableOpacity>
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
                  dimensions.width >= 768 && styles.tabletText
                ]}
              >
                Pemasukan
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Jumlah */}
          <View>
            <Text style={[
              styles.inputLabel,
              dimensions.width >= 768 && styles.tabletLabel
            ]}>Jumlah</Text>
            <View style={styles.amountInputWrapper}>
              <Text style={[
                styles.currencySymbol,
                dimensions.width >= 768 && styles.tabletCurrencySymbol
              ]}>Rp</Text>
              <TextInput
                style={[
                  styles.amountInput,
                  amount === "" ? styles.placeholderAmount : {},
                  dimensions.width >= 768 && styles.tabletInput
                ]}
                value={amount}
                onChangeText={handleAmountChange}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={COLORS.neutral[400]}
                selection={amount === "0" ? { start: 0, end: 1 } : undefined}
              />
            </View>
          </View>
          
          {/* Deskripsi */}
          <Input
            label="Deskripsi"
            value={description}
            onChangeText={setDescription}
            placeholder="Contoh: Makan siang, Gaji bulanan"
            inputStyle={dimensions.width >= 768 ? styles.tabletInput : undefined}
            labelStyle={dimensions.width >= 768 ? styles.tabletLabel : undefined}
          />
          
          {/* Tanggal */}
          <View style={dimensions.width >= 768 ? styles.tabletDatePickerContainer : styles.datePickerContainer}>
            <DatePicker
              label="Tanggal"
              value={date}
              onChange={setDate}
            />
          </View>
          
          {/* Kategori */}
          <View style={styles.categoriesContainer}>
            <Text style={[
              styles.categoriesLabel,
              dimensions.width >= 768 && styles.tabletLabel
            ]}>Kategori</Text>
            <View style={styles.categoriesList}>
              {categories
                .filter(category => category.type === type)
                .map(category => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryButton,
                      { width: calculateCategoryWidth() },
                      dimensions.width >= 768 && styles.tabletCategoryButton,
                      selectedCategory === category.id && styles.categoryButtonActive,
                    ]}
                    onPress={() => handleCategorySelect(category.id)}
                  >
                    <Ionicons
                      name={category.icon as any}
                      size={dimensions.width >= 768 ? 32 : 24}
                      color={
                        selectedCategory === category.id
                          ? COLORS.primary.contrast
                          : COLORS.text
                      }
                    />
                    <Text
                      style={[
                        styles.categoryButtonText,
                        dimensions.width >= 768 && styles.tabletCategoryText,
                        selectedCategory === category.id && styles.categoryButtonTextActive,
                      ]}
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
                  styles.categoryButton,
                  { width: calculateCategoryWidth() },
                  dimensions.width >= 768 && styles.tabletCategoryButton,
                  selectedCategory === "other-category" && styles.categoryButtonActive,
                ]}
                onPress={() => handleCategorySelect("other-category")}
              >
                <Ionicons
                  name="ellipsis-horizontal-circle"
                  size={dimensions.width >= 768 ? 32 : 24}
                  color={
                    selectedCategory === "other-category"
                      ? COLORS.primary.contrast
                      : COLORS.text
                  }
                />
                <Text
                  style={[
                    styles.categoryButtonText,
                    dimensions.width >= 768 && styles.tabletCategoryText,
                    selectedCategory === "other-category" && styles.categoryButtonTextActive,
                  ]}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  Lainnya
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <Button
            title={loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            onPress={handleSubmit}
            disabled={loading}
            style={[
              styles.submitButton,
              dimensions.width >= 768 && styles.tabletSubmitButton
            ]}
            textStyle={dimensions.width >= 768 ? styles.tabletButtonText : undefined}
          />
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  form: {
    padding: SPACING.lg,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  typeButton: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: 5,
  },
  typeButtonActive: {
    backgroundColor: COLORS.primary.main,
  },
  typeButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.text,
  },
  typeButtonTextActive: {
    color: COLORS.white,
  },
  inputLabel: {
    ...TYPOGRAPHY.subtitle2,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  currencyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  amountPrefix: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginRight: SPACING.xs,
  },
  amountInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.md,
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
  categoriesContainer: {
    marginTop: SPACING.md,
  },
  categoriesLabel: {
    ...TYPOGRAPHY.subtitle2,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  categoryButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: '30%',
    height: 85,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary.main,
    borderColor: COLORS.primary.main,
  },
  categoryButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text,
    marginTop: 5,
    textAlign: 'center',
    fontSize: 10,
    width: '100%',
    flexWrap: 'wrap',
  },
  categoryButtonTextActive: {
    color: COLORS.primary.contrast,
  },
  submitButton: {
    marginTop: SPACING.xl,
  },
  // Styles for responsive tablet/larger screens
  tabletText: {
    fontSize: 16,
  },
  tabletLabel: {
    fontSize: 18,
  },
  tabletInput: {
    fontSize: 20,
  },
  tabletCurrencySymbol: {
    fontSize: 24,
    padding: SPACING.md,
  },
  tabletCategoryButton: {
    height: 100,
    padding: SPACING.md,
  },
  tabletCategoryText: {
    fontSize: 14,
    marginTop: 8,
  },
  tabletSubmitButton: {
    marginTop: SPACING.xl * 1.5,
    paddingVertical: SPACING.md,
  },
  tabletButtonText: {
    fontSize: 18,
  },
  tabletDatePickerContainer: {
    marginTop: SPACING.md,
  },
  datePickerContainer: {
    marginTop: SPACING.md,
  },
});

export default EditTransactionScreen; 