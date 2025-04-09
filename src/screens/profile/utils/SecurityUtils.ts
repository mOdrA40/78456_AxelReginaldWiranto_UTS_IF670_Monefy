import { AUTO_LOCK_OPTIONS } from '../constants';

/**
 * Mendapatkan label waktu kunci otomatis berdasarkan nilai
 */
export const getAutoLockTimeLabel = (value: number): string => {
  const option = AUTO_LOCK_OPTIONS.find(option => option.value === value);
  return option?.label || '5 menit';
};
