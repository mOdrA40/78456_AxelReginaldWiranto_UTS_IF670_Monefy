import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Platform,
  StatusBar,
  Dimensions,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  SlideInDown,
  SlideOutDown
} from 'react-native-reanimated';
import { StackNavigationProp } from '@react-navigation/stack';

// Import komponen dan hooks
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '../../constants/theme';
import useTransactions from '../../hooks/useTransactions';
import { formatCurrency, formatResponsiveCurrency } from '../../utils/formatters';
import { Transaction, TransactionType } from '../../types';
import { TransactionsStackParamList } from '../../types';
import useCategories from '../../hooks/useCategories';

// Tipe filters
interface TransactionFilter {
  type?: TransactionType;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
  searchQuery?: string;
}

// Konstanta untuk tinggi status bar
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;
const HEADER_MARGIN_TOP = Platform.OS === 'ios' ? 50 : 70;

type TransactionsListScreenNavigationProp = StackNavigationProp<
  TransactionsStackParamList,
  'TransactionsList'
>;

/**
 * Custom StatusBar wrapper
 */
const CustomStatusBar = () => {
  return (
    <View style={{
      height: StatusBar.currentHeight,
      backgroundColor: 'white',
    }}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        translucent={false}
      />
    </View>
  );
};

/**
 * Screen untuk menampilkan daftar transaksi
 */
