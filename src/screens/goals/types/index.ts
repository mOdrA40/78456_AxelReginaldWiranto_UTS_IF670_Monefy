// Import tipe-tipe dari file terpisah
import { GoalCardProps, GoalListProps, OfflineBannerProps as GoalsOfflineBannerProps } from './GoalsScreen.types';
import { AddGoalScreenNavigationProp, IconOptionProps as AddIconOptionProps, ColorOptionProps as AddColorOptionProps, FormErrors as AddFormErrors } from './AddGoalScreen.types';
import { EditGoalScreenNavigationProp, EditGoalScreenRouteProp, IconOptionProps as EditIconOptionProps, ColorOptionProps as EditColorOptionProps, FormErrors as EditFormErrors } from './EditGoalScreen.types';
import { GoalDetailScreenNavigationProp, GoalDetailScreenRouteProp, OfflineBannerProps as DetailOfflineBannerProps } from './GoalDetailScreen.types';

// Re-export dengan nama yang unik
// GoalsScreen types
export type { GoalCardProps, GoalListProps, GoalsOfflineBannerProps };

// AddGoalScreen types
export type { AddGoalScreenNavigationProp, AddIconOptionProps, AddColorOptionProps, AddFormErrors };

// EditGoalScreen types
export type { EditGoalScreenNavigationProp, EditGoalScreenRouteProp, EditIconOptionProps, EditColorOptionProps, EditFormErrors };

// GoalDetailScreen types
export type { GoalDetailScreenNavigationProp, GoalDetailScreenRouteProp, DetailOfflineBannerProps };

// Alias FormErrors untuk penggunaan umum
export type FormErrors = AddFormErrors;
// Alias GoalsScreenNavigationProp untuk penggunaan umum 
export type GoalsScreenNavigationProp = AddGoalScreenNavigationProp;
