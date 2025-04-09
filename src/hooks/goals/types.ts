import { Goal, GoalInput, GoalUpdate } from '../../types/goal';

export interface UseGoalsResult {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  isOfflineMode: boolean;
  fetchGoals: () => Promise<(() => void) | undefined>;
  addGoal: (goalData: GoalInput) => Promise<Goal | null>;
  updateGoal: (id: string, goalData: GoalUpdate) => Promise<Goal | null>;
  deleteGoal: (id: string) => Promise<void>;
  addFundsToGoal: (id: string, amount: number) => Promise<Goal | null>;
}
