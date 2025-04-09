import { Category } from '../../../types/category';
import { Transaction } from '../../../types';
import { CategoryWithProgress } from '../types/BudgetScreen.types';

/**
 * Mendapatkan nama bulan dalam bahasa Indonesia
 */
export const getMonthName = (date: Date): string => {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

/**
 * Mengubah bulan ke bulan sebelumnya
 */
export const getPreviousMonth = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() - 1);
  return newDate;
};

/**
 * Mengubah bulan ke bulan berikutnya
 */
export const getNextMonth = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + 1);
  return newDate;
};

/**
 * Memeriksa apakah dua tanggal berada di bulan yang sama
 */
export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
};

/**
 * Menghitung progres anggaran untuk setiap kategori
 */
export const calculateCategoryProgress = (
  categories: Category[],
  transactions: Transaction[]
): CategoryWithProgress[] => {
  return categories
    .filter(category => category.budget && category.budget > 0)
    .map(category => {
      // Hitung total pengeluaran untuk kategori ini
      const spent = transactions
        .filter(t => t.categoryId === category.id && t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      const budget = category.budget || 0;
      const remaining = Math.max(0, budget - spent);
      const percentage = budget > 0 ? Math.min(100, (spent / budget) * 100) : 0;
      
      return {
        ...category,
        spent,
        remaining,
        percentage
      };
    })
    .sort((a, b) => b.percentage - a.percentage); // Urutkan berdasarkan persentase tertinggi
};
