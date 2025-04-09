import { FirestoreError } from 'firebase/firestore';
import { Category } from '../../types/category';

export const convertFirestoreDataToCategory = (id: string, data: any): Category => {
  return {
    id,
    userId: data.userId,
    name: data.name,
    type: data.type,
    color: data.color,
    icon: data.icon,
    isDefault: data.isDefault || false,
    budget: data.budget || 0,
    createdAt: data.createdAt?.toDate(),
    updatedAt: data.updatedAt?.toDate(),
  };
};

export const handleFirestoreError = (error: FirestoreError, setError: (error: string | null) => void) => {
  if (error.code !== 'permission-denied') {
    console.error('Error fetching categories:', error);
    setError(`Gagal mengambil data kategori: ${error.message}`);
  } else {
    console.log('Permission denied untuk kategori, kemungkinan user telah logout');
  }
};
