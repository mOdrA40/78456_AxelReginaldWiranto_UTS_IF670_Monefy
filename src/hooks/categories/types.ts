import { Category, CategoryInput, CategoryUpdate } from '../../types/category';

export interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<(() => void) | undefined>;
  getCategoryById: (id: string) => Promise<Category | null>;
  addCategory: (categoryData: CategoryInput) => Promise<Category | null>;
  updateCategory: (id: string, categoryData: CategoryUpdate) => Promise<Category | null>;
  deleteCategory: (id: string) => Promise<void>;
}
