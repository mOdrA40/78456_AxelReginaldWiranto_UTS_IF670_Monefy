import { Transaction } from '../../../types';
import { DashboardSummary } from '../types';

/**
 * Menghitung summary dari transaksi
 */
export const calculateSummary = (transactions: Transaction[]): DashboardSummary => {
  let income = 0;
  let expense = 0;

  transactions.forEach(transaction => {
    if (transaction.type === 'income') {
      income += transaction.amount;
    } else if (transaction.type === 'expense') {
      expense += transaction.amount;
    }
  });

  const balance = income - expense;
  return { income, expense, balance };
};

/**
 * Mendapatkan transaksi terbaru
 */
export const getRecentTransactions = (transactions: Transaction[], limit: number = 5): Transaction[] => {
  return transactions.slice(0, limit);
};
