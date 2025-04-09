import { GoalInput, GoalUpdate } from '../../../types/goal';
import { AddFormErrors } from '../types';

/**
 * Validasi form goal
 */
export const validateGoalForm = (formData: Partial<GoalInput>): AddFormErrors => {
  const errors: AddFormErrors = {};

  if (!formData.name || !formData.name.trim()) {
    errors.name = 'Nama tujuan harus diisi';
  }

  if (!formData.targetAmount || formData.targetAmount <= 0) {
    errors.targetAmount = 'Target jumlah harus lebih dari 0';
  }

  if (!formData.endDate) {
    errors.targetDate = 'Tanggal target harus diisi';
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (formData.endDate < today) {
      errors.targetDate = 'Tanggal target tidak boleh di masa lalu';
    }
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
  // Hapus semua karakter non-digit
  const numericValue = value.replace(/\D/g, '');

  // Konversi ke number
  const number = parseInt(numericValue, 10);

  // Jika bukan angka, kembalikan 0
  return isNaN(number) ? 0 : number;
};
