import { TransactionFilter, TransactionType } from '../../types';

export interface FilterProps {
  onApply: (filter: TransactionFilter) => void;
  onReset: () => void;
  initialFilter?: TransactionFilter;
}
