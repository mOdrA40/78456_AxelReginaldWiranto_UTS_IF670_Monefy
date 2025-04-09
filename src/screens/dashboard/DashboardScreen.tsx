import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  ScrollView,
  RefreshControl,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';

// Types
import { DashboardScreenNavigationProp, DashboardSummary } from './types';

// Styles
import { dashboardStyles as styles } from './styles';

// Components
import {
  DashboardHeader,
  BalanceCard,
  QuickActions,
  RecentTransactions
} from './components';

// Hooks
import useAuth from '../../hooks/useAuth';
import useTransactions from '../../hooks/useTransactions';
import { COLORS, SPACING } from '../../constants/theme';

// Utils
import { calculateSummary, getRecentTransactions } from './utils';

/**
 * Screen Dashboard utama
 */
const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const { user } = useAuth();
  const {
    transactions,
    fetchTransactions,
    isInitialized
  } = useTransactions();
  
  // Menggunakan dimensi layar untuk responsivitas
  const dimensions = useWindowDimensions();
  const isTablet = dimensions.width >= 768;
  const isLandscape = dimensions.width > dimensions.height;

  // State untuk summary - dihitung dari transactions
  const [summary, setSummary] = useState<DashboardSummary>({ income: 0, expense: 0, balance: 0 });
  const [refreshing, setRefreshing] = useState(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  // Tambahkan ref untuk tracking last fetch time
  const lastFetchTimeRef = React.useRef<number>(0);
  const MIN_REFRESH_INTERVAL = 5000; // 5 detik interval minimum antar refresh

  // Nilai untuk animasi balance
  const balanceScale = useSharedValue(1);
  
  // Hitung padding berdasarkan ukuran layar dan orientasi
  const containerPadding = useMemo(() => {
    if (isTablet) {
      return isLandscape ? SPACING.xl * 1.5 : SPACING.xl;
    }
    return isLandscape ? SPACING.lg : SPACING.md;
  }, [isTablet, isLandscape]);

  // Hitung lebar maksimum konten di tablet
  const contentMaxWidth = useMemo(() => {
    return isTablet ? (isLandscape ? 900 : 700) : undefined;
  }, [isTablet, isLandscape]);

  // Dapatkan transaksi terbaru (maksimal 5 teratas)
  const recentTransactions = useMemo(() => {
    const latestTransactions = getRecentTransactions(transactions, 5);
    console.log('Memperbarui transaksi terbaru di Dashboard, jumlah:', latestTransactions.length);
    return latestTransactions;
  }, [transactions]);

  // Hitung summary ketika transactions berubah
  useEffect(() => {
    if (transactions.length > 0) {
      const summaryData = calculateSummary(transactions);
      console.log('Memperbarui summary dari transactions yang berubah:', 
                 `income: ${summaryData.income}, expense: ${summaryData.expense}, balance: ${summaryData.balance}`);
      setSummary(summaryData);
    } else {
      // Reset summary jika tidak ada transaksi
      setSummary({ income: 0, expense: 0, balance: 0 });
      console.log('Tidak ada transaksi, mereset summary ke 0');
    }
  }, [transactions]);

  // Fetch data transaksi saat component mount dengan handling error dan retry
  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 3;
    
    const fetchData = async () => {
      try {
        console.log('DashboardScreen: Memuat data transaksi awal...');
        await fetchTransactions(undefined, 20, true);
        console.log('DashboardScreen: Data transaksi berhasil dimuat, jumlah:', transactions.length);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        
        // Retry logic - mencoba kembali sebanyak maxRetries
        if (retryCount < maxRetries && isMounted) {
          retryCount++;
          console.log(`Retry attempt ${retryCount}/${maxRetries}...`);
          setTimeout(fetchData, 1000 * retryCount); // Backoff eksponensial
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, []);
  
  // Focus handler - refresh data saat layar mendapat fokus
  useEffect(() => {
    console.log('DashboardScreen: Setting up focus listener');
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('DashboardScreen mendapat fokus, memverifikasi data terbaru...');
      
      // Cek apakah perlu fetch lagi (mencegah terlalu sering)
      const now = Date.now();
      if (now - lastFetchTimeRef.current < MIN_REFRESH_INTERVAL) {
        console.log('Terlalu cepat untuk refresh, menggunakan data cache');
        return;
      }
      
      // Verifikasi data terbaru, paksa refresh untuk memastikan data terbaru
      fetchTransactions(undefined, 20, true)
        .then((result) => {
          console.log('Verifikasi data transaksi Dashboard selesai, jumlah:', result.length);
          // Pastikan summary diperbarui setelah data diambil
          const updatedSummary = calculateSummary(result);
          setSummary(updatedSummary);
          lastFetchTimeRef.current = now;
        })
        .catch(err => console.error('Gagal memverifikasi data Dashboard:', err));
    });

    return unsubscribe;
  }, [navigation, fetchTransactions]);

  // Handler refresh - menggunakan useCallback untuk optimasi
  const handleRefresh = useCallback(async () => {
    console.log('Dashboard: Memulai refresh manual...');
    setRefreshing(true);
    
    try {
      const result = await fetchTransactions(undefined, 20, true);
      console.log('Dashboard: Refresh selesai, jumlah transaksi:', result.length);
      
      // Perbarui summary berdasarkan data yang baru diambil
      const updatedSummary = calculateSummary(result);
      setSummary(updatedSummary);
      
      // Animasikan balance saat refresh
      balanceScale.value = 0.95;
      setTimeout(() => {
        balanceScale.value = withTiming(1, {
          duration: 500,
          easing: Easing.elastic(1.2),
        });
      }, 100);
    } catch (error) {
      console.error('Error during Dashboard refresh:', error);
    } finally {
      setRefreshing(false);
    }
  }, [fetchTransactions, balanceScale]);

  // Toggle visibilitas saldo - menggunakan useCallback untuk optimasi
  const toggleBalanceVisibility = useCallback(() => {
    setIsBalanceVisible(prev => !prev);
  }, []);

  // Navigasi ke halaman - menggunakan useCallback untuk optimasi
  const navigateToTransactions = useCallback(() => {
    console.log('Navigasi dari Dashboard ke halaman Transaksi...');
    
    // Pastikan data transaksi sudah dimuat sebelum navigasi
    fetchTransactions(undefined, 20, true)
      .then((result) => {
        console.log('Data transaksi berhasil dimuat sebelum navigasi, jumlah:', result.length);
        
        // Navigasi ke halaman transaksi dengan parameter forceRefresh
        navigation.navigate('Transactions', {
          screen: 'TransactionsList',
          params: { forceRefresh: true }
        });
      })
      .catch(err => {
        console.error('Gagal memuat data transaksi sebelum navigasi:', err);
        
        // Tetap navigasi meskipun gagal memuat data
        navigation.navigate('Transactions', {
          screen: 'TransactionsList',
          params: { forceRefresh: true }
        });
      });
  }, [navigation, fetchTransactions]);

  const navigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  const navigateToBudget = useCallback(() => {
    navigation.navigate('Budget');
  }, [navigation]);

  const navigateToReports = useCallback(() => {
    navigation.navigate('Reports');
  }, [navigation]);

  // Handler untuk navigasi ke halaman tambah transaksi
  const navigateToAddTransaction = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Transactions',
          state: {
            routes: [
              { name: 'TransactionsList' },
              { name: 'AddTransaction' }
            ],
            index: 1
          }
        }
      ]
    });
  }, [navigation]);

  // Handler untuk item transaksi
  const handleTransactionPress = useCallback((id: string) => {
    navigation.navigate('Transactions', {
      screen: 'TransactionDetail',
      params: { transactionId: id }
    });
  }, [navigation]);

  // Menggunakan komponen yang sudah ada
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          {
            padding: containerPadding,
            maxWidth: contentMaxWidth,
            paddingBottom: SPACING.xl * 2,
          }
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary.main]}
            tintColor={COLORS.primary.main}
          />
        }
      >
        {/* Wrapper untuk konten di tablet */}
        <View style={isTablet ? { alignItems: 'center', width: '100%' } : undefined}>
          {/* Header */}
          <DashboardHeader
            userName={user?.displayName?.split(' ')[0] || 'User'}
            onProfilePress={navigateToProfile}
          />

          {/* Card Saldo */}
          <BalanceCard
            balance={summary.balance}
            income={summary.income}
            expense={summary.expense}
            isBalanceVisible={isBalanceVisible}
            balanceScale={balanceScale}
            onToggleVisibility={toggleBalanceVisibility}
          />

          {/* Quick Actions */}
          <QuickActions
            onAddTransaction={navigateToAddTransaction}
            onNavigateToTransactions={navigateToTransactions}
            onNavigateToReports={navigateToReports}
            onNavigateToBudget={navigateToBudget}
          />

          {/* Transaksi Terakhir */}
          <RecentTransactions
            transactions={recentTransactions}
            onViewAllTransactions={navigateToTransactions}
            onTransactionPress={handleTransactionPress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;