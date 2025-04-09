import { User } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_STORAGE_KEY, DefaultCategory } from './types';

export const saveUserToStorage = async (user: User | null): Promise<void> => {
  try {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        metadata: user.metadata
      };
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      console.log('User data saved to storage:', user.uid);
    } else {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      console.log('User data removed from storage');
    }
  } catch (err) {
    console.error('Error saving user to storage:', err);
  }
};

export const loadUserFromStorage = async (): Promise<User | null> => {
  try {
    const storedUserString = await AsyncStorage.getItem(USER_STORAGE_KEY);
    if (storedUserString) {
      return JSON.parse(storedUserString) as User;
    }
    return null;
  } catch (err) {
    console.error('Error loading user from storage:', err);
    return null;
  }
};

export const defaultIncomeCategories: DefaultCategory[] = [
  { name: 'Gaji', icon: 'cash', color: '#4CAF50', type: 'income' },
  { name: 'Bonus', icon: 'gift', color: '#2196F3', type: 'income' },
  { name: 'Investasi', icon: 'trending-up', color: '#673AB7', type: 'income' }
];

export const defaultExpenseCategories: DefaultCategory[] = [
  { name: 'Makanan', icon: 'fast-food', color: '#F44336', type: 'expense' },
  { name: 'Transportasi', icon: 'car', color: '#FF9800', type: 'expense' },
  { name: 'Belanja', icon: 'cart', color: '#9C27B0', type: 'expense' },
  { name: 'Tagihan', icon: 'receipt', color: '#607D8B', type: 'expense' }
];
