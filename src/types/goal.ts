export type GoalStatus = 'ongoing' | 'completed' | 'cancelled';
export interface Goal {
  id: string;
  userId: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  startDate: Date;
  endDate: Date;
  status: GoalStatus;
  iconName: string;
  color: string;
  categoryId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type GoalInput = Omit<Goal, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
export type GoalUpdate = Partial<GoalInput>;