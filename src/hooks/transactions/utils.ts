import { Timestamp } from 'firebase/firestore';
import { Transaction } from '../../types';
import { FilterOptions } from './types';

export const convertFirestoreDataToTransaction = (id: string, data: any): Transaction => {
  const convertDate = (dateField: any): Date => {
    if (!dateField) return new Date();

    if (dateField instanceof Timestamp) {
      return dateField.toDate();
    }

    if (typeof dateField === 'string') {
      const parsed = new Date(dateField);
      return isNaN(parsed.getTime()) ? new Date() : parsed;
    }

    if (dateField instanceof Date) {
      return dateField;
    }

    return new Date();
  };

  return {
    id,
    userId: data.userId,
    amount: data.amount || 0,
    type: data.type || 'expense',
    category: data.category || 'Uncategorized',
    categoryId: data.categoryId || '',
    description: data.description || '',
    date: convertDate(data.date),
    createdAt: convertDate(data.createdAt),
    updatedAt: convertDate(data.updatedAt),
    attachment: data.attachmentUrl || null,
    location: data.location || null,
    isRecurring: !!data.isRecurring,
    recurringId: data.recurringId || null,
  };
};

export function sortTransactionsByDate(transactions: Transaction[]): Transaction[] {
  if (!transactions || transactions.length === 0) return [];
  
  console.log('Mengurutkan transaksi berdasarkan tanggal, jumlah:', transactions.length);
  
  return [...transactions].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(a.date);
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(b.date);
    
    return dateB.getTime() - dateA.getTime();
  });
}

export const applyFiltersToTransactions = (
  transactions: Transaction[],
  filters?: FilterOptions
): Transaction[] => {
  if (!filters) return transactions;

  let filteredTransactions = [...transactions];

  if (filters.type && filters.type !== 'all') {
    filteredTransactions = filteredTransactions.filter(t => t.type === filters.type);
  }
  
  if (filters.startDate) {
    const startTime = filters.startDate.getTime();
    filteredTransactions = filteredTransactions.filter(t => t.date.getTime() >= startTime);
  }
  
  if (filters.endDate) {
    const endTime = filters.endDate.getTime();
    filteredTransactions = filteredTransactions.filter(t => t.date.getTime() <= endTime);
  }
  
  if (filters.categories && filters.categories.length > 0) {
    filteredTransactions = filteredTransactions.filter(t => 
      filters.categories?.includes(t.categoryId)
    );
  }
  
  if (filters.searchQuery) {
    const searchLower = filters.searchQuery.toLowerCase();
    filteredTransactions = filteredTransactions.filter(
      (t) => 
        (t.description ? t.description.toLowerCase().includes(searchLower) : false) ||
        (t.category ? t.category.toLowerCase().includes(searchLower) : false)
    );
  }

  return filteredTransactions;
};

export const calculateFinancialSummary = (transactions: Transaction[]) => {
  let income = 0;
  let expense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === 'income') {
      income += transaction.amount;
    } else {
      expense += transaction.amount;
    }
  });

  const balance = income - expense;

  return {
    income,
    expense,
    balance,
  };
};
