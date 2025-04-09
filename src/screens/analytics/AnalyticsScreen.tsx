import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ScrollView, Text, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';

// Types
import { PeriodFilter, TransactionType } from './types';

// Components
import {
  PeriodFilter as PeriodFilterComponent,
  TypeFilter,
  OverviewCard,
  CategoryAnalytics
} from './components';

// Styles
import { analyticsStyles as styles } from './styles';

// Utils
import {
  filterTransactions,
  calculateTotals,
  groupTransactionsByCategory
} from './utils';
import { COLORS } from '../../constants/theme';

// Hooks
import useTransactions from '../../hooks/useTransactions';

const AnalyticsScreen: React.FC = () => {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('month');
  const [transactionType, setTransactionType] = useState<TransactionType>('expense');

  const { transactions, loading, fetchTransactions } = useTransactions();

  const [refreshing, setRefreshing] = useState(false);

  const filteredTransactions = useMemo(() => {
    return filterTransactions(transactions, periodFilter, transactionType);
  }, [transactions, periodFilter, transactionType]);

  const totals = useMemo(() => {
    return calculateTotals(filteredTransactions);
  }, [filteredTransactions]);
  const categoryChartData = useMemo(() => {
    return groupTransactionsByCategory(filteredTransactions as any, transactionType);
  }, [filteredTransactions, transactionType]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTransactions();
    setRefreshing(false);
  }, [fetchTransactions]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Animated.View entering={FadeInDown.delay(200)} style={styles.header}>
        <Text style={styles.title}>Analitik</Text>
        <Text style={styles.subtitle}>
          Lacak keuangan Anda
        </Text>
      </Animated.View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary.main]}
          />
        }
      >
        <Animated.View entering={FadeInDown.delay(300)}>
          <PeriodFilterComponent
            periodFilter={periodFilter}
            setPeriodFilter={setPeriodFilter}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400)}>
          <TypeFilter
            typeFilter={transactionType}
            setTypeFilter={setTransactionType}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500)}>
          <OverviewCard
            totals={totals}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600)}>
          <CategoryAnalytics
            data={categoryChartData}
            type={transactionType}
            isLoading={loading}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalyticsScreen;

