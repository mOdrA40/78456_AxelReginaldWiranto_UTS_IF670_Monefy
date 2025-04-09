export type { Category, CategoryType, CategoryInput, CategoryUpdate } from './category';
export type { Goal, GoalStatus, GoalInput, GoalUpdate } from './goal';

import { CategoryType } from './category';
export type TransactionType = CategoryType;

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  description?: string;
  categoryId: string;
  category: string;
  type: TransactionType;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  attachment?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  isRecurring?: boolean;
  recurringId?: string;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber?: string;
  currency?: string;
  language?: string;
  theme?: 'light' | 'dark' | 'system';
}
export interface Budget {
  id: string;
  userId: string;
  name: string;
  amount: number;
  spent: number;
  categoryId?: string;
  categories?: string[];
  type: 'category' | 'all';
  period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
  startDate: Date;
  endDate: Date;
  repeat?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export interface MainTabParamList {
  Dashboard: undefined;
  Transactions: undefined;
  Budget: undefined;
  Reports: undefined;
  Goals: undefined;
  Profile: undefined;
}

/**
 * Tipe untuk navigasi transaksi
 * @extends Record<string, object | undefined>
 */
export interface TransactionsStackParamList extends Record<string, object | undefined> {
  TransactionsList: undefined;
  TransactionDetail: { transactionId: string };
  AddTransaction: undefined;
  EditTransaction: { transactionId: string };
  ScanReceipt: undefined;
}

export type BudgetStackParamList = {
  BudgetList: undefined;
  BudgetDetail: { budgetId: string };
  AddBudget: undefined;
  EditBudget: { budgetId: string };
};

export type ReportsStackParamList = {
  ReportsOverview: undefined;
  CategoryDetail: { categoryId: string; period: string };
  MonthlyReport: { month: number; year: number };
};

export type ProfileStackParamList = {
  ProfileDetail: undefined;
  EditProfile: undefined;
  Settings: undefined;
  Currency: undefined;
  Notifications: undefined;
  Categories: undefined;
  Security: undefined;
  Help: undefined;
  HelpCenter: undefined;
  FAQ: undefined;
  UserGuide: undefined;
  Developer: undefined;
};


export interface ChartData {
  id: string;
  value: number;
  name: string;
  color: string;
}

export interface PeriodSummary {
  income: number;
  expense: number;
  balance: number;
  startDate: Date;
  endDate: Date;
}


export interface TransactionFilter {
  type?: TransactionType;
  startDate?: Date;
  endDate?: Date;
  categories?: string[];
  minAmount?: number;
  maxAmount?: number;
  searchQuery?: string;
  sortBy?: 'date' | 'amount' | 'category';
  sortOrder?: 'asc' | 'desc';
}