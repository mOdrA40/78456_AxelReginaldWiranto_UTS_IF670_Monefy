import { Transaction } from '../../../types';
import { ReportPeriod, ReportType, ReportData, SummaryData, CategoryChartData } from '../types';
import { COLORS } from '../../../constants/theme';

/**
 * Mendapatkan tanggal awal berdasarkan periode
 */
export const getStartDate = (period: ReportPeriod): Date => {
  const now = new Date();
  if (period === 'week') {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 7);
    return startOfWeek;
  } else if (period === 'month') {
    const startOfMonth = new Date(now);
    startOfMonth.setMonth(now.getMonth() - 1);
    return startOfMonth;
  } else {
    // year
    const startOfYear = new Date(now);
    startOfYear.setFullYear(now.getFullYear() - 1);
    return startOfYear;
  }
};

/**
 * Mendapatkan data laporan berdasarkan periode dan jenis laporan
 */
export const getReportData = (
  transactions: Transaction[],
  period: ReportPeriod,
  reportType: ReportType
): ReportData => {
  if (!transactions || transactions.length === 0) {
    return {
      labels: [],
      incomeData: [],
      expenseData: [],
      categoryData: [] as CategoryChartData[],
    };
  }

  const startDate = getStartDate(period);

  // Filter transactions based on period
  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= startDate;
  });

  // Prepare data structure based on period
  let labels: string[] = [];
  let incomeData: number[] = [];
  let expenseData: number[] = [];

  if (period === 'week') {
    // Last 7 days
    const daysOfWeek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const today = new Date().getDay();

    // Reorder days starting from current day - 6
    for (let i = 6; i >= 0; i--) {
      const dayIndex = (today - i + 7) % 7;
      labels.push(daysOfWeek[dayIndex]);

      // Initialize with 0
      incomeData.push(0);
      expenseData.push(0);
    }

    // Fill data
    filteredTransactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const daysDiff = Math.floor((new Date().getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff < 7) {
        if (transaction.type === 'income') {
          incomeData[6 - daysDiff] += transaction.amount;
        } else {
          expenseData[6 - daysDiff] += transaction.amount;
        }
      }
    });
  } else if (period === 'month') {
    // Last 4 weeks
    labels = ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'];
    incomeData = [0, 0, 0, 0];
    expenseData = [0, 0, 0, 0];

    filteredTransactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff < 28) {
        const weekIndex = Math.floor(daysDiff / 7);
        if (weekIndex < 4) {
          if (transaction.type === 'income') {
            incomeData[3 - weekIndex] += transaction.amount;
          } else {
            expenseData[3 - weekIndex] += transaction.amount;
          }
        }
      }
    });
  } else {
    // Last 12 months
    const monthsOfYear = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des',
    ];
    const currentMonth = new Date().getMonth();

    // Reorder months starting from current month - 11
    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      labels.push(monthsOfYear[monthIndex]);

      // Initialize with 0
      incomeData.push(0);
      expenseData.push(0);
    }

    // Fill data
    filteredTransactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const monthDiff =
        (new Date().getMonth() - transactionDate.getMonth() + 12) % 12 +
        (new Date().getFullYear() - transactionDate.getFullYear()) * 12;

      if (monthDiff < 12) {
        if (transaction.type === 'income') {
          incomeData[11 - monthDiff] += transaction.amount;
        } else {
          expenseData[11 - monthDiff] += transaction.amount;
        }
      }
    });
  }

  // Prepare category data for pie chart
  const categoryData: CategoryChartData[] = [];
  const categoryMap = new Map();

  filteredTransactions.forEach(transaction => {
    if (
      (reportType === 'overview') ||
      (reportType === 'income' && transaction.type === 'income') ||
      (reportType === 'expense' && transaction.type === 'expense')
    ) {
      const category = transaction.category;
      const amount = transaction.amount;

      if (categoryMap.has(category)) {
        categoryMap.set(category, categoryMap.get(category) + amount);
      } else {
        categoryMap.set(category, amount);
      }
    }
  });

  // Convert to pie chart data format
  const pieColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#2FCC71', '#F1C40F'
  ];

  let colorIndex = 0;
  categoryMap.forEach((value, key) => {
    categoryData.push({
      name: key,
      amount: value,
      color: pieColors[colorIndex % pieColors.length],
      legendFontColor: COLORS.text,
      legendFontSize: 12,
    });
    colorIndex++;
  });

  return {
    labels,
    incomeData,
    expenseData,
    categoryData,
  };
};

/**
 * Mendapatkan data ringkasan
 */
export const getSummaryData = (incomeData: number[], expenseData: number[]): SummaryData => {
  const totalIncome = incomeData.reduce((sum, current) => sum + current, 0);
  const totalExpense = expenseData.reduce((sum, current) => sum + current, 0);
  const balance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    balance,
  };
};

/**
 * Format nilai Y pada chart
 */
export const formatYLabel = (value: string): string => {
  const num = parseInt(value);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'J';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return value;
};
