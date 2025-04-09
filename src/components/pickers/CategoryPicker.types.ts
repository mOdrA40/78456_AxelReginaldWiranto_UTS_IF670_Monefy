import { Category, TransactionType } from '../../types';

export interface CategoryPickerProps {
  categories: Category[];
  type: TransactionType;
  selectedCategoryId?: string;
  onSelect: (category: Category) => void;
}
