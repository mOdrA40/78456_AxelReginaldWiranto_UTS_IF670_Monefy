import { Goal, GoalStatus } from '../../types/goal';
import { COLORS } from '../../constants/theme';

export const calculateProgress = (goal: Goal): number => {
  return (goal.currentAmount / goal.targetAmount) * 100;
};

export const getStatusColor = (status: GoalStatus): string => {
  switch (status) {
    case 'completed':
      return COLORS.success[600];
    case 'cancelled':
      return COLORS.danger[600];
    default:
      return COLORS.primary.main;
  }
};

export const getStatusText = (status: GoalStatus): string => {
  switch (status) {
    case 'completed':
      return 'Tercapai';
    case 'cancelled':
      return 'Dibatalkan';
    default:
      return 'Sedang Berjalan';
  }
};

export const getRemainingDays = (endDate: Date): number => {
  const today = new Date();
  const end = new Date(endDate);
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};
