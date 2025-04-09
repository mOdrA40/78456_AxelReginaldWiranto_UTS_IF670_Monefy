import { StackNavigationProp } from '@react-navigation/stack';
import { BudgetStackParamList } from '../../../navigation/types';
import { CategoryInput, CategoryType } from '../../../types/category';

export type AddBudgetScreenNavigationProp = StackNavigationProp<
  BudgetStackParamList,
  'AddBudget'
>;

export interface ColorButtonProps {
  color: string;
  isSelected: boolean;
  onPress: () => void;
}

export interface TypeButtonProps {
  type: CategoryType;
  isSelected: boolean;
  onPress: () => void;
}
