import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { GoalsStackParamList } from "../../../navigation/types";
import { Goal, GoalStatus } from "../../../types/goal";

export type GoalDetailScreenNavigationProp = StackNavigationProp<
  GoalsStackParamList,
  "GoalDetail"
>;

export type GoalDetailScreenRouteProp = RouteProp<
  GoalsStackParamList,
  "GoalDetail"
>;

export interface ProgressBarProps {
  progress: number;
  color: string;
}

export interface StatusButtonProps {
  status: GoalStatus;
  currentStatus: GoalStatus;
  onPress: (status: GoalStatus) => void;
  disabled?: boolean;
}

export interface TimeInfoProps {
  goal: Goal;
}

export interface AddFundsFormProps {
  onAddFunds: (amount: number) => void;
  onCancel: () => void;
  disabled?: boolean;
}

export interface OfflineBannerProps {
  isOfflineMode: boolean;
}
