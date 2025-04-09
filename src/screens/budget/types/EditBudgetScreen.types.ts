import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { BudgetStackParamList } from '../../../navigation/types/budget.types';
import { CategoryType, CategoryInput, CategoryUpdate } from '../../../types/category';

export type EditBudgetScreenNavigationProp = StackNavigationProp<
  BudgetStackParamList,
  'EditBudget'
>;

export type EditBudgetScreenRouteProp = RouteProp<BudgetStackParamList, 'EditBudget'>;

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
