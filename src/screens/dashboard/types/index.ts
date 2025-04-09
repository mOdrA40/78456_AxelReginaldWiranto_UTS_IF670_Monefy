import { Transaction } from '../../../types';
import { SharedValue } from 'react-native-reanimated';

/**
 * Tipe untuk navigasi DashboardScreen
 */
export type DashboardScreenNavigationProp = any;

/**
 * Props untuk komponen BalanceCard
 */
export interface BalanceCardProps {
  balance: number;
  income: number;
  expense: number;
  isBalanceVisible: boolean;
  balanceScale: SharedValue<number>;
  onToggleVisibility: () => void;
}

/**
 * Props untuk komponen DashboardHeader
 */
export interface DashboardHeaderProps {
  userName: string;
  onProfilePress: () => void;
}

/**
 * Props untuk komponen QuickActions
 */
export interface QuickActionsProps {
  onAddTransaction: () => void;
  onNavigateToTransactions: () => void;
  onNavigateToReports: () => void;
  onNavigateToBudget: () => void;
}

/**
 * Props untuk komponen RecentTransactions
 */
export interface RecentTransactionsProps {
  transactions: Transaction[];
  onViewAllTransactions: () => void;
  onTransactionPress?: (id: string) => void;
}

/**
 * Summary data untuk dashboard
 */
export interface DashboardSummary {
  income: number;
  expense: number;
  balance: number;
}
