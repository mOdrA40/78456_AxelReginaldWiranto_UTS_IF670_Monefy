export interface PieChartItem {
  id: string;
  value: number;
  color: string;
  label: string;
  icon?: string;
  count?: number;
  percentage: number;
}

export type PeriodFilter = 'week' | 'month' | 'quarter' | 'year';

export type TransactionType = 'income' | 'expense' | 'all';

export interface FilterOption<T> {
  label: string;
  value: T;
  icon?: string;
}

export interface FinancialTotals {
  income: number;
  expense: number;
  balance: number;
}

export interface PeriodFilterProps {
  periodFilter: PeriodFilter;
  setPeriodFilter: (period: PeriodFilter) => void;
}

export interface TypeFilterProps {
  typeFilter: TransactionType;
  setTypeFilter: (type: TransactionType) => void;
}

export interface OverviewCardProps {
  totals: FinancialTotals;
}

export interface CategoryAnalyticsProps {
  data: PieChartItem[];
  type: TransactionType;
  isLoading: boolean;
}

export interface CategoryAnalytic {
  id: string;
  name: string;
  icon: string;
  color: string;
  amount: number;
  count: number;
  percentage: number;
}
