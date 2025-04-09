export type CategoryType = 'income' | 'expense';

export interface Category {
  id: string;
  userId: string;
  name: string;
  type: CategoryType;
  color: string;
  icon: string;
  budget: number;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export type CategoryInput = Omit<Category, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;


export type CategoryUpdate = Partial<CategoryInput>;