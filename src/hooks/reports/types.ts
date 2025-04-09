import { TransactionType, PeriodSummary, ChartData } from '../../types';

export interface UseReportsResult {
  loading: boolean;
  error: string | null;
  getPeriodSummary: (startDate: Date, endDate: Date) => Promise<PeriodSummary | null>;
  getCategoryChartData: (type: TransactionType, startDate: Date, endDate: Date) => Promise<ChartData[]>;
  getPeriodChartData: (
    type: TransactionType,
    startDate: Date,
    endDate: Date,
    interval?: 'day' | 'week' | 'month'
  ) => Promise<ChartData[]>;
}
