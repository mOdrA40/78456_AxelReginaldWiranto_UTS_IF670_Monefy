import { Goal } from "../../../types/goal";

/**
 * Mengurutkan goals berdasarkan progress
 */
export const sortGoalsByProgress = (goals: Goal[]): Goal[] => {
  return [...goals].sort((a, b) => {
    // Urutkan berdasarkan progress (dari terendah ke tertinggi)
    const progressA = a.currentAmount / a.targetAmount;
    const progressB = b.currentAmount / b.targetAmount;
    return progressA - progressB;
  });
};

/**
 * Mengurutkan goals berdasarkan tanggal target
 */
export const sortGoalsByTargetDate = (goals: Goal[]): Goal[] => {
  return [...goals].sort((a, b) => {
    // Urutkan berdasarkan tanggal target (dari terdekat ke terjauh)
    const dateA = new Date(a.endDate).getTime();
    const dateB = new Date(b.endDate).getTime();
    return dateA - dateB;
  });
};
