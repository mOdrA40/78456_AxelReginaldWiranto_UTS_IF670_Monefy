import { Goal, GoalStatus } from "../../../types/goal";

/**
 * Menghitung progress goal dalam persentase
 */
export const calculateProgress = (
  currentAmount: number,
  targetAmount: number,
): number => {
  if (targetAmount <= 0) return 0;
  return Math.min(100, (currentAmount / targetAmount) * 100);
};

/**
 * Mendapatkan warna berdasarkan status goal
 */
export const getStatusColor = (status: GoalStatus): string => {
  switch (status) {
    case "ongoing":
      return "#4338CA"; // primary
    case "completed":
      return "#10B981"; // success
    case "cancelled":
      return "#EF4444"; // danger
    default:
      return "#4338CA"; // primary
  }
};

/**
 * Mendapatkan label status dalam bahasa Indonesia
 */
export const getStatusLabel = (status: GoalStatus): string => {
  switch (status) {
    case "ongoing":
      return "Aktif";
    case "completed":
      return "Selesai";
    case "cancelled":
      return "Dibatalkan";
    default:
      return "Aktif";
  }
};

/**
 * Menghitung sisa hari hingga target
 */
export const calculateDaysRemaining = (targetDate: Date): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
};

/**
 * Memformat tanggal ke format Indonesia
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/**
 * Validasi input jumlah dana
 */
export const validateAmount = (amount: string): string => {
  if (!amount.trim()) {
    return "Jumlah harus diisi";
  }

  const numericAmount = parseFloat(amount.replace(/\D/g, ""));
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return "Jumlah harus lebih dari 0";
  }

  return "";
};
