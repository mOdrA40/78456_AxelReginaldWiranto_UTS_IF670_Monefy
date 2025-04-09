/**
 * Tipe untuk periode laporan
 */
export type ReportPeriod = 'week' | 'month' | 'year';

/**
 * Tipe untuk jenis laporan
 */
export type ReportType = 'overview' | 'income' | 'expense';

/**
 * Tipe untuk data kategori chart
 */
export interface CategoryChartData {
  name: string;
  amount: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

/**
 * Tipe untuk data laporan
 */
export interface ReportData {
  labels: string[];
  incomeData: number[];
  expenseData: number[];
  categoryData: CategoryChartData[];
}

/**
 * Tipe untuk data ringkasan
 */
export interface SummaryData {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

/**
 * Tipe untuk item periode
 */
export interface PeriodItem {
  value: ReportPeriod;
  label: string;
  icon?: string;
}

/**
 * Tipe untuk item jenis laporan
 */
export interface ReportTypeItem {
  value: ReportType;
  label: string;
  icon?: string;
}
