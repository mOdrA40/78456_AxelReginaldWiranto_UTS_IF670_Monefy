import { Goal } from '../../types/goal';

export interface GoalCardProps {
  goal: Goal;
  onPress?: () => void;
}
