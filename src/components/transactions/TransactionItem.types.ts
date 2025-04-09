import { Transaction } from '../../types';

export interface TransactionItemProps {
  transaction: Transaction;
  onPress?: (id: string) => void;
}
