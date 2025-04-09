import { StackNavigationProp } from '@react-navigation/stack';
import { BudgetStackParamList } from '../../../navigation/types/budget.types';
import { Category } from '../../../types/category';
import { Transaction } from '../../../types';

export type BudgetScreenNavigationProp = StackNavigationProp<
  BudgetStackParamList,
  'Budget'
>;

export interface CategoryWithProgress extends Category {
  spent: number;
  remaining: number;
  percentage: number;
}

export interface MonthSelectorProps {
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
}

export interface BudgetCategoryCardProps {
  category: CategoryWithProgress;
  onPress: (categoryId: string) => void;
}

export interface EmptyStateProps {
  onAddBudget: () => void;
}
