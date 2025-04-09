import { format } from 'date-fns';
import { Transaction } from '../../../types';
import { TransactionGroup, TransactionFilters } from '../types';

/**
 * Mengelompokkan transaksi berdasarkan tanggal
 */
export const groupTransactionsByDate = (transactions: Transaction[]): TransactionGroup[] => {
  const grouped: { [key: string]: Transaction[] } = {};
  
  transactions.forEach(transaction => {
    const date = format(new Date(transaction.date), 'yyyy-MM-dd');
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(transaction);
  });
  
  return Object.entries(grouped).map(([date, transactions]) => ({
    date,
    transactions,
  }));
};

/**
 * Mendapatkan jumlah filter aktif
 */
export const getActiveFiltersCount = (filters: TransactionFilters): number => {
  let count = 0;
  if (filters.type !== 'all') count++;
  if (filters.categoryIds.length > 0) count++;
  if (filters.minAmount || filters.maxAmount) count++;
  return count;
};

/**
 * Memfilter transaksi berdasarkan filter yang diberikan
 */
export const filterTransactions = (
  transactions: Transaction[],
  activeFilter: string,
  searchQuery: string,
  filters: TransactionFilters
): Transaction[] => {
  if (!transactions) return [];

  let filtered = [...transactions];

  // Apply type filter
  if (activeFilter === 'pemasukan') {
    filtered = filtered.filter(t => t.type === 'income');
  } else if (activeFilter === 'pengeluaran') {
    filtered = filtered.filter(t => t.type === 'expense');
  }
  // Untuk 'semua', tidak perlu filter, tampilkan semua transaksi
  
  // Pastikan tidak ada filter ganda yang bertentangan
  // Jika type filter dari modal filter dan activeFilter berbeda, prioritaskan activeFilter
  if (filters.type !== 'all' && (
      (activeFilter === 'pemasukan' && filters.type !== 'income') ||
      (activeFilter === 'pengeluaran' && filters.type !== 'expense')
    )) {
    // Reset filter type modal karena bertentangan dengan activeFilter
    console.log('Filter bertentangan, prioritaskan activeFilter')
  }

  // Apply search
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      t =>
        (t.description?.toLowerCase().includes(query) || '') ||
        t.category.toLowerCase().includes(query) ||
        t.amount.toString().includes(query)
    );
  }

  // Filter by category
  if (filters.categoryIds.length > 0) {
    filtered = filtered.filter((transaction) =>
      filters.categoryIds.includes(transaction.categoryId)
    );
  }
  
  // Filter by custom type in modal filter (hanya filter jika bukan 'all' dan activeFilter belum menerapkan filter)
  if (filters.type !== 'all' && activeFilter === 'semua') {
    filtered = filtered.filter(t => t.type === filters.type);
  }
  
  // Filter by date range
  filtered = filtered.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate >= filters.startDate && transactionDate <= filters.endDate
    );
  });
  
  // Filter by amount range
  if (filters.minAmount) {
    const minAmount = parseFloat(filters.minAmount);
    filtered = filtered.filter((transaction) => transaction.amount >= minAmount);
  }
  
  if (filters.maxAmount) {
    const maxAmount = parseFloat(filters.maxAmount);
    filtered = filtered.filter((transaction) => transaction.amount <= maxAmount);
  }
  
  // Sort by date (newest first)
  filtered.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return filtered;
};

/**
 * Mendapatkan filter default
 */
export const getDefaultFilters = (): TransactionFilters => {
  return {
    type: 'all',
    categoryIds: [],
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)), // Last month
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Satu tahun ke depan
    minAmount: '',
    maxAmount: '',
  };
};
