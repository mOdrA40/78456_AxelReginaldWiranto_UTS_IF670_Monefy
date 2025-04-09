import { Budget } from '../../types';

export interface UseBudgetResult {
  budgets: Budget[];
  loading: boolean;
  error: string | null;
  fetchBudgets: () => Promise<(() => void) | undefined>;
  getBudgetById: (id: string) => Promise<Budget | null>;
  addBudget: (budget: Omit<Budget, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'spent'>) => Promise<Budget | null>;
  updateBudget: (id: string, updates: Partial<Omit<Budget, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>) => Promise<boolean>;
  deleteBudget: (id: string) => Promise<boolean>;
}
