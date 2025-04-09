import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  StatusBar,
  Text,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Types
import { 
  TransactionsScreenNavigationProp, 
  FilterOption, 
  TransactionFilters,
  TransactionGroup
} from './types';
import { Transaction } from '../../types';

// Styles
import { styles } from './styles/TransactionsScreen.styles';
import { COLORS, SPACING } from '../../constants/theme';

// Components
import {
  TransactionGroupItem,
  TypeFilterButtons,
  SearchModal,
  FilterModal,
  SearchBar,
  EmptyState,
  ErrorState,
  LoadingState
} from './components';

// Hooks
import useTransactions from '../../hooks/useTransactions';
import useCategories from '../../hooks/useCategories';

// Utils
import { 
  groupTransactionsByDate, 
  getActiveFiltersCount, 
  filterTransactions,
  getDefaultFilters
} from './utils/TransactionUtils';

/**
 * Layar untuk menampilkan daftar transaksi
 */
const TransactionsScreen: React.FC = () => {
  const navigation = useNavigation<TransactionsScreenNavigationProp>();
  const route = useRoute<any>(); // Menggunakan any untuk menghindari error tipe
  const { transactions, loading, error, fetchTransactions, isInitialized } = useTransactions();
  const { categories } = useCategories();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('semua');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const insets = useSafeAreaInsets();
  
  // Ekstrak parameter dari route
  const params = route.params || {};
  const shouldForceRefresh = params.forceRefresh || false;
  const timestamp = params.timestamp || 0;
  
  // Filter states
  const [filters, setFilters] = useState<TransactionFilters>(getDefaultFilters());

  // State untuk search modal
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Load initial data - selalu paksa refresh saat komponen mount
  useEffect(() => {
    console.log('TransactionsScreen: Inisialisasi awal, isInitialized:', isInitialized);
    console.log('TransactionsScreen: Parameter route - forceRefresh:', shouldForceRefresh, 'timestamp:', timestamp);
    
    // Selalu paksa refresh data saat komponen mount
    console.log('TransactionsScreen: Mengambil data transaksi awal...');
    fetchTransactions(undefined, 20, true)
      .then((result) => {
        console.log('TransactionsScreen: Inisialisasi data transaksi selesai, jumlah:', result.length);
        
        // Terapkan filter jika ada
        if (activeFilter !== 'semua' || searchQuery || Object.keys(filters).some(key => {
          // @ts-ignore
          return filters[key] !== getDefaultFilters()[key];
        })) {
          applyFilters();
        }
        
        // Reset parameter route setelah digunakan
        if (shouldForceRefresh || timestamp > 0) {
          try {
            navigation.setParams({ forceRefresh: false, timestamp: 0 });
          } catch (error) {
            console.log('Tidak dapat mengatur params:', error);
          }
        }
      })
      .catch(err => console.error('TransactionsScreen: Error inisialisasi data', err));
  }, [shouldForceRefresh, timestamp]); // eslint-disable-line react-hooks/exhaustive-deps

  // Focus handler - refresh data saat layar mendapat fokus
  // Perbaiki dengan mematikan event listener saat unmount
  useEffect(() => {
    console.log('TransactionsScreen: Setting up focus listener');
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('TransactionsScreen mendapat fokus, menyegarkan data...');
      
      // Paksa refresh data transaksi saat screen mendapat fokus
      fetchTransactions(undefined, 20, true)
        .then((result) => {
          console.log('Data transaksi diperbarui setelah layar mendapat fokus, jumlah:', result.length);
          
          // Terapkan filter jika ada
          if (activeFilter !== 'semua' || searchQuery || Object.keys(filters).some(key => {
            // @ts-ignore
            return filters[key] !== getDefaultFilters()[key];
          })) {
            applyFilters();
          }
        })
        .catch(err => console.error('Gagal memperbarui data setelah fokus:', err));
    });

    // Clean up listener saat komponen unmount
    return unsubscribe;
  }, [navigation, fetchTransactions, activeFilter, searchQuery, filters]);
  
  // Refresh handler
  const handleRefresh = useCallback(async () => {
    console.log('TransactionsScreen: Memulai refresh manual...');
    setRefreshing(true);
    
    try {
      const result = await fetchTransactions(undefined, 20, true);
      console.log('TransactionsScreen: Refresh selesai, jumlah transaksi:', result.length);
      
      // Terapkan filter setelah refresh
      if (activeFilter !== 'semua' || searchQuery || Object.keys(filters).some(key => {
        // @ts-ignore
        return filters[key] !== getDefaultFilters()[key];
      })) {
        applyFilters();
      }
    } catch (error) {
      console.error('Error during refresh:', error);
    } finally {
      setRefreshing(false);
    }
  }, [fetchTransactions, activeFilter, searchQuery, filters]);

  // Tab press handler - refresh data saat tab diklik ulang
  useEffect(() => {
    console.log('TransactionsScreen: Setting up tabPress listener');
    
    // Listener untuk focus event (saat halaman mendapat fokus)
    const focusUnsubscribe = navigation.addListener('focus', () => {
      console.log('TransactionsScreen tab diklik ulang saat sudah aktif');
      // Paksa refresh data transaksi
      handleRefresh();
      
      // Reset ke halaman utama transaksi jika berada di filter yang berbeda
      if (filteredTransactions.length === 0 && transactions.length > 0) {
        console.log('Reset filter karena hasil filter kosong tapi ada transaksi');
        setActiveFilter('semua');
        setSearchQuery('');
        setFilters(getDefaultFilters());
      }
    });
    
    // Listener untuk tab press (saat tab diklik meskipun sudah aktif)
    // @ts-ignore - mengabaikan error tipe karena 'tabPress' memang ada pada navigator tab
    const tabPressUnsubscribe = navigation.addListener('tabPress', () => {
      if (navigation.isFocused()) {
        console.log('Tab transaksi diklik ulang saat sudah aktif');
        // Reset ke tampilan utama jika sudah berada di halaman transaksi
        setActiveFilter('semua');
        setSearchQuery('');
        setFilters(getDefaultFilters());
        handleRefresh();
      }
    });

    // Clean up listener saat komponen unmount
    return () => {
      focusUnsubscribe();
      tabPressUnsubscribe();
    };
  }, [navigation, handleRefresh, filteredTransactions.length, transactions.length]);

  // Apply filters and search
  useEffect(() => {
    if (!transactions) return;
    
    console.log('Menerapkan filter pada', transactions.length, 'transaksi');
    const filtered = filterTransactions(
      transactions,
      activeFilter,
      searchQuery,
      filters
    );

    setFilteredTransactions(filtered);
  }, [transactions, activeFilter, searchQuery, filters]);



  const handleAddTransaction = () => {
    navigation.navigate('AddTransaction');
  };
  
  const handleTransactionPress = (transaction: Transaction) => {
    navigation.navigate('TransactionDetail', { transactionId: transaction.id });
  };

  const resetFilters = () => {
    setFilters(getDefaultFilters());
    setShowFilters(false);
  };

  const applyFilters = () => {
    if (!transactions) return;
    
    console.log('Menerapkan filter pada', transactions.length, 'transaksi');
    const filtered = filterTransactions(
      transactions,
      activeFilter,
      searchQuery,
      filters
    );

    setFilteredTransactions(filtered);
  };

  // Render content based on state
  const renderContent = () => {
    if (loading && !refreshing) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState onRetry={fetchTransactions} />;
    }

    if (filteredTransactions.length === 0) {
      // Jika tidak ada transaksi setelah filtering tapi ada transaksi asli
      const isFilteringCausingEmpty = transactions.length > 0;
      
      return (
        <EmptyState 
          searchQuery={searchQuery} 
          onAddTransaction={handleAddTransaction} 
          onRefresh={() => {
            // Jika kosong karena filter, hapus filter
            if (isFilteringCausingEmpty) {
              setActiveFilter('semua');
              setSearchQuery('');
              setFilters(getDefaultFilters());
            }
            // Refresh data
            handleRefresh();
          }}
        />
      );
    }

    // Group and render transactions
    const groupedTransactions: TransactionGroup[] = groupTransactionsByDate(filteredTransactions);
    
    return (
      <FlatList
        data={groupedTransactions}
        keyExtractor={item => item.date}
        renderItem={({ item }) => (
          <TransactionGroupItem 
            item={item} 
            onTransactionPress={handleTransactionPress} 
          />
        )}
        ListHeaderComponent={
          <TypeFilterButtons 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter} 
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary.main]}
            tintColor={COLORS.primary.main}
          />
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.surface}
        translucent={false}
      />
      <Animated.View entering={FadeIn} style={[styles.header, { paddingTop: Platform.OS === 'android' ? SPACING.lg : insets.top }]}>
        <Text style={styles.title}>Transaksi</Text>
        <SearchBar 
          onSearchPress={() => setShowSearchModal(true)}
          onFilterPress={() => setShowFilters(true)}
          onAddPress={handleAddTransaction}
          activeFiltersCount={getActiveFiltersCount(filters)}
        />
      </Animated.View>
      
      {renderContent()}
      
      <FilterModal 
        visible={showFilters}
        filters={filters}
        setFilters={setFilters}
        onClose={() => setShowFilters(false)}
        onReset={resetFilters}
        categories={categories}
      />
      
      <SearchModal 
        visible={showSearchModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onClose={() => setShowSearchModal(false)}
        resultCount={filteredTransactions.length}
      />
    </View>
  );
};

export default TransactionsScreen;
