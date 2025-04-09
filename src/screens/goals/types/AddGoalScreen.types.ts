import { StackNavigationProp } from "@react-navigation/stack";
import { GoalsStackParamList } from "../../../navigation/types";
import { GoalInput, GoalStatus } from "../../../types/goal";

export type AddGoalScreenNavigationProp = StackNavigationProp<
  GoalsStackParamList,
  "AddGoal"
>;

export interface IconOptionProps {
  name: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export interface ColorOptionProps {
  color: string;
  selected: boolean;
  onSelect: () => void;
}

export interface FormErrors {
  name?: string;
  targetAmount?: string;
  targetDate?: string;
  endDate?: string;
}
