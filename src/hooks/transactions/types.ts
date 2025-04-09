import { Transaction, TransactionFilter, TransactionType } from '../../types';

export interface FilterOptions extends Omit<TransactionFilter, 'type'> {
  type?: TransactionType | 'all';
  category?: string;
}

export interface FinancialSummary {
  income: number;
  expense: number;
  balance: number;
}

export interface UseTransactionsResult {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  isInitialized: boolean;
  fetchTransactions: (filters?: FilterOptions, pageSize?: number, forceRefresh?: boolean) => Promise<Transaction[]>;
  fetchMoreTransactions: (filters?: FilterOptions, pageSize?: number) => Promise<void>;
  getTransactionById: (id: string, forceRefresh?: boolean) => Promise<Transaction | null>;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<Transaction | null>;
  updateTransaction: (id: string, updates: Partial<Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>) => Promise<boolean>;
  deleteTransaction: (id: string) => Promise<boolean>;
  getFinancialSummary: () => FinancialSummary;
  formatCurrency: (amount: number, showSymbol?: boolean) => string;
}