const TransactionsListScreen: React.FC = () => {
  const navigation = useNavigation<any>(); // Menggunakan any untuk menghindari error tipe
  const route = useRoute<any>(); // Menggunakan any untuk menghindari error tipe
  const insets = useSafeAreaInsets();
  
  // Ekstrak parameter forceRefresh dan timestamp dari route params jika ada
  const params = route.params || {};
  const shouldForceRefresh = params.forceRefresh || false;
  const timestamp = params.timestamp || 0;

  const {
    transactions,
    loading,
    error,
    fetchTransactions,
    fetchMoreTransactions,
    hasMore,
    isInitialized
  } = useTransactions();

  // Import useCategories hook dan gunakan untuk mendapatkan daftar kategori
  const { categories } = useCategories();

  // State
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState<TransactionFilter>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState<TransactionType | undefined>(undefined);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Gunakan nilai insets untuk menentukan margin atas yang tepat
  const headerTopMargin = insets.top > 0 ? insets.top + 10 : HEADER_MARGIN_TOP;

  // Get screen dimensions for responsive design
  const dimensions = useWindowDimensions();
  const isTablet = dimensions.width >= 768;
  const isLandscape = dimensions.width > dimensions.height;

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

  // Load transaksi saat komponen mount atau saat parameter timestamp berubah
  useEffect(() => {
    console.log('TransactionsListScreen mounted atau timestamp berubah:', timestamp);
    
    // Jika ada parameter forceRefresh atau timestamp baru, paksa refresh data
    if (shouldForceRefresh || timestamp > 0) {
      setForceRefresh(true);
      console.log('Memuat ulang data transaksi karena forceRefresh atau timestamp baru');
      
      fetchTransactions(undefined, 20, true)
        .then((result) => {
          console.log('Data transaksi berhasil dimuat pada mount dengan forceRefresh, jumlah:', result.length);
          setForceRefresh(false);
          
          // Reset parameter forceRefresh setelah digunakan
          try {
            navigation.setParams({ forceRefresh: false, timestamp: 0 });
          } catch (error) {
            console.log('Tidak dapat mengatur params:', error);
          }
        })
        .catch(err => {
          console.error('Gagal memuat data transaksi pada mount:', err);
          setForceRefresh(false);
        });
    } else {
      fetchTransactions();
    }
  }, [shouldForceRefresh, timestamp, fetchTransactions, navigation]);

  // Refresh data saat screen mendapatkan fokus
  useFocusEffect(
    useCallback(() => {
      console.log('TransactionsScreen mendapat fokus, menyegarkan data...');
      
      // Set loading state jika tidak ada data
      if (transactions.length === 0) {
        setForceRefresh(true);
      }
      
      // Refresh data transaksi saat screen mendapatkan fokus
      fetchTransactions(undefined, 20, true)
        .then((result) => {
          console.log('Data transaksi berhasil diperbarui setelah layar mendapat fokus, jumlah:', result.length);
          setForceRefresh(false);
          setLocalError(null);
          
          // Terapkan filter jika ada
          if (Object.keys(filters).length > 0 || searchQuery) {
            handleApplyFilters();
          }
        })
        .catch(err => {
          console.error('Gagal memperbarui data transaksi:', err);
          setForceRefresh(false);
          setLocalError('Gagal memuat data transaksi');
        });
      
      return () => {
        // Cleanup saat screen kehilangan fokus
      };
    }, [fetchTransactions, transactions.length])
  );

  // Efek untuk memfilter transaksi
  useEffect(() => {
    if (transactions.length > 0) {
      console.log('Menerapkan filter pada', transactions.length, 'transaksi');
      handleApplyFilters();
    } else {
      setFilteredTransactions([]);
    }
  }, [transactions, filters, searchQuery]);

  // Handler untuk refresh
  const handleRefresh = useCallback(async () => {
    if (loading) return;
    
    setRefreshing(true);
    console.log('Memuat ulang data transaksi dengan pull-to-refresh...');
    
    try {
      const result = await fetchTransactions(undefined, 20, true);
      console.log('Data transaksi berhasil dimuat ulang, jumlah:', result.length);
      setLocalError(null);
      
      // Terapkan filter jika ada
      if (Object.keys(filters).length > 0 || searchQuery) {
        handleApplyFilters();
      }
    } catch (error) {
      console.error('Error refreshing transactions:', error);
      setLocalError('Gagal memuat data transaksi');
    } finally {
      setRefreshing(false);
    }
  }, [fetchTransactions, loading, filters, searchQuery]);

  // Handler untuk retry saat error
  const handleRetry = () => {
    // Set loading state
    setForceRefresh(true);
    setLocalError(null);
    
    console.log('Mencoba memuat ulang data transaksi...');
    
    // Gunakan timeout untuk memastikan UI diperbarui sebelum fetch
    setTimeout(() => {
      // Paksa refresh data dari server
      fetchTransactions(undefined, 20, true)
        .then((result) => {
          console.log('Berhasil memuat ulang data transaksi dari retry, jumlah:', result.length);
          setForceRefresh(false);
          
          // Terapkan filter jika ada
          if (Object.keys(filters).length > 0 || searchQuery) {
            handleApplyFilters();
          }
        })
        .catch(err => {
          console.error('Error retrying to fetch transactions:', err);
          setForceRefresh(false);
          setLocalError('Gagal memuat data transaksi');
        });
    }, 100);
  };

  // Handler untuk menerapkan filter
  const handleApplyFilters = useCallback(() => {
    console.log('Menerapkan filter pada transaksi...');
    
    // Terapkan filter
    let filtered = [...transactions];
    
    // Filter berdasarkan tipe (income/expense)
    if (filters.type) {
      filtered = filtered.filter(t => t.type === filters.type);
    }
    
    // Filter berdasarkan pencarian
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.description?.toLowerCase().includes(query) || 
        t.category?.toLowerCase().includes(query)
      );
    }
    
    console.log('Hasil filter:', filtered.length, 'dari', transactions.length, 'transaksi');
    setFilteredTransactions(filtered);
    setShowFilters(false);
  }, [transactions, filters, searchQuery]);

  // Handler untuk load more (infinite scrolling)
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchMoreTransactions(filters);
    }
  };

  // Handler untuk filter berdasarkan tipe
  const handleFilterByType = (type?: TransactionType) => {
    const newFilters = { ...filters };

    if (type) {
      newFilters.type = type;
      setActiveFilter(type);
    } else {
      delete newFilters.type;
      setActiveFilter(undefined);
    }

    setFilters(newFilters);
    fetchTransactions(newFilters, 20, true);
  };

  // Handler untuk search
  const handleSearch = () => {
    const newFilters = {
      ...filters,
      searchQuery: searchQuery.trim() || undefined
    };

    setFilters(newFilters);
    fetchTransactions(newFilters, 20, true);
  };

  // Handler untuk clear
  const handleClearSearch = () => {
    setSearchQuery('');

    const newFilters = { ...filters };
    delete newFilters.searchQuery;

    setFilters(newFilters);
    fetchTransactions(newFilters, 20, true);
  };

  // Handler untuk navigasi ke detail transaksi
  const handleTransactionPress = (transactionId: string) => {
    navigation.navigate('TransactionDetail', { transactionId });
  };

  // Handler untuk navigasi ke halaman tambah transaksi
  const handleAddTransaction = () => {
    navigation.navigate('AddTransaction');
  };

  // Render footer (loading indicator)
  const renderFooter = () => {
    if (!loading || refreshing) return null;

    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" color={COLORS.primary.main} />
        <Text style={styles.footerText}>Memuat transaksi...</Text>
      </View>
    );
  };

  // Render item transaksi
  const renderTransactionItem = ({ item, index }: { item: Transaction, index: number }) => {
    // Extract showFullAmount function
    const showFullAmount = (amount: number) => {
      return (item.type === 'income' ? '+' : '-') + ' ' + formatCurrency(amount);
    };
    
    // Modify the component to be responsive
    return (
      <Animated.View
        entering={FadeInDown.delay(index * 50).springify()}
        style={[
          styles.transactionItem,
          isTablet && styles.tabletTransactionItem
        ]}
      >
        <View style={styles.transactionIconContainer}>
          <View
            style={[
              styles.transactionIcon,
              {
                backgroundColor:
                  item.type === 'income'
                    ? `${COLORS.income.main}20`
                    : `${COLORS.expense.main}20`,
                width: isTablet ? 50 : 40,
                height: isTablet ? 50 : 40,
                borderRadius: isTablet ? 25 : 20,
              }
            ]}
          >
            <Ionicons
              name={
                item.type === 'income'
                  ? 'arrow-down-outline'
                  : 'arrow-up-outline'
              }
              size={getResponsiveIconSize(24)}
              color={
                item.type === 'income'
                  ? COLORS.income.main
                  : COLORS.expense.main
              }
            />
          </View>
        </View>

        <View style={styles.transactionDetails}>
          <Text 
            style={[
              styles.transactionCategory,
              isTablet && styles.tabletTransactionCategory
            ]}
            numberOfLines={1}
          >
            {/* Akses kategori dengan aman berdasarkan data yang ada */}
            {item.categoryId ? 
              categories.find((c: {id: string, name: string}) => c.id === item.categoryId)?.name || 'Kategori Lain' : 
              'Kategori Lain'}
          </Text>
          
          {item.description ? (
            <Text 
              style={[
                styles.transactionDescription,
                isTablet && styles.tabletTransactionDescription
              ]}
              numberOfLines={1}
            >
              {item.description}
            </Text>
          ) : null}
          
          <Text 
            style={[
              styles.transactionDate,
              isTablet && styles.tabletTransactionDate
            ]}
          >
            {/* Format tanggal sebagai string yang dapat dibaca */}
            {new Date(item.date).toLocaleDateString('id-ID')}
          </Text>
        </View>

        <View style={styles.transactionAmountContainer}>
          <Text
            style={[
              styles.transactionAmount,
              {
                color:
                  item.type === 'income'
                    ? COLORS.income.main
                    : COLORS.expense.main,
              },
              isTablet && styles.tabletTransactionAmount
            ]}
          >
            {showFullAmount(item.amount)}
          </Text>
        </View>
      </Animated.View>
    );
  };

  // Render ketika tidak ada transaksi
  const renderEmptyList = () => {
    // Loading state
    if ((loading && !refreshing) || forceRefresh) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={COLORS.primary.main} />
          <Text style={styles.emptyText}>Memuat transaksi...</Text>
        </View>
      );
    }

    // Error state
    if (error || localError) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={64}
            color={COLORS.expense.main}
          />
          <Text style={styles.emptyText}>Gagal memuat transaksi</Text>
          <Text style={styles.errorSubtext}>
            Periksa koneksi internet dan coba lagi
          </Text>
          <Button
            title="Coba Lagi"
            size="small"
            onPress={() => handleRetry()}
            style={styles.retryButton}
          />
        </View>
      );
    }

    // Empty state
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="wallet-outline"
          size={64}
          color={COLORS.neutral[400]}
        />
        <Text style={styles.emptyText}>
          {activeFilter
            ? `Belum ada transaksi ${activeFilter === 'income' ? 'pemasukan' : 'pengeluaran'}`
            : 'Belum ada transaksi'
          }
        </Text>
        <Button
          title="Tambah Transaksi"
          size="small"
          onPress={handleAddTransaction}
          style={styles.addButton}
        />
      </View>
    );
  };

  return (
    <View style={styles.rootContainer}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <View style={[
        styles.absoluteHeader, 
        { top: headerTopMargin },
        isTablet && styles.tabletHeader
      ]}>
        <Text style={[
          styles.headerTitle,
          isTablet && styles.tabletHeaderTitle
        ]}>
          Transaksi
        </Text>

        {!showFilters && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons
              name="options-outline"
              size={getResponsiveIconSize(24)}
              color={COLORS.neutral[700]}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Search Bar */}
      {showFilters && (
        <Animated.View
          style={[
            styles.searchContainer, 
            { 
              marginTop: headerTopMargin + 60,
              paddingHorizontal: getResponsiveSpacing(SPACING.lg)
            },
            isTablet && styles.tabletSearchContainer
          ]}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <View style={styles.searchInputContainer}>
            <Ionicons
              name="search"
              size={20}
              color={COLORS.neutral[400]}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari transaksi..."
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                // Jika text kosong, reset filter pencarian
                if (!text) {
                  handleApplyFilters();
                }
              }}
              onSubmitEditing={handleApplyFilters}
              returnKeyType="search"
            />
            {searchQuery ? (
              <TouchableOpacity
                onPress={() => {
                  setSearchQuery('');
                  handleApplyFilters();
                }}
              >
                <Ionicons name="close-circle" size={20} color={COLORS.neutral[400]} />
              </TouchableOpacity>
            ) : null}
          </View>

          <TouchableOpacity
            style={styles.closeFiltersButton}
            onPress={() => setShowFilters(false)}
          >
            <Ionicons
              name="close"
              size={24}
              color={COLORS.neutral[700]}
            />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Filter Buttons */}
      {showFilters && (
        <Animated.View
          style={[styles.filterButtonsContainer, { marginTop: headerTopMargin + 120 }]}
          entering={FadeIn.delay(100)}
          exiting={FadeOut}
        >
          <View style={styles.filterButtonsContent}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === undefined && styles.activeFilterButton
              ]}
              onPress={() => handleFilterByType(undefined)}
            >
              <Text style={[
                styles.filterButtonText,
                activeFilter === undefined && styles.activeFilterButtonText
              ]}>
                Semua
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === 'expense' && styles.activeFilterButton
              ]}
              onPress={() => handleFilterByType('expense')}
            >
              <Text style={[
                styles.filterButtonText,
                activeFilter === 'expense' && styles.activeFilterButtonText
              ]}>
                Pengeluaran
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === 'income' && styles.activeFilterButton
              ]}
              onPress={() => handleFilterByType('income')}
            >
              <Text style={[
                styles.filterButtonText,
                activeFilter === 'income' && styles.activeFilterButtonText
              ]}>
                Pemasukan
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* Transactions List */}
      <FlatList
        data={filteredTransactions.length > 0 ? filteredTransactions : transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContainer,
          {
            paddingTop: showFilters
              ? headerTopMargin + 180
              : headerTopMargin + 60,
            paddingHorizontal: getResponsiveSpacing(SPACING.lg),
          },
          isTablet && styles.tabletListContainer,
          filteredTransactions.length === 0 && styles.emptyListContainer
        ]}
        ListEmptyComponent={renderEmptyList}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary.main]}
            tintColor={COLORS.primary.main}
          />
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[
          styles.fab,
          isTablet && styles.tabletFab
        ]}
        onPress={handleAddTransaction}
        activeOpacity={0.8}
      >
        <Ionicons 
          name="add" 
          size={getResponsiveIconSize(24)} 
          color="white" 
        />
      </TouchableOpacity>
    </View>
  );
};

