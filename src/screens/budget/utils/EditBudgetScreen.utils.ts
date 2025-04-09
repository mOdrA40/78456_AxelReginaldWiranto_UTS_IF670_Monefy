import { CategoryInput, CategoryUpdate } from '../../../types/category';
import { COLORS } from '../../../constants/theme';

/**
 * Daftar warna yang tersedia untuk kategori
 */
export const CATEGORY_COLORS = [
  COLORS.primary.main,
  COLORS.success[500],
  COLORS.warning[500],
  COLORS.danger[500],
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#F97316', // Orange
  '#14B8A6', // Teal
  '#6366F1', // Indigo
];

/**
 * Validasi form kategori
 */
export const validateForm = (formData: CategoryInput): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.name.trim()) {
    errors.name = 'Nama kategori harus diisi';
  }

  if (formData.budget <= 0) {
    errors.budget = 'Anggaran harus lebih dari 0';
  }

  return errors;
};

/**
 * Format angka menjadi string dengan format mata uang
 */
export const formatCurrencyInput = (value: string): string => {
  // Hapus semua karakter non-digit
  const numericValue = value.replace(/\D/g, '');

  // Konversi ke number
  const number = parseInt(numericValue, 10);

  // Jika bukan angka, kembalikan string kosong
  if (isNaN(number)) {
    return '';
  }

  // Format angka dengan pemisah ribuan
  return number.toLocaleString('id-ID');
};

/**
 * Parse string mata uang menjadi number
 */
export const parseCurrencyInput = (value: string): number => {
  // Hapus semua karakter non-digit (termasuk Rp, titik, koma, dan spasi)
  const numericValue = value.replace(/[^\d]/g, '');

  // Konversi ke number
  const number = parseInt(numericValue, 10);

  // Jika bukan angka, kembalikan 0
  return isNaN(number) ? 0 : number;
};

/**
 * Membuat objek update kategori dari form data
 */
export const createCategoryUpdate = (_categoryId: string, formData: CategoryInput): Omit<CategoryUpdate, 'id'> => {
  return {
    name: formData.name,
    type: formData.type,
    color: formData.color,
    icon: formData.icon,
    budget: formData.budget,
  };
};
