import { useState, useCallback } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs,
  Timestamp,
} from 'firebase/firestore';

import { db } from '../../config/firebase';
import useAuth from '../useAuth';
import { TransactionType, PeriodSummary, ChartData } from '../../types';
import { UseReportsResult } from './types';
import { 
  convertTransactionsToChartDataByCategory,
  convertTransactionsToChartDataByPeriod
} from './utils';

const useReports = (): UseReportsResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  
  const getPeriodSummary = useCallback(async (
    startDate: Date,
    endDate: Date
  ): Promise<PeriodSummary | null> => {
    if (!user) {
      setError('User tidak terautentikasi');
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const transactionsRef = collection(db, 'transactions');
      const transactionsQuery = query(
        transactionsRef,
        where('userId', '==', user.uid),
        where('date', '>=', Timestamp.fromDate(startDate)),
        where('date', '<=', Timestamp.fromDate(endDate)),
        orderBy('date', 'desc')
      );
      
      const querySnapshot = await getDocs(transactionsQuery);
      
      let income = 0;
      let expense = 0;
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.type === 'income') {
          income += data.amount;
        } else {
          expense += data.amount;
        }
      });
      
      const summary: PeriodSummary = {
        income,
        expense,
        balance: income - expense,
        startDate,
        endDate,
      };
      
      return summary;
    } catch (err) {
      console.error('Error getting period summary:', err);
      setError('Terjadi kesalahan saat mengambil ringkasan periode');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);
  
  const getCategoryChartData = useCallback(async (
    type: TransactionType,
    startDate: Date,
    endDate: Date
  ): Promise<ChartData[]> => {
    if (!user) {
      setError('User tidak terautentikasi');
      return [];
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const transactionsRef = collection(db, 'transactions');
      const transactionsQuery = query(
        transactionsRef,
        where('userId', '==', user.uid),
        where('type', '==', type),
        where('date', '>=', Timestamp.fromDate(startDate)),
        where('date', '<=', Timestamp.fromDate(endDate)),
        orderBy('date', 'desc')
      );
      
      const querySnapshot = await getDocs(transactionsQuery);
      
      return convertTransactionsToChartDataByCategory(querySnapshot);
    } catch (err) {
      console.error('Error getting category chart data:', err);
      setError('Terjadi kesalahan saat mengambil data chart kategori');
      return [];
    } finally {
      setLoading(false);
    }
  }, [user]);
  
  const getPeriodChartData = useCallback(async (
    type: TransactionType,
    startDate: Date,
    endDate: Date,
    interval: 'day' | 'week' | 'month' = 'month'
  ): Promise<ChartData[]> => {
    if (!user) {
      setError('User tidak terautentikasi');
      return [];
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const transactionsRef = collection(db, 'transactions');
      const transactionsQuery = query(
        transactionsRef,
        where('userId', '==', user.uid),
        where('type', '==', type),
        where('date', '>=', Timestamp.fromDate(startDate)),
        where('date', '<=', Timestamp.fromDate(endDate)),
        orderBy('date', 'asc')
      );
      
      const querySnapshot = await getDocs(transactionsQuery);
      
      return convertTransactionsToChartDataByPeriod(querySnapshot, interval, type);
    } catch (err) {
      console.error('Error getting period chart data:', err);
      setError('Terjadi kesalahan saat mengambil data chart periode');
      return [];
    } finally {
      setLoading(false);
    }
  }, [user]);
  
  return {
    loading,
    error,
    getPeriodSummary,
    getCategoryChartData,
    getPeriodChartData,
  };
};

export default useReports;
