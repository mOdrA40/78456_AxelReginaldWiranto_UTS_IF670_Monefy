import { Transaction } from '../../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { TransactionsStackParamList } from '../../../navigation/types';

/**
 * Tipe untuk navigasi TransactionsScreen
 */
export type TransactionsScreenNavigationProp = StackNavigationProp<
  TransactionsStackParamList,
  'TransactionsList'
>;

/**
 * Tipe untuk opsi filter
 */
export type FilterOption = 'semua' | 'pemasukan' | 'pengeluaran';

/**
 * Interface untuk filter transaksi
 */
export interface TransactionFilters {
  type: 'all' | 'income' | 'expense';
  categoryIds: string[];
  startDate: Date;
  endDate: Date;
  minAmount: string;
  maxAmount: string;
}

/**
 * Interface untuk grup transaksi berdasarkan tanggal
 */
export interface TransactionGroup {
  date: string;
  transactions: Transaction[];
}

/**
 * Props untuk komponen TransactionItem
 */
export interface TransactionItemProps {
  transaction: Transaction;
  onPress: (transaction: Transaction) => void;
}

/**
 * Props untuk komponen TransactionGroupItem
 */
export interface TransactionGroupItemProps {
  item: TransactionGroup;
  onTransactionPress: (transaction: Transaction) => void;
}

/**
 * Props untuk komponen FilterModal
 */
export interface FilterModalProps {
  visible: boolean;
  filters: TransactionFilters;
  setFilters: (filters: TransactionFilters) => void;
  onClose: () => void;
  onReset: () => void;
  categories: any[];
}

/**
 * Props untuk komponen SearchModal
 */
export interface SearchModalProps {
  visible: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onClose: () => void;
  resultCount: number;
}

/**
 * Props untuk komponen TypeFilterButtons
 */
export interface TypeFilterButtonsProps {
  activeFilter: FilterOption;
  setActiveFilter: (filter: FilterOption) => void;
}

/**
 * Props untuk komponen EmptyState
 */
export interface EmptyStateProps {
  searchQuery: string;
  onAddTransaction: () => void;
  onRefresh: () => void;
}

/**
 * Props untuk komponen ErrorState
 */
export interface ErrorStateProps {
  onRetry: () => void;
}

/**
 * Props untuk komponen LoadingState
 */
export interface LoadingStateProps {
  message?: string;
}