// Komponen ScrollView horizontal untuk filter
const ScrollView = Animated.createAnimatedComponent(
  Platform.OS === 'ios' ? require('react-native').ScrollView : require('react-native').ScrollView
);

const { width, height } = Dimensions.get('window');
const isTabletStatic = width >= 768;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  absoluteHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  tabletHeader: {
    paddingHorizontal: SPACING.xl,
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
  },
  tabletHeaderTitle: {
    fontSize: TYPOGRAPHY.fontSize.xxxl,
  },
  iconButton: {
    padding: 8,
  },
  searchContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  tabletSearchContainer: {
    maxWidth: 1000,
    alignSelf: 'center',
    width: '90%',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    ...SHADOWS.sm,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    ...TYPOGRAPHY.body2,
    color: COLORS.text,
  },
  closeFiltersButton: {
    marginLeft: SPACING.md,
    padding: 8,
  },
  filterButtonsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: SPACING.lg,
  },
  filterButtonsContent: {
    flexDirection: 'row',
    paddingRight: SPACING.lg,
  },
  filterButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.white,
    marginRight: SPACING.sm,
    ...SHADOWS.sm,
  },
  activeFilterButton: {
    backgroundColor: COLORS.primary.main,
  },
  filterButtonText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text,
  },
  activeFilterButtonText: {
    color: COLORS.white,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg + 80, // Extra space for FAB
  },
  tabletListContainer: {
    maxWidth: 1000,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: SPACING.xl,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  emptyText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  errorSubtext: {
    ...TYPOGRAPHY.body2,
    color: COLORS.neutral[600],
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: SPACING.lg,
    minWidth: 120,
  },
  addButton: {
    marginTop: SPACING.lg,
    minWidth: 160,
  },
  transactionItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  tabletTransactionItem: {
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
  },
  transactionIconContainer: {
    marginRight: SPACING.md,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  transactionCategory: {
    ...TYPOGRAPHY.body1,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    color: COLORS.text,
  },
  tabletTransactionCategory: {
    fontSize: TYPOGRAPHY.fontSize.lg,
  },
  transactionDescription: {
    ...TYPOGRAPHY.body2,
    color: COLORS.neutral[600],
    marginTop: 2,
  },
  tabletTransactionDescription: {
    fontSize: TYPOGRAPHY.fontSize.md,
    marginTop: 4,
  },
  transactionDate: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[500],
    marginTop: 4,
  },
  tabletTransactionDate: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginTop: 6,
  },
  transactionAmountContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  transactionAmount: {
    ...TYPOGRAPHY.body1,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    marginRight: 4,
  },
  tabletTransactionAmount: {
    fontSize: TYPOGRAPHY.fontSize.lg,
  },
  footerContainer: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  footerText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.neutral[600],
    marginTop: SPACING.sm,
  },
  fab: {
    position: 'absolute',
    right: SPACING.lg,
    bottom: SPACING.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.lg,
  },
  tabletFab: {
    width: 70,
    height: 70,
    borderRadius: 35,
    right: SPACING.xl,
    bottom: SPACING.xl,
  },
});

export default TransactionsListScreen;