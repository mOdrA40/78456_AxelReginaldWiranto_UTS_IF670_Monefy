import { StackNavigationProp } from "@react-navigation/stack";
import { GoalsStackParamList } from "../../../navigation/types";
import { Goal } from "../../../types/goal";

export type GoalsScreenNavigationProp = StackNavigationProp<
  GoalsStackParamList,
  "Goals"
>;

export interface GoalCardProps {
  goal: Goal;
  onPress?: () => void;
}

export interface EmptyStateProps {
  onAddGoal: () => void;
}

export interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export interface OfflineBannerProps {
  isOfflineMode: boolean;
}

export interface GoalListProps {
  goals: Goal[];
  onGoalPress: (goalId: string) => void;
  refreshing: boolean;
  onRefresh: () => void;
}
