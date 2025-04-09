import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

// Types
import { ReportPeriod, ReportType } from './types';

// Styles
import { styles } from './styles/ReportsScreen.styles';
import { COLORS, SPACING } from '../../constants/theme';

// Components
import {
  PeriodSelector,
  ReportTypeSelector,
  SummarySection,
  LineChartSection,
  PieChartSection,
  EmptyState,
  ErrorState,
  LoadingState,
} from './components';

// Hooks
import useTransactions from '../../hooks/useTransactions';

// Utils
import { getReportData, getSummaryData } from './utils/ReportUtils';

/**
 * Layar untuk menampilkan laporan keuangan
 */
const ReportsScreen: React.FC = () => {
  const { transactions, loading, error, fetchTransactions, formatCurrency } = useTransactions();
  const [refreshing, setRefreshing] = useState(false);
  const [period, setPeriod] = useState<ReportPeriod>('month');
  const [reportType, setReportType] = useState<ReportType>('overview');

  // Refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTransactions();
    setRefreshing(false);
  }, [fetchTransactions]);

  // Get report data
  const { labels, incomeData, expenseData, categoryData } = getReportData(
    transactions,
    period,
    reportType
  );

  // Get summary data
  const summaryData = getSummaryData(incomeData, expenseData);

  // Render content based on state
  const renderContent = () => {
    if (loading && !refreshing) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState onRetry={fetchTransactions} />;
    }

    if (transactions.length === 0) {
      return <EmptyState />;
    }

    return (
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary.main]}
            tintColor={COLORS.primary.main}
          />
        }
      >
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.content}
        >
          <SummarySection 
            summaryData={summaryData} 
            formatCurrency={formatCurrency} 
          />
          <LineChartSection 
            labels={labels}
            incomeData={incomeData}
            expenseData={expenseData}
            reportType={reportType}
          />
          <PieChartSection categoryData={categoryData} />
        </Animated.View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.surface}
        barStyle="dark-content"
      />
      <Animated.View entering={FadeIn} style={styles.header}>
        <Text style={styles.title}>Laporan</Text>
      </Animated.View>
      
      <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.selectionContainer}>
        <View style={styles.selectorContainer}>
          <Text style={styles.selectorLabel}>Periode Laporan</Text>
          <PeriodSelector period={period} setPeriod={setPeriod} />
        </View>
        
        <View style={styles.selectorContainer}>
          <Text style={styles.selectorLabel}>Jenis Transaksi</Text>
          <ReportTypeSelector reportType={reportType} setReportType={setReportType} />
        </View>
      </Animated.View>
      
      {renderContent()}
    </SafeAreaView>
  );
};

export default ReportsScreen;