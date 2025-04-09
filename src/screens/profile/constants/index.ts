import { AutoLockOption } from '../types/index';

/**
 * Opsi waktu kunci otomatis
 */
export const AUTO_LOCK_OPTIONS: AutoLockOption[] = [
  { label: 'Segera', value: 0 },
  { label: '1 menit', value: 60 },
  { label: '5 menit', value: 300 },
  { label: '15 menit', value: 900 },
  { label: '30 menit', value: 1800 },
];
