/**
 * Format angka menjadi format mata uang Rupiah
 *
 * @param amount - Jumlah yang akan diformat
 * @param showSymbol - Apakah menampilkan simbol mata uang (Rp)
 * @returns String dalam format mata uang Indonesia
 * @example
 * formatCurrency(10000) // 'Rp 10.000'
 * formatCurrency(10000, false) // '10.000'
 */
export const formatCurrency = (amount: number | undefined, showSymbol: boolean = true): string => {
  // Pastikan amount adalah angka yang valid
  const validAmount = amount === undefined || isNaN(Number(amount)) ? 0 : Number(amount);

  const formatter = new Intl.NumberFormat('id-ID', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(validAmount);
};

/**
 * Format tanggal menjadi format lengkap (contoh: 1 Januari 2023)
 *
 * @param date - Tanggal yang akan diformat
 * @returns String tanggal dalam format lengkap Indonesia
 */
export const formatFullDate = (date: Date): string => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

/**
 * Format tanggal menjadi format pendek (contoh: 01/01/2023)
 *
 * @param date - Tanggal yang akan diformat
 * @returns String tanggal dalam format pendek Indonesia
 */
export const formatShortDate = (date: Date): string => {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

/**
 * Format tanggal dengan waktu (contoh: 01/01/2023 14:30)
 *
 * @param date - Tanggal dan waktu yang akan diformat
 * @returns String tanggal dan waktu dalam format Indonesia
 */
export const formatDateWithTime = (date: Date): string => {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
};

/**
 * Format nama bulan berdasarkan indeks bulan (0-11)
 *
 * @param monthIndex - Indeks bulan (0 untuk Januari, 11 untuk Desember)
 * @returns Nama bulan dalam bahasa Indonesia
 */
export const formatMonth = (monthIndex: number): string => {
  return new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(new Date(2000, monthIndex, 1));
};

/**
 * Format angka dengan pemisah ribuan
 *
 * @param number - Angka yang akan diformat
 * @returns String angka dengan pemisah ribuan (contoh: 1.000)
 */
export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('id-ID').format(number);
};

/**
 * Format angka menjadi persentase
 *
 * @param value - Nilai desimal yang akan diformat (0.5 untuk 50%)
 * @param decimalPlaces - Jumlah angka di belakang koma
 * @returns String persentase dalam format Indonesia
 */
export const formatPercentage = (value: number, decimalPlaces: number = 0): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'percent',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
};

/**
 * Format waktu relatif (contoh: 5 menit yang lalu, Kemarin)
 *
 * @param date - Tanggal yang akan diformat relatif terhadap waktu sekarang
 * @returns String waktu relatif dalam bahasa Indonesia
 */
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSecs < 60) {
    return `${diffInSecs} detik yang lalu`;
  } else if (diffInMins < 60) {
    return `${diffInMins} menit yang lalu`;
  } else if (diffInHours < 24) {
    return `${diffInHours} jam yang lalu`;
  } else if (diffInDays === 1) {
    return 'Kemarin';
  } else if (diffInDays < 7) {
    return `${diffInDays} hari yang lalu`;
  } else {
    return formatShortDate(date);
  }
};

/**
 * Mendapatkan nama hari dari tanggal
 *
 * @param date - Tanggal yang akan diambil nama harinya
 * @returns Nama hari dalam bahasa Indonesia (contoh: Senin, Selasa)
 */
export const getDayName = (date: Date): string => {
  return new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(date);
};

/**
 * Format periode anggaran
 *
 * @param period - Jenis periode anggaran
 * @param startDate - Tanggal mulai untuk periode kustom
 * @param endDate - Tanggal selesai untuk periode kustom
 * @returns String periode anggaran dalam bahasa Indonesia
 */
export const formatBudgetPeriod = (
  period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom',
  startDate?: Date,
  endDate?: Date
): string => {
  switch (period) {
    case 'daily':
      return 'Harian';
    case 'weekly':
      return 'Mingguan';
    case 'monthly':
      return 'Bulanan';
    case 'yearly':
      return 'Tahunan';
    case 'custom':
      if (startDate && endDate) {
        return `${formatShortDate(startDate)} - ${formatShortDate(endDate)}`;
      }
      return 'Periode Kustom';
    default:
      return 'Tidak diketahui';
  }
};

/**
 * Memotong teks yang terlalu panjang dan menambahkan elipsis
 *
 * @param text - Teks yang akan dipotong
 * @param maxLength - Panjang maksimum teks sebelum dipotong
 * @returns Teks yang sudah dipotong dengan elipsis jika melebihi panjang maksimum
 */
export const truncateText = (text: string, maxLength: number = 20): string => {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
};

/**
 * Format angka besar menjadi format kompak (juta/miliar)
 * 
 * @param amount - Jumlah yang akan diformat
 * @param showSymbol - Apakah menampilkan simbol mata uang (Rp)
 * @returns String dalam format kompak (contoh: Rp 1,5 jt, Rp 1,2 M)
 * @example
 * formatCompactCurrency(1500000) // 'Rp 1,5 jt'
 * formatCompactCurrency(1200000000) // 'Rp 1,2 M'
 */
export const formatCompactCurrency = (amount: number | undefined, showSymbol: boolean = true): string => {

  const validAmount = amount === undefined || isNaN(Number(amount)) ? 0 : Number(amount);
  
 
  const symbol = showSymbol ? 'Rp ' : '';
  
  if (validAmount === 0) {
    return `${symbol}0`;
  }
  
  const absValue = Math.abs(validAmount);
  
 
  if (absValue >= 1000000000000) {
 
    const value = Math.round(validAmount / 10000000000) / 100;
    const formatted = value % 1 === 0 
      ? value.toFixed(0) 
      : value.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
    
    return `${symbol}${formatted} T`;
  }
  
  if (absValue >= 1000000000) {
    const value = Math.round(validAmount / 10000000) / 100;
    const formatted = value % 1 === 0 
      ? value.toFixed(0) 
      : value.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
    
    return `${symbol}${formatted} M`;
  }
  
  if (absValue >= 1000000) {
    const value = Math.round(validAmount / 10000) / 100;
    const formatted = value % 1 === 0 
      ? value.toFixed(0) 
      : value.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
    
    return `${symbol}${formatted} jt`;
  }
  
  if (absValue >= 1000) {
    const value = Math.round(validAmount / 1000);
    return `${symbol}${value} rb`;
  }
  
  return `${symbol}${Math.round(validAmount).toLocaleString('id-ID')}`;
};

/**
 * Format angka menjadi nilai kompak sesuai ukuran layar atau konteks
 * 
 * @param amount - Jumlah yang akan diformat
 * @param forceCompact - Paksa gunakan format kompak terlepas dari nilai
 * @param threshold - Nilai minimum untuk menggunakan format kompak (default: 1.000.000)
 * @returns String dalam format yang sesuai
 */
export const formatResponsiveCurrency = (
  amount: number | undefined,
  forceCompact: boolean = false,
  threshold: number = 1000000
): string => {
  const validAmount = amount === undefined || isNaN(Number(amount)) ? 0 : Number(amount);
  
  
  if (Math.abs(validAmount) >= threshold || forceCompact) {
    return formatCompactCurrency(validAmount);
  }
  

  return formatCurrency(validAmount);
};