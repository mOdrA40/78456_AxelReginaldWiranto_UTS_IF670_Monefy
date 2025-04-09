import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
  Modal,
  StatusBar,
  Platform,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Timestamp } from 'firebase/firestore';

import { TransactionsStackParamList } from '../../navigation/types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import Button from '../../components/common/Button';
import CurrencyFormatter from '../../components/formatters/CurrencyFormatter';
import useTransactions from '../../hooks/transactions/useTransactions';
import { getTransactionReceipt, deleteTransactionReceipt } from '../../utils/imageStorage';
import { Transaction } from '../../types';
import { formatCurrency, formatResponsiveCurrency } from '../../utils/formatters';

type TransactionDetailScreenNavigationProp = StackNavigationProp<
  TransactionsStackParamList,
  'TransactionDetail'
>;

type TransactionDetailScreenRouteProp = RouteProp<
  TransactionsStackParamList,
  'TransactionDetail'
>;

// Definisikan tipe untuk parameter route
type TransactionDetailParams = {
  TransactionDetail: {
    transactionId: string;
  };
};

const TransactionDetailScreen = () => {
  const navigation = useNavigation<TransactionDetailScreenNavigationProp>();
  const route = useRoute<RouteProp<TransactionDetailParams, 'TransactionDetail'>>();
  const { transactionId } = route.params;
  const insets = useSafeAreaInsets();
  
  // Get screen dimensions for responsive design
  const dimensions = useWindowDimensions();
  const isTablet = dimensions.width >= 768;
  const isLandscape = dimensions.width > dimensions.height;

  const {
    transactions,
    loading,
    error,
    formatCurrency,
    deleteTransaction,
    getTransactionById
  } = useTransactions();

  const [transaction, setTransaction] = useState<Transaction | null | undefined>(undefined);
  const [receiptUri, setReceiptUri] = useState<string | null>(null);
  const [receiptLoading, setReceiptLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);

  // Calculate responsive values
  const getResponsiveFontSize = (size: number) => {
    return isTablet ? size * 1.2 : size;
  };
  
  const getResponsiveSpacing = (spacing: number) => {
    return isTablet ? spacing * 1.3 : spacing;
  };
  
  const getResponsiveIconSize = (size: number) => {
    return isTablet ? size * 1.3 : size;
  };

  // Ambil data transaksi
  useEffect(() => {
    let isMounted = true;
    let isDeleted = false; // Flag untuk menandai transaksi yang dihapus
    
    const fetchTransactionData = async () => {
      if (isDeleted) return; // Jangan coba ambil data lagi jika transaksi sudah dihapus
      
      setLocalLoading(true);
      setLocalError(null);
      
      try {
        // Coba ambil dari state dulu
        let foundTransaction: Transaction | null = transactions.find(t => t.id === transactionId) || null;
        
        // Jika tidak ditemukan, coba ambil langsung dari database
        if (!foundTransaction) {
          foundTransaction = await getTransactionById(transactionId);
        }
        
        if (foundTransaction && isMounted) {
          setTransaction(foundTransaction);
          loadReceipt(foundTransaction.id);
        } else if (isMounted) {
          setLocalError('Transaksi tidak ditemukan');
        }
      } catch (error) {
        console.error('Error getting transaction:', error);
        if (isMounted) {
          // Periksa apakah error disebabkan oleh masalah izin (transaksi mungkin sudah dihapus)
          const errorMessage = error instanceof Error ? error.toString() : String(error);
          if (errorMessage.includes('Missing or insufficient permissions')) {
            setLocalError('Transaksi tidak dapat diakses atau sudah dihapus');
            isDeleted = true; // Tandai transaksi sebagai sudah dihapus
          } else {
            setLocalError('Terjadi kesalahan saat mengambil data transaksi');
          }
        }
      } finally {
        if (isMounted) {
          setLocalLoading(false);
        }
      }
    };
    
    fetchTransactionData();
    
    return () => {
      isMounted = false;
    };
  }, [transactionId, transactions, getTransactionById]);

  // Load bukti transaksi
  const loadReceipt = async (id: string) => {
    setReceiptLoading(true);
    try {
      const uri = await getTransactionReceipt(id);
      setReceiptUri(uri);
    } catch (error) {
      console.error('Error loading receipt:', error);
    } finally {
      setReceiptLoading(false);
    }
  };

  // Handler untuk menghapus transaksi
  const handleDeleteTransaction = () => {
    Alert.alert(
      'Hapus Transaksi',
      'Apakah Anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan.',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: confirmDelete },
      ]
    );
  };

  // Konfirmasi penghapusan transaksi
  const confirmDelete = async () => {
    if (!transaction) return;

    setDeleteLoading(true);
    try {
      console.log('Memulai proses penghapusan transaksi:', transaction.id);
      
      // Hapus bukti transaksi jika ada
      if (receiptUri) {
        try {
          await deleteTransactionReceipt(transaction.id);
          console.log('Bukti transaksi berhasil dihapus');
        } catch (receiptError) {
          console.error('Gagal menghapus bukti transaksi:', receiptError);
          // Lanjutkan proses meskipun gagal menghapus bukti
        }
      }

      // Hapus transaksi
      const success = await deleteTransaction(transaction.id);
      
      if (success) {
        console.log('Transaksi berhasil dihapus, kembali ke halaman sebelumnya');
        
        // Tampilkan pesan sukses
        Alert.alert(
          'Sukses',
          'Transaksi berhasil dihapus',
          [{ text: 'OK' }],
          { cancelable: false }
        );
        
        // Kembali ke layar sebelumnya
        navigation.goBack();
      } else {
        throw new Error('Gagal menghapus transaksi');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      Alert.alert(
        'Error',
        'Gagal menghapus transaksi. Silakan coba lagi.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // Handler untuk edit transaksi
  const handleEditTransaction = () => {
    if (!transaction) return;
    navigation.navigate('EditTransaction', { transactionId: transaction.id });
  };

  // Jika loading atau error
  if (loading || localLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary.main} />
        <Text style={styles.loadingText}>Memuat transaksi...</Text>
      </View>
    );
  }

  if (error || localError || !transaction) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={48} color={COLORS.danger[500]} />
        <Text style={styles.errorText}>
          {error || localError || 'Transaksi tidak ditemukan'}
        </Text>
        <Button
          title="Kembali"
          onPress={() => navigation.goBack()}
          style={styles.errorButton}
        />
      </View>
    );
  }

  // Render bukti transaksi modal
  const renderReceiptModal = () => (
    <Modal
      visible={showReceipt}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowReceipt(false)}
    >
      <View style={styles.modalContainer}>
        <View style={[
          styles.modalContent,
          isTablet && styles.tabletModalContent
        ]}>
          <View style={styles.modalHeader}>
            <Text style={[
              styles.modalTitle,
              isTablet && styles.tabletModalTitle
            ]}>Bukti Transaksi</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowReceipt(false)}
            >
              <Ionicons 
                name="close" 
                size={getResponsiveIconSize(24)} 
                color={COLORS.text} 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.receiptImageContainer}>
            {receiptUri ? (
              <Image
                source={{ uri: receiptUri }}
                style={styles.fullReceiptImage}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.noReceiptContainer}>
                <Ionicons 
                  name="image-outline" 
                  size={getResponsiveIconSize(64)} 
                  color={COLORS.textSecondary} 
                />
                <Text style={[
                  styles.noReceiptText,
                  isTablet && styles.tabletNoReceiptText
                ]}>Tidak ada bukti transaksi</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.surface}
        translucent={false}
      />
      <ScrollView 
        style={styles.content}
        contentContainerStyle={[
          isTablet && styles.tabletContentContainer
        ]}
      >
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          style={[
            styles.typeIndicator,
            { backgroundColor: transaction.type === 'income' ? COLORS.income.main : COLORS.expense.main },
            isTablet && styles.tabletTypeIndicator
          ]}
        >
          <Ionicons
            name={transaction.type === 'income' ? 'arrow-down-circle' : 'arrow-up-circle'}
            size={getResponsiveIconSize(24)}
            color={COLORS.white}
          />
          <Text style={[
            styles.typeText,
            isTablet && styles.tabletTypeText
          ]}>
            {transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={[
            styles.amountContainer,
            isTablet && styles.tabletAmountContainer
          ]}
        >
          <Text style={[
            styles.amountLabel,
            isTablet && styles.tabletAmountLabel
          ]}>Jumlah</Text>
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => {
              if (transaction) {
                Alert.alert(
                  'Detail Jumlah',
                  `Nilai sebenarnya: ${formatCurrency(transaction.amount)}`,
                  [{ text: 'OK', onPress: () => {} }]
                );
              }
            }}
          >
            <Text 
              style={[
                styles.amount,
                { color: transaction.type === 'income' ? COLORS.income.main : COLORS.expense.main },
                isTablet && styles.tabletAmount
              ]}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {formatResponsiveCurrency(transaction.amount, false, 100000)}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          style={[
            styles.detailsCard,
            isTablet && styles.tabletDetailsCard
          ]}
        >
          <View style={styles.detailRow}>
            <Text style={[
              styles.detailLabel,
              isTablet && styles.tabletDetailLabel
            ]}>Deskripsi</Text>
            <Text style={[
              styles.detailValue,
              isTablet && styles.tabletDetailValue
            ]}>{transaction.description}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[
              styles.detailLabel,
              isTablet && styles.tabletDetailLabel
            ]}>Kategori</Text>
            <Text style={[
              styles.detailValue,
              isTablet && styles.tabletDetailValue
            ]}>{transaction.category}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[
              styles.detailLabel,
              isTablet && styles.tabletDetailLabel
            ]}>Tanggal</Text>
            <Text style={[
              styles.detailValue,
              isTablet && styles.tabletDetailValue
            ]}>
              {isTimestamp(transaction.date) ? format(transaction.date.toDate(), 'd MMMM yyyy', { locale: id }) : 
              transaction.date instanceof Date ? format(transaction.date, 'd MMMM yyyy', { locale: id }) : 
              format(new Date(transaction.date), 'd MMMM yyyy', { locale: id })}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[
              styles.detailLabel,
              isTablet && styles.tabletDetailLabel
            ]}>Dibuat pada</Text>
            <Text style={[
              styles.detailValue,
              isTablet && styles.tabletDetailValue
            ]}>
              {isTimestamp(transaction.createdAt) ? format(transaction.createdAt.toDate(), 'd MMMM yyyy, HH:mm', { locale: id }) : 
              transaction.createdAt instanceof Date ? format(transaction.createdAt, 'd MMMM yyyy, HH:mm', { locale: id }) : 
              format(new Date(transaction.createdAt), 'd MMMM yyyy, HH:mm', { locale: id })}
            </Text>
          </View>

          {transaction.updatedAt && transaction.updatedAt !== transaction.createdAt && (
            <View style={styles.detailRow}>
              <Text style={[
                styles.detailLabel,
                isTablet && styles.tabletDetailLabel
              ]}>Diperbarui pada</Text>
              <Text style={[
                styles.detailValue,
                isTablet && styles.tabletDetailValue
              ]}>
                {isTimestamp(transaction.updatedAt) ? format(transaction.updatedAt.toDate(), 'd MMMM yyyy, HH:mm', { locale: id }) : 
                transaction.updatedAt instanceof Date ? format(transaction.updatedAt, 'd MMMM yyyy, HH:mm', { locale: id }) : 
                format(new Date(transaction.updatedAt), 'd MMMM yyyy, HH:mm', { locale: id })}
              </Text>
            </View>
          )}
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).springify()}
          style={[
            styles.receiptCard,
            isTablet && styles.tabletReceiptCard
          ]}
        >
          <Text style={[
            styles.receiptTitle,
            isTablet && styles.tabletReceiptTitle
          ]}>Bukti Transaksi</Text>

          {receiptLoading ? (
            <View style={styles.receiptLoading}>
              <ActivityIndicator size={isTablet ? "large" : "small"} color={COLORS.primary.main} />
              <Text style={[
                styles.receiptLoadingText,
                isTablet && styles.tabletText
              ]}>Memuat bukti transaksi...</Text>
            </View>
          ) : receiptUri ? (
            <TouchableOpacity
              style={[
                styles.receiptPreview,
                isTablet && styles.tabletReceiptPreview
              ]}
              onPress={() => setShowReceipt(true)}
            >
              <Image source={{ uri: receiptUri }} style={styles.receiptImage} />
              <View style={[
                styles.viewReceiptButton,
                isTablet && styles.tabletViewReceiptButton
              ]}>
                <Ionicons name="eye" size={getResponsiveIconSize(16)} color={COLORS.white} />
                <Text style={[
                  styles.viewReceiptText,
                  isTablet && styles.tabletViewReceiptText
                ]}>Lihat Bukti</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.noReceipt}>
              <Ionicons name="receipt-outline" size={getResponsiveIconSize(36)} color={COLORS.textSecondary} />
              <Text style={[
                styles.noReceiptText,
                isTablet && styles.tabletNoReceiptText
              ]}>Tidak ada bukti transaksi</Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      <Animated.View
        entering={FadeIn.delay(500)}
        style={[
          styles.footer,
          isTablet && styles.tabletFooter
        ]}
      >
        <TouchableOpacity
          style={[
            styles.editButton,
            isTablet && styles.tabletEditButton
          ]}
          onPress={handleEditTransaction}
          disabled={deleteLoading}
        >
          <Ionicons name="pencil" size={getResponsiveIconSize(20)} color={COLORS.primary.main} />
          <Text style={[
            styles.editButtonText,
            isTablet && styles.tabletButtonText
          ]}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.deleteButton,
            isTablet && styles.tabletDeleteButton
          ]}
          onPress={handleDeleteTransaction}
          disabled={deleteLoading}
        >
          {deleteLoading ? (
            <ActivityIndicator size={isTablet ? "large" : "small"} color={COLORS.white} />
          ) : (
            <>
              <Ionicons name="trash" size={getResponsiveIconSize(20)} color={COLORS.white} />
              <Text style={[
                styles.deleteButtonText,
                isTablet && styles.tabletButtonText
              ]}>Hapus</Text>
            </>
          )}
        </TouchableOpacity>
      </Animated.View>

      {renderReceiptModal()}
    </View>
  );
};

