import { Transaction } from '../../../types';
import { Category } from '../../../types/category';
import { PeriodFilter, TransactionType, FinancialTotals, PieChartItem } from '../types';
import { COLORS } from '../../../constants/theme';

interface ExtendedTransaction extends Omit<Transaction, 'category'> {
  category?: Category;
}

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const getDateRangeFromPeriod = (period: PeriodFilter): { startDate: Date; endDate: Date } => {
  const now = new Date();
  const endDate = new Date(now);
  let startDate = new Date(now);

  switch (period) {
    case 'week':
      const day = now.getDay();
      const diff = day === 0 ? 6 : day - 1;
      startDate.setDate(now.getDate() - diff);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'month':
      // Bulan ini
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'quarter':
      // 3 bulan terakhir
      startDate.setMonth(now.getMonth() - 3);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'year':
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate.setHours(23, 59, 59, 999);
      break;
    default:
      startDate.setMonth(now.getMonth() - 1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
  }

  return { startDate, endDate };
};


export const filterTransactions = (
  transactions: Transaction[],
  period: PeriodFilter,
  type: TransactionType
): Transaction[] => {
  const { startDate, endDate } = getDateRangeFromPeriod(period);

  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const isInDateRange = transactionDate >= startDate && transactionDate <= endDate;
    const matchesType = type === 'all' || transaction.type === type;

    return isInDateRange && matchesType;
  });
};


export const calculateTotals = (transactions: Transaction[]): FinancialTotals => {
  const totals: FinancialTotals = {
    income: 0,
    expense: 0,
    balance: 0,
  };

  transactions.forEach((transaction) => {
    if (transaction.type === 'income') {
      totals.income += transaction.amount;
    } else if (transaction.type === 'expense') {
      totals.expense += transaction.amount;
    }
  });

  totals.balance = totals.income - totals.expense;
  return totals;
};

export const groupTransactionsByCategory = (
  transactions: ExtendedTransaction[],
  type: TransactionType
): PieChartItem[] => {
  // Filter transaksi berdasarkan tipe jika bukan 'all'
  const filteredTransactions = type === 'all'
    ? transactions
    : transactions.filter(t => t.type === type);

  if (filteredTransactions.length === 0) {
    return [];
  }

  const categoryGroups: { [key: string]: { total: number; count: number; category: string; color: string; icon: string } } = {};

  filteredTransactions.forEach((transaction) => {
    const categoryId = transaction.categoryId;
    let categoryName = 'Tidak ada kategori';
    let categoryColor = COLORS.neutral[500];
    let categoryIcon = 'help-circle';

    if (typeof transaction.category === 'object' && transaction.category !== null) {
      categoryName = transaction.category.name || 'Tidak ada kategori';
      categoryColor = transaction.category.color || COLORS.neutral[500];
      categoryIcon = transaction.category.icon || 'help-circle';
    }

    if (!categoryGroups[categoryId]) {
      categoryGroups[categoryId] = {
        total: 0,
        count: 0,
        category: categoryName,
        color: categoryColor,
        icon: categoryIcon,
      };
    }

    categoryGroups[categoryId].total += transaction.amount;
    categoryGroups[categoryId].count += 1;
  });

  const grandTotal = Object.values(categoryGroups).reduce((sum, group) => sum + group.total, 0);

  const result = Object.entries(categoryGroups).map(([id, data]) => ({
    id,
    value: data.total,
    label: data.category,
    color: data.color,
    icon: data.icon,
    count: data.count,
    percentage: grandTotal > 0 ? (data.total / grandTotal) * 100 : 0,
  }));

  return result.sort((a, b) => b.value - a.value);
};
