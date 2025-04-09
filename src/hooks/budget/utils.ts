import { FirestoreError } from 'firebase/firestore';
import { Budget } from '../../types';

export const convertFirestoreDataToBudget = (id: string, data: any): Budget => {
  return {
    id,
    userId: data.userId,
    name: data.name,
    amount: data.amount,
    spent: data.spent,
    categoryId: data.categoryId,
    categories: data.categories,
    type: data.type,
    period: data.period,
    startDate: data.startDate,
    endDate: data.endDate,
    repeat: data.repeat,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

export const handleFirestoreError = (error: FirestoreError, setError: (error: string | null) => void) => {
  console.error('Error fetching budgets:', error);
  setError(`Terjadi kesalahan: ${error.message}`);
};