const isTimestamp = (date: any): date is Timestamp => {
  return date instanceof Timestamp;
}

const { width } = Dimensions.get('window');
const isTabletStatic = width >= 768;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  errorText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.danger[600],
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  errorButton: {
    marginTop: SPACING.lg,
  },
  typeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
  },
  typeText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
    marginLeft: SPACING.xs,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  amountLabel: {
    ...TYPOGRAPHY.subtitle2,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  amount: {
    ...TYPOGRAPHY.h1,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
  },
  detailsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.sm,
    marginBottom: SPACING.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  detailLabel: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
  },
  detailValue: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    textAlign: 'right',
    flex: 1,
    marginLeft: SPACING.lg,
  },
  receiptCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.sm,
    marginBottom: SPACING.xl * 1.5, // Menambahkan margin bottom yang lebih besar
  },
  receiptTitle: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  receiptLoading: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  receiptLoadingText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
  receiptPreview: {
    height: 200,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    position: 'relative',
  },
  receiptImage: {
    width: '100%',
    height: '100%',
  },
  viewReceiptButton: {
    position: 'absolute',
    bottom: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.primary.main + 'CC', // semi-transparent
    borderRadius: BORDER_RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  viewReceiptText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    marginLeft: SPACING.xs,
  },
  noReceipt: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
  },
  noReceiptText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? 24 + SPACING.md : SPACING.lg, // Menggunakan nilai tetap untuk padding bottom
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary.main,
    marginRight: SPACING.sm,
  },
  editButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.primary.main,
    marginLeft: SPACING.xs,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.danger[600],
    marginLeft: SPACING.sm,
  },
  deleteButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
    marginLeft: SPACING.xs,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.lg,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.text,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  receiptImageContainer: {
    height: 400,
  },
  fullReceiptImage: {
    width: '100%',
    height: '100%',
  },
  noReceiptContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Tablet styles
  tabletContentContainer: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
    paddingBottom: SPACING.xl * 2,
  },
  tabletTypeIndicator: {
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
  },
  tabletTypeText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    marginLeft: SPACING.md,
  },
  tabletAmountContainer: {
    padding: SPACING.xl,
    marginVertical: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
  },
  tabletAmountLabel: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    marginBottom: SPACING.md,
  },
  tabletAmount: {
    fontSize: TYPOGRAPHY.fontSize.xxxl + 8,
  },
  tabletDetailsCard: {
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.xl,
  },
  tabletDetailLabel: {
    fontSize: TYPOGRAPHY.fontSize.md,
    marginBottom: SPACING.xs,
  },
  tabletDetailValue: {
    fontSize: TYPOGRAPHY.fontSize.lg,
  },
  tabletReceiptCard: {
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.xl,
  },
  tabletReceiptTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    marginBottom: SPACING.md,
  },
  tabletReceiptPreview: {
    height: 250,
  },
  tabletViewReceiptButton: {
    padding: SPACING.md,
  },
  tabletViewReceiptText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    marginLeft: SPACING.sm,
  },
  tabletNoReceiptText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    marginTop: SPACING.md,
  },
  tabletFooter: {
    padding: SPACING.xl,
    paddingBottom: SPACING.xl + 8,
  },
  tabletEditButton: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  tabletDeleteButton: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  tabletButtonText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    marginLeft: SPACING.sm,
  },
  tabletModalContent: {
    width: '90%',
    maxWidth: 650,
    borderRadius: BORDER_RADIUS.xl,
  },
  tabletModalTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
  },
  tabletText: {
    fontSize: TYPOGRAPHY.fontSize.md,
  },
});

export default TransactionDetailScreen;