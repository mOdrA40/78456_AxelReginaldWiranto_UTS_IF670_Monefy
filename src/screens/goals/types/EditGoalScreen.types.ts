import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { GoalsStackParamList } from "../../../navigation/types";
import { GoalUpdate } from "../../../types/goal";

export type EditGoalScreenNavigationProp = StackNavigationProp<
  GoalsStackParamList,
  "EditGoal"
>;

export type EditGoalScreenRouteProp = RouteProp<
  GoalsStackParamList,
  "EditGoal"
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
}
